import * as querystring from 'qs';
import * as crypto from 'crypto';
import { Request, Response } from 'express';
import { OrderEntity } from '../entities/order.entity';
import { CreateVNPayTransactionDto } from './dtos/createVnpayTransaction.dto';
export function handleError(_errors: any[], req: Request, res: Response) {
  const errors: any = {};
  _errors.map((error) => {
    errors[error.property] = Object.values(error.constraints);
  });
  return errors;
}

export function processPayment(
  req: Request,
  res: Response,
  order: OrderEntity,
) {
  const locale = req.language;
  const transactionParams = new CreateVNPayTransactionDto(
    order.total,
    locale,
    req.ip || '',
    order.id,
  );

  const sortedDto = sortObject(transactionParams);
  const signData = querystring.stringify(sortedDto, { encode: false });
  const hmac = crypto.createHmac('sha512', process.env.VNP_HASHSECRET || '');
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  sortedDto.vnp_SecureHash = signed;

  const link =
    process.env.VNP_URL +
    '?' +
    querystring.stringify(sortedDto, { encode: false });

  res.redirect(link);
}

export function sortObject(obj: CreateVNPayTransactionDto) {
  const sorted: { [key: string]: string | number } = {};
  const keys = Object.keys(obj)
    .map((key) => encodeURIComponent(key))
    .sort();

  keys.forEach((key) => {
    sorted[key] = encodeURIComponent((obj as any)[key]).replace(/%20/g, '+');
  });

  return sorted;
}

export function formatDate(
  dateString: string,
  isDatePickerFormat?: boolean,
): string {
  const date = new Date(dateString);

  if (isDatePickerFormat) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return year + '-' + month + '-' + day;
  } else {
    return date.toLocaleString();
  }
}

export function formatCurrency(value: string | number): string {
  const number: number = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(number)) {
    return 'Invalid number';
  }

  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
