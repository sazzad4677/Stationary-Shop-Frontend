import {Heart, ShoppingCart, CheckCircle, XCircle} from "lucide-react"
import {useEffect, useState} from "react"
import {Card, CardContent} from "@/components/ui/card"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {useAppDispatch, useAppSelector} from "@/redux/hooks"
import {addItem} from "@/redux/features/cart/cart.slice"
import {Link} from "react-router"

export function ProductCard(product: any) {
    const {_id, name, brand, price, category, quantity, inStock} = product
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector((state) => state.cart.items)
    const [isInCart, setIsInCart] = useState(false)
    const [cartQuantity, setCartQuantity] = useState(0)

    useEffect(() => {
        const cartItem = cartItems.find((item) => item._id === _id)
        if (cartItem) {
            setIsInCart(true)
            setCartQuantity(cartItem.quantity)
        } else {
            setIsInCart(false)
            setCartQuantity(0)
        }
    }, [cartItems, _id])

    const handleAddToCart = () => {
        dispatch(
            addItem({
                ...product,
                quantity: 1,
            }),
        )
    }

    const handleBuyNow = () => {
        console.log(`Buying ${name} now`)
    }

    return (
        <Card
            className="relative w-full max-w-sm overflow-hidden rounded-lg border bg-white shadow-md transition-transform hover:scale-105">
            <Link to={`/products/${_id}`}
                  className="relative aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100">
                <img
                    src={product.images?.[0] || "/no-image.svg"}
                    alt={name}
                    className="w-full transition-transform duration-300 group-hover:scale-110"
                    style={{
                        aspectRatio: "16/9",
                        maxWidth: "100%",
                    }}
                />
                <button className="absolute right-3 top-3 rounded-full bg-white p-2 shadow hover:bg-gray-100">
                    <Heart className={cn("h-5 w-5 text-gray-700 transition-colors")}/>
                    <span className="sr-only">Add to favorites</span>
                </button>
            </Link>
            <CardContent className="p-4">
                <div className="flex flex-col gap-2">
                    <Link to={`/products/${_id}`} className="flex items-center justify-between">
                        <h1 className="text-lg font-bold tracking-tight">{name}</h1>
                        <p className="text-sm font-medium text-muted-foreground">${price.toFixed(2)}</p>
                    </Link>
                    <p className="text-sm text-gray-500">{brand}</p>
                    <p className="text-sm font-light italic text-muted-foreground">{category}</p>
                </div>
                <div className="mt-4 flex items-center gap-2">
          <span
              className={cn("flex items-center gap-1 text-sm font-medium", inStock ? "text-green-600" : "text-red-600")}
          >
            {inStock ? (
                <>
                    <CheckCircle className="h-4 w-4"/>
                    In Stock ({quantity})
                </>
            ) : (
                <>
                    <XCircle className="h-4 w-4"/>
                    Out of Stock
                </>
            )}
          </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                        variant={isInCart ? "default" : "outline"}
                        onClick={handleAddToCart}
                        disabled={!inStock}
                        className={cn("transition-all duration-300", isInCart && "bg-green-600 hover:bg-green-700 text-white")}
                    >
                        {isInCart ? (
                            <>
                                <CheckCircle className="mr-2 h-4 w-4"/>
                                In Cart ({cartQuantity})
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="mr-2 h-4 w-4"/>
                                Add to Cart
                            </>
                        )}
                    </Button>
                    <Button variant="default" onClick={handleBuyNow} disabled={!inStock}>
                        Buy Now
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

