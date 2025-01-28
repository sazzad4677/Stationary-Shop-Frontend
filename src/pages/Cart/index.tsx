import { useState } from "react"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
    image: string
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        { id: 1, name: "Vintage Denim Jacket", price: 89.99, quantity: 1, image: "/placeholder.svg?height=200&width=200" },
        {
            id: 2,
            name: "Classic White Sneakers",
            price: 59.99,
            quantity: 2,
            image: "/placeholder.svg?height=200&width=200",
        },
        { id: 3, name: "Leather Tote Bag", price: 129.99, quantity: 1, image: "/placeholder.svg?height=200&width=200" },
    ])

    const updateQuantity = (id: number, newQuantity: number) => {
        setCartItems((items) =>
            items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item)),
        )
    }

    const removeItem = (id: number) => {
        setCartItems((items) => items.filter((item) => item.id !== id))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.1 // Assuming 10% tax
    const total = subtotal + tax

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Cart Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b last:border-b-0"
                                >
                                    <img
                                        src={item.image || "/placeholder.svg"}
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
                                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-destructive">
                                        <Trash2 className="h-4 w-4" />
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
                            <Separator className="my-4" />
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" size="lg">
                            Proceed to Checkout
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

