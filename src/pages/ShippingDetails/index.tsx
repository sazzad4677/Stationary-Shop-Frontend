import {Button} from "@/components/ui/button.tsx"
import {Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from "@/components/ui/card.tsx"
import {shippingDetailsSchema, TShippingDetails} from "@/pages/ShippingDetails/shippingDetails.schema.ts";
import {GenericForm} from "@/components/form/GenericForm.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hooks.ts";
import {usePlaceOrderMutation} from "@/redux/features/order/order.api.ts";
import {selectUser} from "@/redux/features/auth/auth.slice.ts";
import toast from "react-hot-toast";
import {resetCart} from "@/redux/features/cart/cart.slice.ts";
import {useNavigate} from "react-router";
import {useGetCountryQueryQuery} from "@/redux/services/countryInfo.api.ts";

const initialValues: TShippingDetails = {
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    email: ""
}

const ShippingDetails = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [orderItem] = usePlaceOrderMutation(undefined)
    const cartItems = useAppSelector((state) => state.cart.items);
    const totalPrice = useAppSelector((state) => state.cart.totalPrice);
    const user = useAppSelector(selectUser)
    const {data: countryData} = useGetCountryQueryQuery(undefined)
    const countryOptions = countryData?.map((item: { name: string }) => ({
        label: item.name,
        value: item.name,
    }))
    const onSubmit = async (values: TShippingDetails) => {
        const {addressLine1, addressLine2, city, state, zipCode, country} = values
        const orderData = {
            shippingAddress: {
                address1: addressLine1,
                address2: addressLine2,
                city,
                state,
                zipCode,
                country,
            },
            products: cartItems.map((item) => {
                return {
                    productId: item._id,
                    quantity: item.quantity,
                }
            }),
            totalPrice,
        }
        try {
            await toast.promise(
                (async () => {
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

    return (
        <GenericForm initialValues={{
            ...initialValues,
            email: user?.email || "",
            fullName: user?.name || "",
        }} onSubmit={onSubmit} schema={shippingDetailsSchema}>
            <div className="container mx-auto px-4 py-8">
                <Card className="w-full max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Shipping Details</CardTitle>
                        <CardDescription>Please confirm your shipping information</CardDescription>
                    </CardHeader>
                    <CardContent>

                        <div className={"space-y-6"}>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className={"col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4"}>
                                    <GenericForm.Text
                                        <TShippingDetails>
                                        name="fullName"
                                        required
                                        label={"Full Name"}
                                        placeholder={"Enter your full name"}
                                    />
                                    <GenericForm.Text
                                        <TShippingDetails>
                                        name="email"
                                        required
                                        label={"Email"}
                                        placeholder={"Enter your Email"}
                                    />
                                </div>
                                <div className={"col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4"}>
                                    <GenericForm.TextArea
                                        <TShippingDetails>
                                        name="addressLine1"
                                        required
                                        label={"Address Line 1"}
                                        placeholder={"123 Main St"}
                                        resizeable
                                    />
                                    <GenericForm.TextArea
                                        <TShippingDetails>
                                        name="addressLine2"
                                        label={"Address Line 2"}
                                        placeholder={"Apartment 123"}
                                        resizeable
                                    />
                                </div>
                                <GenericForm.Select
                                    <TShippingDetails>
                                    name="country"
                                    required
                                    placeholder={"Country"}
                                    label={"Country"}
                                    options={countryOptions || []}
                                />
                                <GenericForm.Select
                                    <TShippingDetails>
                                    name="city"
                                    required
                                    placeholder={"City"}
                                    label={"City"}
                                    options={[{
                                        label: "New York",
                                        value: "New York"
                                    }, {
                                        label: "Los Angeles",
                                        value: "Los Angeles"
                                    }, {
                                        label: "Chicago",
                                        value: "Chicago"
                                    }
                                    ]}
                                />
                                <GenericForm.Text
                                    <TShippingDetails>
                                    name="state"
                                    placeholder={"State"}
                                    label={"State"}
                                    required
                                />
                                <GenericForm.Text
                                    <TShippingDetails>
                                    name="zipCode"
                                    placeholder={"Zip Code"}
                                    label={"Zip Code"}
                                    required
                                />

                            </div>
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button>Confirm and Continue</Button>
                    </CardFooter>
                </Card>
            </div>
        </GenericForm>
    )
}

export default ShippingDetails