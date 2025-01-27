import {Heart, ShoppingCart} from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge.tsx"
import { Card, CardContent } from "@/components/ui/card.tsx"
import { cn } from "@/lib/utils.ts"
import {Button} from "@/components/ui/button.tsx";

interface ProductCardProps {
    title: string
    description: string
    price: number
    imageSrc: string
    isNew?: boolean
}

export function ProductCard({ title, description, price, imageSrc, isNew = false }: ProductCardProps) {
    const [isFavorite, setIsFavorite] = useState(false)


    const handleAddToCart = () => {
        // Placeholder function for adding to cart
        console.log(`Added ${title} to cart`)
    }

    const handleBuyNow = () => {
        // Placeholder function for buying now
        console.log(`Buying ${title} now`)
    }


    return (
        <Card className="group relative w-full border-0 bg-transparent">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
                <img
                    src={imageSrc || "/no-image.svg"}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-sm transition-colors hover:bg-gray-100"
                >
                    <Heart className={cn("h-4 w-4", isFavorite && "fill-current text-red-500")} />
                    <span className="sr-only">Add to favorites</span>
                </button>
            </div>
            <CardContent className="px-4 pt-4">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-medium">{title}</h3>
                            {isNew && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    NEW
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                    <div className="text-right">
                        <span className="font-medium">${price.toFixed(2)}</span>
                    </div>
                </div>
                <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={handleAddToCart}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                    </Button>
                    <Button variant={"default"} className="flex-1" onClick={handleBuyNow}>
                        Buy Now
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

