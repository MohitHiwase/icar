/**
 * Authorization Middleware
 *
 * Role-based access control. Must be placed AFTER authenticate middleware.
 * Checks if the authenticated user has one of the allowed roles.
 *
 * Usage:
 *   router.get('/admin', authenticate, authorize('admin'), handler);
 *   router.get('/any',   authenticate, authorize('admin', 'user'), handler);
 */

import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, UnauthorizedError } from '../lib/errors';

export function authorize(...allowedRoles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    if (!allowedRoles.includes(user.role)) {
      return next(new ForbiddenError(`Role '${user.role}' does not have access to this resource`));
    }

    next();
  };
}
