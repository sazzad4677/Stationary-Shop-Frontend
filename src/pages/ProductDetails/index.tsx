import {useState} from "react"
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
import {useParams} from "react-router";

export default function ProductDetailsPage() {
    const dispatch = useAppDispatch();
    const params = useParams();
    const {data} = useGetSingleProductQuery(params.id);
    const [quantity, setQuantity] = useState(1)
    const [isFavorite, setIsFavorite] = useState(false)
    const [mainImage, setMainImage] = useState("/no-image.svg")
    const thumbnails = ["/no-image.svg", "/no-image.svg", "/no-image.svg", "/no-image.svg"]
    const handleAddToCart = () => {
        dispatch(addItem({
            ...data!,
            quantity,
        }))
    };
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <div className="relative flex justify-center aspect-square overflow-hidden rounded-lg">
                        <img
                            src={mainImage || "/no-image.svg"}
                            alt="Product image"
                            className="w-1/2 h-full  object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {thumbnails.map((thumb, i) => (
                            <div key={i} className="aspect-square overflow-hidden rounded-md">
                                <img
                                    src={thumb || "/placeholder.svg"}
                                    alt={`Product thumbnail ${i + 1}`}
                                    className="w-full h-full object-cover hover:opacity-75 transition-opacity duration-300 cursor-pointer"
                                    onClick={() => setMainImage(thumb)}
                                />
                            </div>
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

                    <div className="text-sm text-muted-foreground">Last updated: {formatDate(data?.updatedAt as string)}</div>
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
                                Our Premium Cotton T-Shirt is the perfect blend of comfort and style. Made from 100%
                                organic cotton,
                                this shirt is soft to the touch and breathable, making it ideal for all-day wear.
                                The
                                classic cut
                                ensures a flattering fit for all body types, while the reinforced seams add
                                durability
                                to this wardrobe
                                staple.
                            </p>
                            <p>
                                Available in a range of colors, this versatile t-shirt can be dressed up or down,
                                making
                                it suitable for
                                any occasion. Whether you're heading to the gym, running errands, or meeting friends
                                for
                                a casual
                                dinner, our Premium Cotton T-Shirt has got you covered.
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
    )
}

