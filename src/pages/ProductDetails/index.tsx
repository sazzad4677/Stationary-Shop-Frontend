import { useEffect, useState } from 'react';
import {Star, Truck, ArrowRight, Heart, Share2, Package} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Input} from "@/components/ui/input"
import {Badge} from "@/components/ui/badge"
import {Separator} from "@/components/ui/separator"
import {addItem} from "@/redux/features/cart/cart.slice.ts";
import {useAppDispatch} from "@/redux/hooks.ts";
import {useGetSingleProductQuery} from "@/redux/features/products/products.api.ts";
import {  useParams } from 'react-router';
import moment from 'moment';
import LoadingSpinner from "@/components/ui/loadingSpinner.tsx";

export default function ProductDetailsPage() {
    const dispatch = useAppDispatch();
    const params = useParams();
    const {data, isLoading} = useGetSingleProductQuery(params.id);
    const [quantity, setQuantity] = useState(1)
    const [isFavorite, setIsFavorite] = useState(false)
    const [mainImage, setMainImage] = useState(data?.images?.[0] || "/no-image.svg")
    const handleAddToCart = () => {
        dispatch(addItem({
            ...data!,
            quantity,
        }))
    };

    useEffect(() => {
        if (data?.images?.length) {
            setMainImage(data?.images[0])
        }
    }, [data?.images])

    return (
        <div>
            {isLoading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center ">
                    <LoadingSpinner />
                </div>
            )}
            <div>
                <div className="container mx-auto px-4 py-8">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            {/* Main Product Image */}
                            <div
                                className="relative aspect-square flex justify-center items-center overflow-hidden rounded-lg border shadow-sm">
                                <img
                                    src={mainImage || "/no-image.svg"}
                                    alt="Product image"
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    style={{
                                        aspectRatio: "16 / 9",
                                    }}
                                />
                            </div>

                            {/* Product Thumbnails */}
                            <div className="grid grid-cols-4 gap-4">
                                {data?.images?.map((thumb, i) => (
                                    <button
                                        key={i}
                                        className={`aspect-square overflow-hidden rounded-md border ${
                                            thumb === mainImage ? "ring-2 ring-primary-foreground" : ""
                                        }`}
                                        onClick={() => setMainImage(thumb)}
                                    >
                                        <img
                                            src={thumb || "/placeholder.svg"}
                                            alt={`Thumbnail ${i + 1}`}
                                            className="w-full h-full object-cover transition-opacity duration-200 hover:opacity-80"
                                            style={{
                                                aspectRatio: "16 / 9",
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <Badge variant="secondary" className="mb-2">
                                    {data?.category}
                                </Badge>
                                <h1 className="text-4xl font-bold mb-2">{data?.name}</h1>
                                <p className="text-lg text-muted-foreground">Brand: {data?.brand}</p>
                                <div className="flex items-center mt-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400"/>
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm text-muted-foreground">(75 reviews)</span>
                                </div>
                            </div>

                            <p className="text-3xl font-bold">${data?.price.toFixed(2)}</p>

                            <Separator/>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Package className="w-5 h-5 text-muted-foreground"/>
                                    <span className="text-sm text-muted-foreground">
                                {data?.inStock ? `In stock: ${data?.quantity} available` : "Out of stock"}
                            </span>
                                </div>
                                <div>
                                    <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                                        Quantity
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <Button variant="outline" size="icon"
                                                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>
                                            -
                                        </Button>
                                        <Input
                                            id="quantity"
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(Number(e.target.value), 1))}
                                            className="w-20 text-center"
                                            min="1"
                                            max={data?.quantity}
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setQuantity((prev) => Math.min(prev + 1, (data?.quantity || 0)))}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <Button className="flex-1" disabled={!data?.inStock} onClick={handleAddToCart}>
                                    {data?.inStock ? "Add to Cart" : "Out of Stock"}
                                </Button>
                                <Button variant="outline" size="icon" onClick={() => setIsFavorite(!isFavorite)}>
                                    <Heart className={isFavorite ? "fill-red-500 text-red-500" : ""}/>
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Share2/>
                                </Button>
                            </div>

                            <div className="flex items-center text-sm text-muted-foreground">
                                <Truck className="w-4 h-4 mr-2"/>
                                <span>Free shipping on orders over $50</span>
                            </div>

                            <Separator/>

                            <div className="text-sm text-muted-foreground">Last
                                updated: {moment(data?.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                        </div>
                    </div>

                    <Tabs defaultValue="description" className="mt-12">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="description">Description</TabsTrigger>
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        </TabsList>
                        <TabsContent value="description" className="mt-6">
                            <Card>
                                <CardContent className="prose max-w-none p-6">
                                    <p>
                                        {data?.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="details" className="mt-6">
                            <Card>
                                <CardContent className="p-6">
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>100% organic cotton</li>
                                        <li>Available in multiple sizes and colors</li>
                                        <li>Reinforced seams for durability</li>
                                        <li>Machine washable</li>
                                        <li>Pre-shrunk fabric</li>
                                        <li>Ethically manufactured</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="reviews" className="mt-6">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="border-b pb-4 last:border-b-0">
                                                <div className="flex items-center mb-2">
                                                    <div className="flex mr-2">
                                                        {[...Array(5)].map((_, j) => (
                                                            <Star
                                                                key={j}
                                                                className={`w-4 h-4 ${
                                                                    j < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="font-semibold">Great product!</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    This t-shirt is fantastic. The cotton quality is excellent, and it's
                                                    really
                                                    comfortable. Perfect
                                                    for daily wear, and I'll definitely buy more in different colors!
                                                </p>
                                            </div>
                                        ))}
                                        <Button variant="outline" className="w-full">
                                            Read More Reviews
                                            <ArrowRight className="w-4 h-4 ml-2"/>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            </div>

    )
}

