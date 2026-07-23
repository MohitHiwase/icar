/**
 * Auth Service
 *
 * All authentication business logic lives here.
 * Controllers call these functions — they never touch Prisma or bcrypt directly.
 *
 * Flow:
 *   register → hash password, create user, generate tokens
 *   login    → verify credentials, generate tokens
 *   refresh  → validate refresh token, rotate tokens
 *   logout   → revoke refresh token
 *   me       → return user from verified JWT (handled by controller)
 */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { prisma, ConflictError, UnauthorizedError, NotFoundError } from '../../lib';
import { config } from '../../config';
import type { RegisterInput, LoginInput } from './auth.schema';

const SALT_ROUNDS = 12;

// ── Token Generation ─────────────────────

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn as any,
  });
}

function generateRefreshToken(): string {
  return crypto.randomBytes(40).toString('hex');
}

/**
 * Parses a duration string like '15m', '7d', '1h' into milliseconds.
 */
function parseDurationToMs(duration: string): number {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) return 7 * 24 * 60 * 60 * 1000; // default 7d
  const value = parseInt(match[1], 10);
  const unit = match[2];
  const multipliers: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };
  return value * (multipliers[unit] || 1000);
}

async function storeRefreshToken(token: string, userId: string): Promise<void> {
  const expiresAt = new Date(Date.now() + parseDurationToMs(config.jwtRefreshExpiresIn));
  await prisma.refreshToken.create({
    data: { token, userId, expiresAt },
  });
}

function createTokenResponse(accessToken: string, refreshToken: string, user: { id: string; email: string; name: string; role: string }) {
  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
}

// ── Public Service Methods ───────────────

export async function register(input: RegisterInput) {
  // Check for existing user
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw new ConflictError('An account with this email already exists');
  }

  // Hash password and create user
  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      passwordHash,
      role: 'user',
    },
  });

  // Generate tokens
  const payload: TokenPayload = { userId: user.id, email: user.email, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken();
  await storeRefreshToken(refreshToken, user.id);

  return createTokenResponse(accessToken, refreshToken, user);
}

export async function login(input: LoginInput) {
  // Find user
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  // Verify password
  const valid = await bcrypt.compare(input.password, user.passwordHash);
  if (!valid) {
    throw new UnauthorizedError('Invalid email or password');
  }

  // Generate tokens
  const payload: TokenPayload = { userId: user.id, email: user.email, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken();
  await storeRefreshToken(refreshToken, user.id);

  return createTokenResponse(accessToken, refreshToken, user);
}

export async function refresh(token: string) {
  // Find the refresh token in the database
  const stored = await prisma.refreshToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!stored) {
    throw new UnauthorizedError('Invalid refresh token');
  }

  // Check expiration
  if (stored.expiresAt < new Date()) {
    // Clean up expired token
    await prisma.refreshToken.delete({ where: { id: stored.id } });
    throw new UnauthorizedError('Refresh token has expired');
  }

  // Rotate: delete old token, issue new pair
  await prisma.refreshToken.delete({ where: { id: stored.id } });

  const user = stored.user;
  const payload: TokenPayload = { userId: user.id, email: user.email, role: user.role };
  const accessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken();
  await storeRefreshToken(newRefreshToken, user.id);

  return createTokenResponse(accessToken, newRefreshToken, user);
}

export async function logout(token: string) {
  // Delete the refresh token (ignore if not found — idempotent)
  await prisma.refreshToken.deleteMany({ where: { token } });
}

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      avatarUrl: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new NotFoundError('User', userId);
  }

  return user;
}
