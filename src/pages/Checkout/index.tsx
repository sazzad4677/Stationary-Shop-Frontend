import React, {useState, useEffect, Dispatch, SetStateAction} from "react";
import {Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useStripe, useElements, CardElement, Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {useAppDispatch, useAppSelector} from "@/redux/hooks.ts";
import toast from "react-hot-toast";
import {resetCart} from "@/redux/features/cart/cart.slice.ts";
import {useNavigate} from "react-router";
import {usePlaceOrderMutation} from "@/redux/features/order/order.api.ts";
import {selectToken} from "@/redux/features/auth/auth.slice.ts";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string);

const CheckoutForm = ({clientSecret}: { clientSecret: string }) => {
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

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            alert("Card Element has not loaded.");
            return;
        }

        const {error, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            toast.error(`Payment failed: ${error.message}`);
            setIsLoading(false);
        } else if (paymentIntent?.status === "succeeded") {
            toast.success("Payment successful!");
            setIsLoading(false);
            try {
                await toast.promise(
                    (async () => {
                        if(orderData === null) return;
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
                <CardElement/>
            </div>
            <Button type="submit" disabled={!stripe || isLoading}>
                {isLoading ? "Processing..." : "Pay Now"}
            </Button>
        </form>
    );
};

const CheckoutDialog = ({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>}) => {
    const [clientSecret, setClientSecret] = useState("");
    const totalPrice = useAppSelector((state) => state.cart.totalPrice);
    const user = useAppSelector(selectToken)
    useEffect(() => {
        const fetchPaymentIntent = async () => {
            const response = await fetch("http://localhost:5000/api/orders/create-payment-intent", {
                method: "POST",
                headers: {"Content-Type": "application/json", "authorization": `Bearer ${user}`},
                body: JSON.stringify({amount: Math.round(totalPrice * 100), currency: "usd"}),
            });
            const data = await response.json();
            setClientSecret(data.data);
        };

        if (isOpen) {
            (async () => await fetchPaymentIntent())();
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Checkout</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Complete Your Payment</DialogTitle>
                </DialogHeader>
                {clientSecret ? (
                    <Elements stripe={stripePromise} options={{clientSecret}}>
                        <CheckoutForm clientSecret={clientSecret}/>
                    </Elements>
                ) : (
                    <p>Loading payment details...</p>
                )}
                <DialogFooter>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutDialog;