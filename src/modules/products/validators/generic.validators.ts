import { validateOrReject } from 'class-validator';
import { IValidator } from '../interfaces/validator.interface';

export class GenericValidator<T extends object> implements IValidator<T> {
  async validate(data: T): Promise<void> {
    await validateOrReject(data, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
  }
}