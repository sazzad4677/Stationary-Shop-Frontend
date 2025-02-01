import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Layout} from "@/components/layout/DashboardLayout"
import {useDeleteProductMutation, useGetProductsQuery} from "@/redux/features/products/products.api"
import ProductManagement from "@/pages/Dashboard/ProductManagement.component.tsx";
import Table from "@/components/features/Table.tsx";
import {TProduct} from "@/pages/Products";
import {DownloadCloudIcon, Edit, Trash2} from "lucide-react";
import exportToExcel from "@/utils/exportToExcel.ts";
import {
    AlertDialog, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {AlertDialogAction} from "@radix-ui/react-alert-dialog";
import {handleToastPromise} from "@/utils/handleToastPromise.ts";


export default function ProductsPage() {
    const [editingProduct, setEditingProduct] = useState<boolean | string>(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [query, setQuery] = useState<Record<string, unknown>>({
        page: 1,
        limit: 10,
        sortBy: "-createdAt",
        search: "",
    })

    const {data: productData, isFetching} = useGetProductsQuery(query)
    const [deleteProduct] = useDeleteProductMutation(undefined)

    const handleDeleteProduct = async (productId: string) => {
        await handleToastPromise(
            async () => {
                await deleteProduct(productId).unwrap();
            },
            {
                loading: "Loading...",
                success: "Successfully Deleted",
                error: (err: { data: { message: string } }) =>
                    err?.data?.message || "An error occurred during delete product. Please try again later.",
            },
            "delete-product"
        );
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
    const handleExport = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const exportData: Partial<TProduct>[] = productData?.data?.map(({
                                                                            _id,
                                                                            createdAt,
                                                                            updatedAt,
                                                                            __v,
                                                                            ...rest
                                                                        }: TProduct) => rest) || [];
        exportToExcel<Partial<TProduct>>(exportData, 'Products');
    };
    return (
        <Layout>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>
                        <div className={"flex items-center justify-between gap-2"}>
                            <Button onClick={handleExport} variant="default" size="sm"
                                    className="flex items-center gap-1"><DownloadCloudIcon/>Export</Button>
                        </div>
                    </CardTitle>
                    {<ProductManagement
                        isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}
                        editingProduct={editingProduct} setEditingProduct={setEditingProduct}
                    />}
                </CardHeader>
                <CardContent>
                    <Table<TProduct>
                        data={productData?.data || []}
                        columns={columns}
                        allowPagination
                        allowSearch
                        allowSorting
                        isLoading={isFetching}
                        totalEntries={productData?.meta?.total}
                        onQueryChange={setQuery}
                        actions={(item) => (
                            <div className="flex gap-2">
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => {
                                        setEditingProduct(item._id);
                                        setIsDialogOpen(true);
                                    }}
                                >
                                    <Edit/> Edit
                                </Button>
                                <DeleteConfirmationModal handleConfirm={() => handleDeleteProduct(item._id)}
                                                         itemName={item.name}/>
                            </div>
                        )}
                        emptyMessage="No products found"
                    />
                </CardContent>
            </Card>
        </Layout>
    )
}

const DeleteConfirmationModal = ({handleConfirm, itemName}: { handleConfirm: () => void; itemName: string }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4"/>
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete {itemName} from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild={true}>
                        <Button variant="default" size="sm">
                            Cancel
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild={true} onClick={handleConfirm}>
                        <Button variant="destructive" size="sm">
                            <Trash2 className="mr-2 h-4 w-4"/>
                            Delete
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}