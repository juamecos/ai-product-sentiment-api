import { Request, Response, NextFunction } from 'express';
import { MiddlewareCreator } from '@common/middlewares/middleware.creator';
import { ClassValidatorAdapter } from '@validators/generic.validators';

export class ValidatorMiddlewareFactory {
  private middlewareCreator = new MiddlewareCreator();

  public createValidatorMiddleware<T extends object>(dtoClass: new () => T) {
    const validator = new ClassValidatorAdapter<T>();
    const validationHandler = async (req: Request, res: Response, next: NextFunction) => {
      const dto = new dtoClass();
      Object.assign(dto as object, req.body);
      await validator.validate(dto);
      next();
    };

    return this.middlewareCreator.create(validationHandler);
  }
}