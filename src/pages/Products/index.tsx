import {useState, useRef} from "react";
import {Button} from "@/components/ui/button";
import { FilterIcon, XIcon} from "lucide-react";
import {ProductCard} from "@/components/features/ProductCard";
import {motion, AnimatePresence} from "framer-motion";
import {filterSchema, TFilter} from "@/pages/Products/Products.schema";
import {GenericForm, TGenericFormRef} from "@/components/form/GenericForm.tsx";
import {useGetProductsQuery} from "@/redux/features/products/products.api.ts";

export interface TProduct {
    _id: string
    name: string
    brand: string
    price: number
    category: string
    description: string
    quantity: number
    inStock: boolean
}


const categories = ["Fiction", "Science Fiction", "Romance", "Fantasy"];

export default function AllProductsPage() {
    const { data: productData } = useGetProductsQuery(undefined)
    // const [searchTerm, setSearchTerm] = useState<string>("");
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    const initialValues: TFilter = {
        searchTerm: "",
        priceRange: [0, 50],
        selectedCategory: null,
        showAvailableOnly: false,
        sortBy: "title",
    }
    const onSubmit = (values: TFilter) => {
        console.log(values)
    }
    const formRef = useRef<TGenericFormRef<TFilter>>(null);
    return (
        <div className="container mx-auto p-4  min-h-screen">
            <GenericForm ref={formRef}
                         schema={filterSchema}
                         initialValues={initialValues}
                         onSubmit={onSubmit}>
                {/* Search Bar and Filter Button */}
                <div className="flex flex-col md:flex-row items-center mb-6 gap-4">
                    <GenericForm.SearchField<TFilter>
                        name="searchTerm"
                        placeholder="Type to search..."
                        className="w-full"
                    />

                    <Button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        variant="outline"
                        className="w-full md:w-auto"
                    >
                        <FilterIcon className="mr-2 h-4 w-4"/>
                        Filters
                    </Button>
                </div>

                <div className="relative">
                    <FilterSidebar
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                    />

                    <AnimatePresence>
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: 20}}
                            transition={{duration: 0.3}}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {productData?.map((product: TProduct) => (
                                    <motion.div
                                        key={product._id}
                                        initial={{opacity: 0, scale: 0.9}}
                                        animate={{opacity: 1, scale: 1}}
                                        transition={{duration: 0.3}}
                                    >
                                        <ProductCard {...product} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </GenericForm>
        </div>
    );
}

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

function FilterSidebar({isOpen, onClose,}: FilterSidebarProps) {

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{x: "100%"}}
                    animate={{x: 0}}
                    exit={{x: "100%"}}
                    transition={{type: "spring", damping: 20, stiffness: 100}}
                    className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50 overflow-y-auto"
                >
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-primary">Filters</h2>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <XIcon className="h-6 w-6"/>
                            </Button>
                        </div>

                        {/* Reusing FilterForm inside Sidebar */}
                        <div className="p-4 space-y-4">
                            {/* Price Range Slider */}
                            <GenericForm.SliderField<TFilter>
                                name="priceRange"
                                min={0}
                                max={50}
                                step={1}
                                label="Price Range"
                            />

                            {/* Category Selector */}
                            <GenericForm.Select<TFilter>
                                name="selectedCategory"
                                label="Category"
                                placeholder="Select a category"
                                options={[
                                    {value: "all", label: "All Categories"},
                                    ...categories.map((category) => ({
                                        value: category,
                                        label: category,
                                    })),
                                ]}
                            />
                            {/* Sort By Selector */}
                            <GenericForm.Select<TFilter>
                                name="sortBy"
                                label="Sort By"
                                placeholder="Sort by"
                                options={[
                                    {value: "title", label: "Title"},
                                    {value: "price", label: "Price: Low to High"},
                                ]}
                            />
                            <Button type="submit" className={"w-full"}>
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}