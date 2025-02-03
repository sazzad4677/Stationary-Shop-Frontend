import React, {useState, Dispatch, SetStateAction} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useStripe, useElements, Elements, PaymentElement} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {useAppDispatch, useAppSelector} from "@/redux/hooks.ts";
import toast from "react-hot-toast";
import {resetCart} from "@/redux/features/cart/cart.slice.ts";
import {useNavigate} from "react-router";
import {usePlaceOrderMutation} from "@/redux/features/order/order.api.ts";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string);

const CheckoutForm = ({clientSecret, setIsOpen}: {
    clientSecret: string,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [orderItem] = usePlaceOrderMutation(undefined)
    const orderData = useAppSelector(state => state.order.orderData)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) {
            alert("Stripe has not loaded properly.");
            return;
        }

        const {error: submitError} = await elements.submit();
        if (submitError) {
            toast.error(`Payment failed: ${submitError.message}`);
            return;
        }

        const stripeData = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: 'http://localhost:5173/order-placed',
            },
        })
        if (stripeData.error) {
            toast.error(`Payment failed: ${stripeData.error.message}`);
            setIsLoading(false);
        } else {
            toast.success("Payment successful!");
            setIsLoading(false);
            try {
                await toast.promise(
                    (async () => {
                        if (orderData === null) return;
                        await orderItem(orderData).unwrap();
                        dispatch(resetCart());
                        navigate("/order-placed");
                    })(),
                    {
                        loading: 'Loading...',
                        success: 'Order Placed Successfully!',
                        error: (err: { data: { message: string; }; }) => err?.data?.message,
                    },
                    {id: 'order-placed'}
                );
            } catch (error) {
                console.error('An error occurred:', error);
                toast.error('Something went wrong! Please try again.', {id: 'order-placed'});
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="my-4 border p-4 rounded">
                <PaymentElement/>
            </div>
            <div className={"flex justify-between"}>
                <Button type="submit" disabled={!stripe || isLoading}>
                    {isLoading ? "Processing..." : "Pay Now"}
                </Button>
                <Button type={"button"} variant="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

const CheckoutDialog = ({isOpen, setIsOpen, clientSecret}: {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    clientSecret: string
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className={"overflow-y-auto h-auto "} onInteractOutside={(e) =>e.preventDefault() }>
                <DialogHeader>
                    <DialogTitle>Complete Your Payment</DialogTitle>
                </DialogHeader>
                <Elements stripe={stripePromise} options={{
                    clientSecret,
                    appearance: {
                        theme: "flat",
                        variables: {
                            fontFamily: "Roboto, sans-serif",
                        },
                    }
                }}>
                    <CheckoutForm clientSecret={clientSecret} setIsOpen={setIsOpen}/>
                </Elements>
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutDialog;