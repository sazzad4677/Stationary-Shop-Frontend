import {useState, useRef, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {FilterIcon} from "lucide-react";
import {ProductCard} from "@/components/features/ProductCard";
import {motion, AnimatePresence} from "framer-motion";
import {filterSchema, TFilter} from "@/pages/Products/products.schema.ts";
import {GenericForm, TGenericFormRef} from "@/components/form/GenericForm.tsx";
import {useGetProductsQuery} from "@/redux/features/products/products.api.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {useDebounce} from "@/hooks/useDebounce.tsx";
import {DynamicPagination} from "@/components/features/DynamicPagination.tsx";
import {productCategories} from "@/constants/global.ts";
import {useSearchParams} from "react-router";

export interface TProduct {
    _id: string
    name: string
    brand: string
    price: number
    category: string
    description: string
    quantity: number
    inStock: boolean
    updatedAt: string
    createdAt: string,
    images: [
        file: File,
        preview: string,
    ]
    __v: number
}

const initialValues: TFilter = {
    searchTerm: "",
    priceRange: [0, 0],
    selectedCategory: "all",
    inStock: false,
    sortBy: "createdAt",
};

export default function AllProductsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(20)
    const formRef = useRef<TGenericFormRef<TFilter>>(null);
    const debounce = useDebounce(searchTerm, 500);
    const [searchParams] = useSearchParams();
    const queryValue = searchParams.get('category');
    const [query, setQuery] = useState<Record<string, unknown>>({
        page: currentPage,
        limit: limit,
        sortBy: initialValues.sortBy,
    });
    const {data: productData} = useGetProductsQuery(query)
    const categoryOptions = productCategories.map((category) => ({
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
        };
        setQuery(queryObject);
    }

    useEffect(() => {
        if (productData?.data && formRef.current?.getValues().priceRange[0] === 0 && formRef.current?.getValues().priceRange[1] === 0) {
            formRef.current?.setValue("priceRange", [productData?.meta.minPrice, productData?.meta.maxPrice])
        }
    }, [productData]);

    useEffect(() => {
        if (formRef.current) {
            const subscription = formRef.current.form.watch((value) => {
                setSearchTerm(value.searchTerm || "");
            });
            return () => subscription.unsubscribe();
        }
    }, [formRef]);


    useEffect(() => {
        setQuery((prev) => ({
            ...prev,
            search: debounce ,
            "filter[category]": queryValue ?? "all",
        }));
    }, [debounce, queryValue]);
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
                                    min={productData?.meta.minPrice}
                                    max={productData?.meta.maxPrice}
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
                                <div className={"flex justify-between"}>
                                    <Button type="button"
                                            onClick={() => formRef.current?.form?.handleSubmit(onSubmit)()}>
                                        Apply Filters
                                    </Button>
                                    <Button type="button" variant={"destructive"}
                                            onClick={() => {
                                                formRef.current?.form?.reset();
                                                setQuery({
                                                    page: 1,
                                                    limit: 20,
                                                    sortBy: initialValues.sortBy,
                                                });
                                                setCurrentPage(1);
                                                setLimit(20);
                                                setSearchTerm("");
                                            }}>
                                        Reset
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="relative w-full h-full">
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
            <div className={"mt-8"}>
                <DynamicPagination currentPage={currentPage} totalItems={productData?.meta?.total || 0}
                                   itemsPerPage={limit} onItemsPerPageChange={(v) => {
                    setLimit(v)
                    setQuery((prev) => ({
                        ...prev,
                        limit: v,
                    }))
                }} onPageChange={(v) => {
                    setCurrentPage(v)
                    setQuery((prev) => ({
                        ...prev,
                        page: v,
                    }))
                }}/>
            </div>
        </div>
    );
}