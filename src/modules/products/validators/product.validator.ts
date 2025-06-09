import { validateOrReject } from 'class-validator';

export async function validateDto(dto: object) {
  await validateOrReject(dto, { whitelist: true, forbidNonWhitelisted: true });
}
