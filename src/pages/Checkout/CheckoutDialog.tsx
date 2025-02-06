import React, {useState, Dispatch, SetStateAction} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useStripe, useElements, Elements, PaymentElement} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {useAppDispatch} from "@/redux/hooks.ts";
import toast from "react-hot-toast";
import {resetCart} from "@/redux/features/cart/cart.slice.ts";
import {useNavigate} from "react-router";

type TOrderData = {
    clientSecret: string,
    order: {
        id: string,
        orderId: string
    }
} | null;

const CheckoutForm = ({orderData, setIsOpen}: {
    orderData:  TOrderData,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

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
            clientSecret: orderData?.clientSecret || "",
            confirmParams: {
                return_url: `${window.location.origin}/order-placed`,
            },
            redirect: "if_required",
        })
        if (stripeData.error) {
            toast.error(`Payment failed: ${stripeData.error.message}`);
            setIsLoading(false);
        } else {
            // console.log(stripeData);
            toast.success("Payment successful!");
            setIsLoading(false);
            setIsOpen(false);
            dispatch(resetCart());
            navigate("/order-placed", { state: { orderId: orderData?.order?.orderId, id: orderData?.order?.id } });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="my-4 border p-4 rounded">
                <PaymentElement/>
            </div>
            <div className={"flex gap-x-4 justify-end"}>
                <Button type={"button"} variant="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                </Button>
                <Button type="submit" disabled={!stripe || isLoading}>
                    {isLoading ? "Processing..." : "Pay Now"}
                </Button>
            </div>
        </form>
    );
};

const CheckoutDialog = ({isOpen, setIsOpen, orderData}: {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    orderData: TOrderData
}) => {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className={"overflow-y-auto min-h-[50vh] max-h-[90vh]"} onInteractOutside={(e) =>e.preventDefault() }>
                <DialogHeader>
                    <DialogTitle>Complete Your Payment</DialogTitle>
                </DialogHeader>
                {stripePromise && <Elements stripe={stripePromise} options={{
                    clientSecret: orderData?.clientSecret,
                    appearance: {
                        theme: "flat",
                        variables: {
                            fontFamily: "Roboto, sans-serif",
                        },
                    }
                }}>
                    <CheckoutForm orderData={orderData} setIsOpen={setIsOpen}/>
                </Elements>}
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutDialog;