import {ProductCard} from "@/components/features/ProductCard.tsx";

const FeaturedProducts = () => {
    const products = [
        {
            title: "The Valentine's Day Mini",
            description: 'Foiled 6.5" x 6.5" Hardcover Photo Book',
            price: 38.0,
            imageSrc: "https://papier.imgix.net/https%3A%2F%2Fwww.papier.com%2Fus%2Ftemplated_image%2F92%2F1737540453%2F1737377644%2F53002.jpg?ixlib=rb-3.2.1&w=408&auto=format%2Ccompress&s=7af09533e4432b3386c54b675b8309d9",
            isNew: true,
        },
        {
            title: "Painted Love",
            description: "Wellness Journal",
            price: 35.0,
            imageSrc: "",
            isNew: false,
        },
        {
            title: "Sweet Treat",
            description: "Recipe Journal & Recipe Cards Set",
            price: 80.0,
            imageSrc: "",
            isNew: true,
        },
        {
            title: "Full of Heart",
            description: "Notecard Set",
            price: 38.0,
            imageSrc: "",
            isNew: false,
        },
    ]


    return (
        <section className=" py-16">
            {/* Section Title */}
            <div className="container mx-auto text-center px-4 mb-12">
                <h1 className="text-4xl md:text-5xl font-serif">
                    START <span className="italic font-light">your next big thing</span>
                </h1>
                <div className="flex justify-end mt-4">
                    <a href="/planners" className="text-primary-foreground hover:underline">
                        Browse All Products
                    </a>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto mt-8 grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.title} {...product} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;