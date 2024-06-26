export enum Error {
  DUPLICATE_USER_NAME = 'error.userName.duplicate',
  DUPLICATE_EMAIL = 'error.email.duplicate',
  INVALID_CREDENTIAL = 'error.invalidCredential',
  USER_NOT_FOUND = 'error.user.notFound',
  PRODUCT_NOT_FOUND = 'error.product.notFound',
  EXCEEDED_MAXIMUM_CART_QUANTITY = 'error.cart.maxQuantity',
  ADDRESS_MIN_LENGTH = 'error.address.minLength',
  MISSING_STORE_ID = 'error.store.missingStoreId',
  STORE_NOT_FOUND = 'error.store.notFound',
  ORDER_NOT_FOUND = 'error.order.notFound',
  ORDER_HAS_BEEN_PAID = 'error.order.hasBeenPaid',
  SAVE_PAYMENT_FAILED = 'error.payment.saveFailed',
  INVALID_ORDER_TYPE = 'error.order.invalidOrderType',
  INVALID_PAYMENT_TYPE = 'error.order.invalidPaymentType',
  BAD_INPUT = 'error.badInput',
}
