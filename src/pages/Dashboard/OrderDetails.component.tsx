import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import Table from "@/components/features/Table.tsx";
import {useGetSingleOrderQuery} from "@/redux/features/order/order.api.ts";
import {TProduct} from "@/pages/Products";
import {Dispatch, SetStateAction} from "react";

interface OrderDetailsDialogProps {
    viewDetails: string | boolean
    setViewDetailsClose:Dispatch<SetStateAction<string | boolean>>
}

export function OrderDetailsDialog({viewDetails, setViewDetailsClose}: OrderDetailsDialogProps) {
    const {data: order, isFetching} = useGetSingleOrderQuery(viewDetails as string,{skip: !viewDetails,})
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
            render: (quantity: number, item: TProduct) => {
                console.log(quantity, item)
                return <></>
            }
        }
    ];
    console.log(order)
    return (
        <Dialog open={Boolean(viewDetails)} onOpenChange={setViewDetailsClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Order Details</DialogTitle>
                    <DialogDescription>Order ID: {order?.orderId}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <h3 className="font-semibold">Customer Information</h3>
                        <p>Name: {order?.customerName}</p>
                        <p>Email: {order?.user.email}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Order Information</h3>
                        <p>Date: {order?.updatedAt}</p>
                        <p>Status: {order?.status}</p>
                        <p>Total: ${order?.totalPrice.toFixed(2)}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Order Items</h3>
                        <Table<TProduct>
                            data={order?.data?.products || []}
                            columns={columns}
                            isLoading={isFetching }
                            emptyMessage="No Orders found"
                            allowPagination={false}
                            allowSearch={false}
                            allowSorting={false}
                            height={"400px"}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

