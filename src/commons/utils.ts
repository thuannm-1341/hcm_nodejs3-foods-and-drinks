import { Request, Response } from 'express';
export function handleError(_errors: any[], req: Request, res: Response) {
  const errors: any = {};
  _errors.map((error) => {
    errors[error.property] = Object.values(error.constraints);
  });
  return errors;
}
