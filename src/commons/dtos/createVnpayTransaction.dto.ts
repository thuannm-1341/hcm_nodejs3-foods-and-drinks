import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {
  VNPAY_COMMAND,
  VNPAY_CURR_CODE,
  VNPAY_FOOD_ORDER_TYPE,
} from '../../constants/VNPAY';

dayjs.extend(utc);
dayjs.extend(timezone);

export class CreateVNPayTransactionDto {
  vnp_Version: string;

  vnp_Command: string;

  vnp_TmnCode: string;

  vnp_Amount: number;

  vnp_BankCode: string;

  vnp_CreateDate: string;

  vnp_CurrCode: string;

  vnp_IpAddr: string;

  vnp_Locale: string;

  vnp_OrderInfo: string;

  vnp_OrderType: number;

  vnp_ReturnUrl: string;

  vnp_ExpireDate: string;

  vnp_TxnRef: number;

  vnp_SecureHash: string;

  constructor(
    amount: number,
    locale: string,
    ipAddress: string,
    orderId: number,
  ) {
    this.vnp_BankCode = process.env.VNP_BANKCODE || '';
    this.vnp_Command = VNPAY_COMMAND;
    this.vnp_Version = process.env.VNP_VERSION || '';
    this.vnp_TmnCode = process.env.VNP_TMNCODE || '';
    this.vnp_Amount = amount * 100;
    this.vnp_BankCode = process.env.VNP_BANKCODE || '';
    this.vnp_CreateDate = dayjs
      .utc()
      .tz('Asia/Bangkok')
      .format('YYYYMMDDHHmmss');
    this.vnp_CurrCode = VNPAY_CURR_CODE;
    this.vnp_IpAddr = ipAddress;
    this.vnp_Locale = locale;
    this.vnp_OrderInfo = `Giao dich cho Don hang ${orderId}`;
    this.vnp_OrderType = VNPAY_FOOD_ORDER_TYPE;
    this.vnp_ReturnUrl = process.env.VNP_RETURNURL || '';
    this.vnp_ExpireDate = dayjs
      .utc()
      .tz('Asia/Bangkok')
      .add(15, 'minutes')
      .format('YYYYMMDDHHmmss');
    this.vnp_TxnRef = orderId;
  }
}
