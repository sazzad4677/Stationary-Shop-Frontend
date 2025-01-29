import {Minus, Plus, Trash2} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {ScrollArea} from "@/components/ui/scroll-area"
import {useAppDispatch, useAppSelector} from "@/redux/hooks.ts";
import {
    updateQuantity as updateQuantityAction,
    removeItem as removeItemAction
} from "@/redux/features/cart/cart.slice.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import ShippingDetails from "@/pages/ShippingDetails";
import {useState} from "react";
import toast from "react-hot-toast";

export default function CartPage() {
    const [tabValue, setTabValue] = useState<string>("cart")
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);

    const updateQuantity = (_id: string, newQuantity: number) => {
        dispatch(updateQuantityAction({_id: _id, quantity: newQuantity}))
    }

    const removeItem = (id: string) => {
        dispatch(removeItemAction(id))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.1 // Assuming 10% tax for design purpose for now will do functionality later
    const total = subtotal + tax
    const shippingFee = total > 50 ? 0 : (Number(total.toFixed(2)) * 0.01).toFixed(2)
    const proceedToCheckout = () => {
        if (cartItems.length === 0 ) {
            toast.error("Your cart is empty. Please add some items to proceed.", { id: "cart-empty-error" });
            return;
        }
        setTabValue("shipping")
    }

    return (
        <Tabs value={tabValue} onValueChange={(v) => {
            if (cartItems.length === 0 && v === "shipping") {
                toast.error("Your cart is empty. Please add some items to proceed.", { id: "cart-empty-error" });
                return;
            }
            setTabValue(v);

        }} defaultValue={"cart"}
              className={"container mx-auto px-4 py-8"}>
            <TabsList className="grid md:w-1/2 w-full grid-cols-2 mx-auto bg-primary ">
                <TabsTrigger value="cart">Cart</TabsTrigger>
                <TabsTrigger value="shipping">Shipping Details</TabsTrigger>
            </TabsList>
            <TabsContent value="cart">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Cart Items</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b last:border-b-0"
                                        >
                                            <img
                                                src={"/no-image.svg"}
                                                alt={item.name}
                                                width={100}
                                                height={100}
                                                className="rounded-md object-cover"
                                            />
                                            <div className="flex-grow text-center sm:text-left">
                                                <h2 className="font-semibold text-lg">{item.name}</h2>
                                                <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="icon"
                                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                        disabled={item.quantity === 1}>
                                                    <Minus className="h-4 w-4"/>
                                                </Button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <Button variant="outline" size="icon"
                                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                                                    <Plus className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                            <Button variant="ghost" size="icon" onClick={() => removeItem(item._id)}
                                                    className="text-destructive">
                                                <Trash2 className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    ))}
                                </ScrollArea>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping Fee</span>
                                        <span>${shippingFee}</span>
                                    </div>
                                    <Separator className="my-4"/>

                                    <div className="flex justify-between font-semibold text-lg">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>

                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type={"button"} onClick={proceedToCheckout} className="w-full" size="lg">
                                    Proceed to Checkout
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="shipping">
                <ShippingDetails/>
            </TabsContent>
        </Tabs>
    )
}

