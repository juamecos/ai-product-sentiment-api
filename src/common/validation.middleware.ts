import { Request, Response, NextFunction } from 'express';
import { IValidator } from '@modules/products/interfaces/validator.interface';

export function createValidationMiddleware<T>(validator: IValidator<T>, dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = new dtoClass();
      Object.assign(dto as object, req.body);
      await validator.validate(dto);
      next();
    } catch (errors) {
      res.status(400).json({ errors });
    }
  };
}
