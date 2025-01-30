import {useState, useEffect} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Layout} from "@/components/layout/DashboardLayout"
import {useGetProductsQuery} from "@/redux/features/products/products.api"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import ProductManagement from "@/pages/Dashboard/ProductManagement.component.tsx";
import Table from "@/components/features/Table.tsx";
import {TProduct} from "@/pages/Products";
import {limitPerPage} from "@/constants/global.ts";


export default function ProductsPage() {
    const [editingProduct, setEditingProduct] = useState<boolean | string>(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [sortBy, setSortBy] = useState("-createdAt")
    const [query, setQuery] = useState<Record<string, unknown>>({
        page: currentPage,
        limit: limit,
        sortBy: sortBy,
        search: searchTerm,
    })

    const {data: productData, isFetching} = useGetProductsQuery(query)

    useEffect(() => {
        setQuery({
            page: currentPage,
            limit: limit,
            sortBy: sortBy,
            search: searchTerm,
        })
    }, [currentPage, limit, sortBy, searchTerm])

    const handleDeleteProduct = (productId: string) => {
        // Implement delete product logic
        console.log(productId)
    }

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortBy(`-${column}`)
        } else {
            setSortBy(column)
        }
    }

    const columns = [
        {label: "Name", key: "name", sortable: true},
        {label: "Brand", key: "brand"},
        {label: "Category", key: "category"},
        {
            label: "Price",
            key: "price",
            sortable: true,
            render: (value: number) => `$${value.toFixed(2)}`
        },
        {
            label: "Quantity",
            key: "quantity",
            render: (quantity: number, item: TProduct) => (
                <Badge variant={item.inStock ? "secondary" : "destructive"}>{quantity}</Badge>
            )
        }
    ];

    return (
        <Layout>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Product Management</CardTitle>
                    {isDialogOpen && <ProductManagement
                        isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}
                        editingProduct={editingProduct} setEditingProduct={setEditingProduct}
                    />}
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <Input
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                        <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select limit"/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    limitPerPage.map((item, key) => (
                                        <SelectItem key={key} value={item.toString()}>{item} per page</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <ScrollArea className="h-[500px]">
                        <Table<TProduct>
                            data={productData?.data || []}
                            columns={columns}
                            isLoading={isFetching}
                            sortBy={sortBy}
                            onSort={handleSort}
                            actions={(item) => (
                                <div className="flex gap-2">
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => {
                                            setEditingProduct(item._id)
                                            setIsDialogOpen(true)
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button variant="destructive" size="sm"
                                            onClick={() => handleDeleteProduct(item._id)}>
                                        Delete
                                    </Button>
                                </div>
                            )}
                            emptyMessage="No products found"
                        />

                        <ScrollBar orientation="horizontal"/>
                        <ScrollBar orientation="vertical"/>
                    </ScrollArea>
                    <div className="flex justify-between items-center mt-4">
                        <div>
                            Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, productData?.meta?.total || 0)} of{" "}
                            {productData?.meta?.total || 0} entries
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}>
                                Previous
                            </Button>
                            <Button
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                disabled={currentPage * limit >= (productData?.meta?.total || 0)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Layout>
    )
}

