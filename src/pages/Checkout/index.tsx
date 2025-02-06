import { useEffect, useState } from 'react';
import { ChevronRight, CreditCard, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ShippingDetails from '@/pages/ShippingDetails';
import { handleToastPromise } from '@/utils/handleToastPromise.ts';
import CheckoutDialog from '@/pages/Checkout/CheckoutDialog.tsx';
import { usePlaceOrderMutation } from '@/redux/features/order/order.api.ts';
import { useAppSelector } from '@/redux/hooks.ts';
import toast from 'react-hot-toast';
import { useGetProfileQuery } from '@/redux/features/profile/profile.api.ts';

export default function CheckoutPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [orderData, setOrderData] = useState<{
    clientSecret: string,
    order: {
      id: string,
      orderId: string
    }
  } | null>(null);
  const [orderItem, { isLoading }] = usePlaceOrderMutation(undefined);
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const { data: userData } = useGetProfileQuery(undefined);
  const placeOrder = async () => {
    if (!userData?.isShippingAddressAdded) {
      toast.error('Shipping Address is Required', { id: 'shipping-address-required' });
      return;
    }
    const orderData = {
      products: cartItems.map((item) => {
        return {
          productId: item._id,
          quantity: item.quantity
        };
      }),
      totalPrice
    };
    await handleToastPromise(
      async () => {
        const { data } = await orderItem(orderData).unwrap();
        if (!data?.clientSecret) return toast.error('An error occurred during placing the order. Please try again later.');
        setOrderData(data);
        setIsPaymentDialogOpen(true);
      },
      {
        loading: 'Placing Order...',
        success: 'Successfully Placed the Order!',
        error: (err: { data: { message: string } }) =>
          err?.data?.message || 'An error occurred during update. Please try again later.'
      },
      'place-order'
    );
  };
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  const shippingFee = total > 50 ? 0 : Number((total * 0.01).toFixed(2));
  useEffect(() => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Please add some products to your cart.', { id: 'no-item-in-cart' });
    }
  }, [cartItems.length]);
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-primary-foreground">Checkout</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Cart</span>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span>Checkout</span>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2 px-2">
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Complete your order by providing your shipping and payment
              details.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={'space-y-4'}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Shipment Information</h3>
                <Button type={'button'} variant="outline" size="sm" disabled={!cartItems?.length}
                        onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? (
                    'Cancel'
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
              <ShippingDetails isEditing={isEditing} setIsEditing={setIsEditing} />
            </div>
          </CardContent>
          {!isEditing && <CardFooter className="flex justify-between">
            <Button disabled={!cartItems?.length} onClick={placeOrder} type="button" className="w-full"
                    loading={isLoading}>
              Place Order
            </Button>
            <CheckoutDialog isOpen={isPaymentDialogOpen} setIsOpen={setIsPaymentDialogOpen}
                            orderData={orderData} />
          </CardFooter>}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CreditCard className="h-4 w-4" />
              <span>Secure payment processed by Stripe</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

