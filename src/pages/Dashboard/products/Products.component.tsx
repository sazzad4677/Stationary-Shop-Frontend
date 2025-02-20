/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useState } from 'react';
import {Button} from "@/components/ui/button.tsx"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx"
import {Badge} from "@/components/ui/badge.tsx"
import {Layout} from "@/components/layout/DashboardLayout.tsx"
import {useDeleteProductMutation, useGetProductsQuery} from "@/redux/features/products/products.api.ts"
import ProductManagement from "@/pages/Dashboard/products/ProductManagement.component.tsx";
import Table from '@/components/features/Table.tsx';
import {DownloadCloudIcon, Edit, Plus} from "lucide-react";
import exportToExcel from "@/utils/exportToExcel.ts";
import {handleToastPromise} from "@/utils/handleToastPromise.ts";
import ConfirmationModal from "@/components/features/ConfirmationModal.tsx";
import { TProductGetApiResponse } from '@/types';


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
            render: (value: number) => `$${value}`
        },
        {
            label: "Quantity",
            key: "quantity",
            render: (quantity: number, item: TProductGetApiResponse) => (
                <Badge variant={item.inStock ? "secondary" : "destructive"}>{quantity as ReactNode}</Badge>
            )
        }
    ];
    const handleExport = () => {
        const exportData = productData?.data?.map(({
                                                                            _id,
                                                                            createdAt,
                                                                            updatedAt,
                                                                            __v,
                                                                            ...rest
                                                                        }: TProductGetApiResponse) => rest) || [];
        exportToExcel<Partial<TProductGetApiResponse>>(exportData, 'Products');
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
                    <Button onClick={() => {
                        setEditingProduct(false)
                        setIsDialogOpen(true)
                    }}>
                        <Plus className="mr-2 h-4 w-4"/> Add Product
                    </Button>
                    {isDialogOpen && <ProductManagement
                        isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}
                        editingProduct={editingProduct} setEditingProduct={setEditingProduct}
                    />}
                </CardHeader>
                <CardContent>
                    <Table<TProductGetApiResponse>
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
                                <ConfirmationModal handleConfirm={() => handleDeleteProduct(item._id)}
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