import { validateOrReject } from 'class-validator';
import { IValidator } from '@interfaces/validator.interface';

export class ClassValidatorAdapter<T extends object> implements IValidator<T> {
  async validate(dto: T): Promise<void> {
    await validateOrReject(dto, { whitelist: true, forbidNonWhitelisted: true });
  }
}