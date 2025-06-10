import { Request, Response, NextFunction } from 'express';
import { IMiddlewareCreator, MiddlewareHandler } from '@src/interfaces/middleware.creator.interface';

export class MiddlewareCreator implements IMiddlewareCreator {
  create(handler: MiddlewareHandler): MiddlewareHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await handler(req, res, next);
      } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
      }
    };
  }
}