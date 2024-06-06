export enum OrderType {
  DELIVERY = 'DELIVERY',
  PICK_UP = 'PICKUP',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  READY = 'READY',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
}

export const MIN_ADDRESS_LENGTH = 5;
