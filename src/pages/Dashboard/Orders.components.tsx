import {useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Layout} from "@/components/layout/DashboardLayout"
import Table from "@/components/features/Table.tsx";
import {useGetOrdersQuery, useUpdateOrderMutation} from "@/redux/features/order/order.api.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {TOrder} from "@/types/order.types.ts";
import {handleToastPromise} from "@/utils/handleToastPromise.ts";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {OrderDetailsDialog} from "@/pages/Dashboard/OrderDetails.component.tsx";


export default function OrdersPage() {
    const [viewProduct, setViewProduct] = useState<boolean | string>(false)
    const [query, setQuery] = useState<Record<string, unknown>>({
        page: 1,
        limit: 10,
        sortBy: "-createdAt",
        search: "",
    })

    const {data: orderData, isFetching} = useGetOrdersQuery(query)
    const [updateStatus, {isLoading}] = useUpdateOrderMutation(undefined)

    const columns = [
        {label: "Order ID", key: "orderId", sortable: true},
        {label: "User", key: "userId.name"},
        {
            label: "Total Price",
            key: "totalPrice",
            sortable: true,
        },
        {
            label: "Status",
            key: "status",
            render: (status: string, value:TOrder) => {
                const statusColors: Record<string, string> = {
                    Pending: "bg-yellow-500 text-white",
                    Processing: "bg-blue-500 text-white",
                    Shipped: "bg-purple-500 text-white",
                    Delivered: "bg-green-500 text-white",
                    Refunded: "bg-red-500 text-white",
                };
                return (
                    <Select value={status} onValueChange={async (status) => {
                        await handleUpdateStatus(value._id, status)
                    }}>
                        <SelectTrigger className={statusColors[status]} value={status}>
                            <SelectValue placeholder="Update Status"/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                ["Pending", "Processing", "Shipped", "Delivered", "Refunded"].map(status => (
                                    <SelectItem key={status} disabled={status === value.status}
                                                value={status}>{status}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                );
            },
        },
    ];
    const handleUpdateStatus = async (orderId: string, status: string) => {
        await handleToastPromise(
            async () => {
                await updateStatus({id: orderId, status}).unwrap();
            },
            {
                loading: "Loading...",
                success: "Successfully updated status ",
                error: (err: { data: { message: string } }) =>
                    err?.data?.message || "An error occurred during update.",
            },
            "update-status"
        );
    }
    return (
        <Layout>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table<TOrder>
                        data={orderData?.data || []}
                        columns={columns}
                        allowPagination
                        allowSearch
                        allowSorting
                        isLoading={isFetching || isLoading}
                        totalEntries={orderData?.meta?.total}
                        onQueryChange={setQuery}
                        actions={(item) => (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.orderId)}>Copy
                                        order
                                        ID</DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem onClick={() => setViewProduct(item._id)}>
                                        View Order Details
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                        emptyMessage="No Orders found"
                    />
                </CardContent>
            </Card>
            <OrderDetailsDialog viewDetails={viewProduct} setViewDetailsClose={setViewProduct}/>
        </Layout>
    )
}

