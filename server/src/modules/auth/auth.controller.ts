/**
 * Auth Controller
 *
 * Thin HTTP handlers that:
 *   1. Extract validated data from the request
 *   2. Delegate to auth.service
 *   3. Return consistent JSON responses
 *
 * No business logic here — only request/response mapping.
 */

import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.login(req.body);
    res.json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refresh(refreshToken);
    res.json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body;
    await authService.logout(refreshToken);
    res.json({ status: 'success', message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    // userId is injected by the authenticate middleware
    const userId = (req as any).user.userId;
    const user = await authService.getMe(userId);
    res.json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
}
