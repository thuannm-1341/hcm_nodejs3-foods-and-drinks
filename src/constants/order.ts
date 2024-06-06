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

export enum OrderSortField {
  CREATED_AT = 'createdAt',
  VALUE = 'total',
}

export const MIN_ADDRESS_LENGTH = 5;
