import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const FeaturedProducts = () => {
    const products = [
        {
            id: 1,
            name: "Creative Notebook",
            image: "https://papier.imgix.net/https%3A%2F%2Fwww.papier.com%2Fus%2Ftemplated_image%2F41%2F1731414708%2F1737723218%2F54108.jpg?ixlib=rb-3.2.1&w=1000&auto=format%2Ccompress&s=e1b26afbe9cc1e6ab286bfbf5dc99773",
            price: "$15",
        },
        {
            id: 2,
            name: "Elegant Pen Set",
            image: "/path-to-image-2.jpg",
            price: "$25",
        },
        {
            id: 3,
            name: "Artistic Sketchbook",
            image: "/path-to-image-3.jpg",
            price: "$20",
        },
        {
            id: 4,
            name: "Color Marker Pack",
            image: "/path-to-image-4.jpg",
            price: "$18",
        },
    ];

    return (
        <section className="bg-neutral py-16">
            {/* Section Title */}
            <div className="container mx-auto text-center px-4">
                <h2 className="text-3xl font-bold text-secondary">Featured Collections</h2>
                <Separator className="my-4 bg-secondary h-1 mx-auto w-24 rounded-full" />
                <p className="text-muted-foreground">
                    Explore our thoughtfully curated stationary items to elevate your creativity.
                </p>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto mt-8 grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <Card key={product.id} className="hover:shadow-lg transition-shadow">
                        {/* Product Image */}
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-56 object-cover rounded-t-lg"
                        />

                        {/* Card Content */}
                        <CardContent className="p-4 text-center">
                            <CardTitle className="text-lg font-medium text-primary-foreground">
                                {product.name}
                            </CardTitle>
                            <p className="text-muted-foreground my-2">{product.price}</p>
                            <Button
                                variant="secondary"
                                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                            >
                                Shop Now
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;