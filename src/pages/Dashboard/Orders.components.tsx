import {useState} from "react"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Layout} from "@/components/layout/DashboardLayout"
import Table from "@/components/features/Table"
import {useGetOrdersQuery, useUpdateOrderMutation} from "@/redux/features/order/order.api"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {TOrder} from "@/types/order.types"
import {handleToastPromise} from "@/utils/handleToastPromise"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {MoreHorizontal, FileText, Printer, DownloadCloudIcon} from 'lucide-react'
import {Badge} from "@/components/ui/badge"
import {OrderDetailsDialog} from "@/pages/Dashboard/OrderDetails.component.tsx";

export default function OrdersPage() {
    const [viewProduct, setViewProduct] = useState<boolean | string>(false)
    const [query, setQuery] = useState<Record<string, unknown>>({
        page: 1,
        limit: 10,
        sortBy: "-createdAt",
        search: "",
        dateRange: null,
    })

    const {data: orderData, isFetching} = useGetOrdersQuery(query)
    const [updateStatus, {isLoading}] = useUpdateOrderMutation(undefined)

    const statusColors: Record<string, string> = {
        Pending: "bg-yellow-500 text-white",
        Paid: "bg-emerald-600 text-white",
        Processing: "bg-blue-500 text-white",
        Shipped: "bg-purple-500 text-white",
        Delivered: "bg-green-700 text-white",
        Refunded: "bg-red-500 text-white",
    };

    const columns = [
        {label: "Order ID", key: "orderId", sortable: true},
        {label: "User", key: "userId.name"},
        {
            label: "Total Price",
            key: "totalPrice",
            sortable: true,
            render: (value: number) => `$${value.toFixed(2)}`
        },
        {
            label: "Status",
            key: "status",
            render: (status: string, value: TOrder) => {
                return (
                    <Select value={status} onValueChange={async (status) => {
                        await handleUpdateStatus(value._id, status)
                    }}>
                        <SelectTrigger className={`w-[130px] ${statusColors[status]}`}>
                            <SelectValue placeholder="Update Status"/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                ["Pending", "Paid", "Processing", "Shipped", "Delivered", "Refunded"].map(status => (
                                    <SelectItem key={status} disabled={(status === value.status) || (status === "Paid")}
                                                value={status}>{status}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                );
            },
        },
        {
            label: "Date",
            key: "createdAt",
            sortable: true,
            render: (value: string) => new Date(value).toLocaleDateString()
        },
    ];

    const handleUpdateStatus = async (orderId: string, status: string) => {
        await handleToastPromise(
            async () => {
                await updateStatus({id: orderId, status}).unwrap();
            },
            {
                loading: "Updating order status...",
                success: "Successfully updated status",
                error: (err: { data: { message: string } }) =>
                    err?.data?.message || "An error occurred during update.",
            },
            "update-status"
        );
    }


    const handleExport = () => {

    }

    return (
        <Layout>
            <Card>
                <CardHeader >
                    <div className="flex items-center justify-between space-x-2">
                        <div>
                            <Button onClick={handleExport}>
                                <DownloadCloudIcon className="mr-2 h-4 w-4"/>
                                Export
                            </Button>
                        </div>
                        <div className="flex space-x-2">
                            {Object.entries(statusColors).map(([status, color]) => (
                                <Badge key={status} variant="outline" className={color}>
                                    {status}
                                </Badge>
                            ))}
                        </div>
                    </div>
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
                                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.orderId)}>
                                        <FileText className="mr-2 h-4 w-4"/>
                                        Copy order ID
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem onClick={() => setViewProduct(item._id)}>
                                        <FileText className="mr-2 h-4 w-4"/>
                                        View Order Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => console.log("Print order", item.orderId)}>
                                        <Printer className="mr-2 h-4 w-4"/>
                                        Print Order
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
