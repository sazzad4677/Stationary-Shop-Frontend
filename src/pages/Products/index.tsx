import {useState, useRef, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {FilterIcon} from "lucide-react";
import {ProductCard} from "@/components/features/ProductCard";
import {motion, AnimatePresence} from "framer-motion";
import {filterSchema, TFilter} from "@/pages/Products/Products.schema";
import {GenericForm, TGenericFormRef} from "@/components/form/GenericForm.tsx";
import {useGetProductsQuery} from "@/redux/features/products/products.api.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {useDebounce} from "@/hooks/useDebounce.tsx";

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

const getMinMaxPrice = (productData: TProduct[]) => {
    let minPrice = 0
    let maxPrice = 0
    if (productData) {
        minPrice = Math.min(...productData.map((product) => product.price));
        maxPrice = Math.max(...productData.map((product) => product.price));
    }
    return {minPrice, maxPrice};
}

const initialValues: TFilter = {
    searchTerm: "",
    priceRange: [0, 0],
    selectedCategory: "all",
    inStock: false,
    sortBy: "createdAt",
    page: 1,
    limit: 10
};

export default function AllProductsPage() {
    const formRef = useRef<TGenericFormRef<TFilter>>(null);
    const searchTerm = formRef.current?.getValues();
    const debounce = useDebounce(searchTerm?.searchTerm || "", 500);
    const [query, setQuery] = useState<Record<string, unknown>>({
        page: initialValues.page,
        limit: initialValues.limit,
        sortBy: initialValues.sortBy,
    });
    const {data: productData, refetch} = useGetProductsQuery(query)
    const categoryOptions = Array.from(
        new Set(productData?.data?.map((product: TProduct) => product.category))
    ).map((category) => ({
        value: category,
        label: category,
    }));

    const sortByOptions = [
        {value: "name", label: "Name"},
        {value: "price", label: "Price: Low to High"},
        {value: "-price", label: "Price: High to Low"},
    ]
    const onSubmit = (values: TFilter) => {
        const queryObject = {
            search: values.searchTerm,
            "filter[minPrice]": values.priceRange[0],
            "filter[maxPrice]": values.priceRange[1],
            "filter[category]": values.selectedCategory,
            "filter[inStock]": values.inStock,
            sortBy: values.sortBy,
            page: values.page,
            limit: values.limit,
        };
        setQuery(queryObject);
        refetch()
    }

    useEffect(() => {
        if (productData?.data) {
            const {minPrice, maxPrice} = getMinMaxPrice(productData.data);
            formRef.current?.setValue("priceRange", [minPrice, maxPrice])
        }
    }, [productData]);


    // useEffect(() => {
    //     console.log(debounce)
    //     if (debounce.trim() !== "") {
    //         setQuery((prev) => ({
    //             ...prev,
    //             search: debounce,
    //         }));
    //         refetch();
    //     }
    // }, [ debounce]);
    return (
        <div className="container mx-auto py-4  min-h-screen px-16">
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
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full md:w-auto"
                            >
                                <FilterIcon className="mr-2 h-4 w-4"/>
                                Filters
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="p-4 space-y-4">
                                {/*Show in stock products only*/}
                                <GenericForm.Checkbox<TFilter>
                                    name="inStock"
                                    label="In Stock"
                                />

                                {/* Price Range Slider */}
                                <GenericForm.SliderField<TFilter>
                                    name="priceRange"
                                    min={getMinMaxPrice(productData?.data || []).minPrice}
                                    max={getMinMaxPrice(productData?.data || []).maxPrice}
                                    step={1}
                                    label="Price Range"
                                />


                                {/* Category Selector */}
                                <GenericForm.Select<TFilter>
                                    name="selectedCategory"
                                    label="Category"
                                    placeholder="Select a category"
                                    options={categoryOptions}
                                />
                                {/* Sort By Selector */}
                                <GenericForm.Select<TFilter>
                                    name="sortBy"
                                    label="Sort By"
                                    placeholder="Sort by"
                                    options={sortByOptions}
                                />
                                <Button type="button" className={"w-full"}
                                        onClick={() => formRef.current?.form?.handleSubmit(onSubmit)()}>
                                    Apply Filters
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="relative">
                    <AnimatePresence>
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: 20}}
                            transition={{duration: 0.3}}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {productData?.data?.map((product: TProduct) => (
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