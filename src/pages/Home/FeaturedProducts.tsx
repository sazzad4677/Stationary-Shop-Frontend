import {ProductCard} from "@/components/features/ProductCard.tsx";
import {useGetProductsQuery} from "@/redux/features/products/products.api.ts";

const FeaturedProducts = () => {
    const {data: productData} = useGetProductsQuery({
        page: Math.floor(Math.random() * 3) + 1,
        limit: 8,
        "filter[inStock]": true
    })
    return (
        <section className="py-14">
            {/* Section Title */}
            <div className="container mx-auto text-center px-4 mb-10">
                <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
                <div className="flex justify-end mt-4">
                    <a href="/products" className="text-primary-foreground hover:underline">
                        Browse All Products
                    </a>
                </div>
            </div>
            {/* Product Grid */}
            <div className="container mx-auto mt-8 grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
                {productData?.data?.map((product) => (
                    <ProductCard key={product._id} {...product} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;