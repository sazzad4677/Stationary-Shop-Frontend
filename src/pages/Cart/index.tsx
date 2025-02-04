"use client"

import { Minus, Plus, Trash2, ShoppingCart, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
    updateQuantity as updateQuantityAction,
    removeItem as removeItemAction,
} from "@/redux/features/cart/cart.slice"
import { useNavigate } from "react-router"
import { motion } from "framer-motion"

export default function CartPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector((state) => state.cart.items)

    const updateQuantity = (_id: string, newQuantity: number) => {
        dispatch(updateQuantityAction({ _id, quantity: newQuantity }))
    }

    const removeItem = (id: string) => {
        dispatch(removeItemAction(id))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.1
    const total = subtotal + tax
    const shippingFee = total > 50 ? 0 : Number((total * 0.01).toFixed(2))

    const proceedToCheckout = () => {
        navigate("/cart/checkout")
    }

    return (
        <div className="container mx-auto px-4 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-primary-foreground">Shopping Cart</h1>
                <div className="flex items-center text-sm text-muted-foreground">
                    <span>Home</span>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span>Cart</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Cart Items ({cartItems.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
                            {cartItems.map((item) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="flex items-center gap-4 py-4 border-b last:border-b-0 hover:bg-muted/50 rounded-lg p-2 transition-colors"
                                >
                                    <img
                                        src={ "/no-image.svg"}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="rounded-md object-cover"
                                    />
                                    <div className="flex-grow">
                                        <h2 className="font-semibold text-lg">{item.name}</h2>
                                        <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            disabled={item.quantity === 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeItem(item._id)}
                                        className="text-destructive hover:bg-destructive/10"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </motion.div>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>
                <Card className="lg:sticky lg:top-8 h-fit">
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
                                <span>${shippingFee.toFixed(2)}</span>
                            </div>
                            <Separator className="my-4" />
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className={"w-full"}>
                        <Button
                            onClick={proceedToCheckout}
                            disabled={!cartItems?.length}
                            className={"w-full"}
                        >
                            Proceed to Checkout
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

