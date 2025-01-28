import { Heart, ShoppingCart, CheckCircle, XCircle } from "lucide-react";
import {useEffect, useState} from "react";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { TProduct } from "@/pages/Products";
import {useNavigate} from "react-router";

export function ProductCard({
                                _id,
                                name,
                                brand,
                                description,
                                price,
                                category,
                                quantity,
                                inStock,
                            }: TProduct) {
    const navigate = useNavigate();
    const navigateProductDetails = () => {
        navigate(`/products/${_id}`)
    }
    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddToCart = () => {
        console.log(`Added ${name} to cart`);
    };

    const handleBuyNow = () => {
        console.log(`Buying ${name} now`);
    };

    const [imageUrl, setImageUrl] = useState<string | null>(null);


    // Random Image
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(
                    `https://picsum.photos/1920/1080?random&category=${category}`
                );
                setImageUrl(response.url);
            } catch (error) {
                console.error("Error fetching image:", error);
                setImageUrl("/no-image.svg"); // Fallback image
            }
        };

        fetchImage();
    }, [category]);


    return (
        <Card onClick={navigateProductDetails} className="cursor-pointer relative w-full max-w-sm overflow-hidden rounded-lg border bg-white shadow-md transition-transform hover:scale-105">
            <div className="relative aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100">
                <img
                    src={imageUrl || "/no-image.svg"}
                    alt={name}
                    className=" w-full transition-transform duration-300 group-hover:scale-110"
                    style={{
                        aspectRatio: "16/9",
                        maxWidth: "100%",
                    }}

                />
                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute right-3 top-3 rounded-full bg-white p-2 shadow hover:bg-gray-100"
                >
                    <Heart
                        className={cn(
                            "h-5 w-5 text-gray-700 transition-colors",
                            isFavorite && "fill-current text-red-500"
                        )}
                    />
                    <span className="sr-only">Add to favorites</span>
                </button>
            </div>
            <CardContent className="p-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold tracking-tight">{name}</h3>
                        <p className="text-sm font-medium text-muted-foreground">
                            ${price.toFixed(2)}
                        </p>
                    </div>
                    <p className="text-sm text-gray-500">{brand}</p>
                    <p className="text-sm font-light italic text-muted-foreground">
                        {category}
                    </p>
                    <p className="line-clamp-3 text-sm text-gray-600">{description}</p>
                </div>
                <div className="mt-4 flex items-center gap-2">
          <span
              className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  inStock
                      ? "text-green-600"
                      : "text-red-600"
              )}
          >
            {inStock ? (
                <>
                    <CheckCircle className="h-4 w-4" />
                    In Stock ({quantity})
                </>
            ) : (
                <>
                    <XCircle className="h-4 w-4" />
                    Out of Stock
                </>
            )}
          </span>
                </div>
                <div className="mt-4 flex gap-2">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handleAddToCart}
                        disabled={!inStock}
                    >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                    </Button>
                    <Button
                        variant="default"
                        className="flex-1"
                        onClick={handleBuyNow}
                        disabled={!inStock}
                    >
                        Buy Now
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}