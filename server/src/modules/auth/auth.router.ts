/**
 * Auth Router
 *
 * Maps HTTP endpoints to auth controller handlers.
 * Applies Zod validation middleware on request bodies.
 * Protects /me with authentication middleware.
 *
 * Routes:
 *   POST /register  — Create a new account
 *   POST /login     — Authenticate and receive tokens
 *   POST /refresh   — Rotate access + refresh tokens
 *   POST /logout    — Revoke refresh token
 *   GET  /me        — Get current authenticated user
 */

import { Router } from 'express';
import { validate, authenticate } from '../../middleware';
import { registerSchema, loginSchema, refreshSchema } from './auth.schema';
import * as authController from './auth.controller';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login',    validate(loginSchema),    authController.login);
router.post('/refresh',  validate(refreshSchema),  authController.refresh);
router.post('/logout',   validate(refreshSchema),  authController.logout);
router.get('/me',        authenticate,             authController.getMe);

export { router as authRouter };
