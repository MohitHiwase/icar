/**
 * Winston Logger
 * 
 * Structured JSON logging in production, colorized console in development.
 * All modules import this logger — no direct console.log usage.
 */

import winston from 'winston';
import { config } from '../config';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const devFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'HH:mm:ss' }),
  errors({ stack: true }),
  printf(({ timestamp, level, message, stack, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp} [${level}]: ${stack || message}${metaStr}`;
  })
);

const prodFormat = combine(
  timestamp(),
  errors({ stack: true }),
  winston.format.json()
);

export const logger = winston.createLogger({
  level: config.logLevel,
  format: config.isProd ? prodFormat : devFormat,
  defaultMeta: { service: 'geovision-api' },
  transports: [
    new winston.transports.Console(),
  ],
});
