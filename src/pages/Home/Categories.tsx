import { Card, CardContent } from "@/components/ui/card"
import {Link} from "react-router";

const categories = [
    { name: "Notebooks", icon: "📓" },
    { name: "Pens", icon: "🖋️" },
    { name: "Desk Accessories", icon: "🗃️" },
    { name: "Planners", icon: "📅" },
]

const ProductCategories = () => {
    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <Link key={category.name} to={`/products?category=${category.name.toLowerCase()}`}>
                            <Card className="transition-all hover:shadow-md">
                                <CardContent className="p-6 text-center">
                                    <span className="text-4xl mb-4 block">{category.icon}</span>
                                    <h3 className="text-xl font-semibold">{category.name}</h3>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProductCategories