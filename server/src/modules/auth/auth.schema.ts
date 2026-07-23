/**
 * Auth Zod Schemas
 *
 * Request validation schemas for all auth endpoints.
 * Imported by auth.controller.ts via the validate() middleware.
 */

import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string()
    .email('Must be a valid email address')
    .max(255)
    .transform((v) => v.toLowerCase().trim()),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be at most 128 characters'),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100)
    .trim(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email('Must be a valid email address')
    .transform((v) => v.toLowerCase().trim()),
  password: z.string().min(1, 'Password is required'),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshInput = z.infer<typeof refreshSchema>;
