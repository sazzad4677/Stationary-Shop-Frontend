import { TProductGetApiResponse } from '@/types/product.types.ts';
import { TUserGetApiResponse } from '@/types/user.types.ts';

export type TOrder = {
  orderId: string
  userId: TUserGetApiResponse
  products: TOrdersProduct[]
  totalPrice: number
  isPaid: boolean
  status: string
  shippingAddress: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  },
  paymentData: TPaymentData
}

export type TPaymentData = {
  paymentIntentId: string;
  stripeCustomerId?: string;
  amountPaid?: number;
  currency?: string;
  paymentStatus:
    | 'succeeded'
    | 'requires_payment_method'
    | 'requires_action'
    | 'canceled'
    | 'processing'
    | 'requires_capture'
    | 'failed'
    | 'unknown'
    | 'requires_confirmation'
    | 'requires_source_action'
    | 'canceled_reversal'
    | 'reversed'
    | 'expired';
  receiptUrl?: string;
  paymentMethodType?: string;
  cardLast4?: string;
  cardBrand?: string;
  customerEmail?: string | null;
  paymentCreatedAt: Date;
  failedCode?: string;
  failedMessage?: string;
}

export type TOrdersProduct = TOrder & {
  productId: TProductGetApiResponse
  quantity: number
}

export type TOrderGetApiResponse = TOrder & {
    __v: number
    _id: string
    createdAt: string
    updatedAt: string
}