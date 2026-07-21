/**
 * Zod Validation Middleware
 *
 * Generic middleware factory that validates request body/query/params
 * against a Zod schema. Returns 422 with structured errors on failure.
 */

import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../lib/errors';

type RequestField = 'body' | 'query' | 'params';

export function validate(schema: ZodSchema, field: RequestField = 'body') {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[field]);
      // Replace with parsed (coerced/transformed) data
      (req as any)[field] = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        next(new ValidationError(details));
      } else {
        next(error);
      }
    }
  };
}
