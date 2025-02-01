import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Table from "@/components/features/Table.tsx";
import {useGetSingleOrderQuery} from "@/redux/features/order/order.api.ts";
import {TProduct} from "@/pages/Products";
import {Dispatch, SetStateAction} from "react";
import moment from "moment"

interface OrderDetailsDialogProps {
    viewDetails: string | boolean
    setViewDetailsClose: Dispatch<SetStateAction<string | boolean>>
}

export function OrderDetailsDialog({viewDetails, setViewDetailsClose}: OrderDetailsDialogProps) {
    const {data: order, isFetching} = useGetSingleOrderQuery(viewDetails as string, {skip: !viewDetails,})
    const columns = [
        {label: "Name", key: "productId.name", sortable: true,},
        {label: "Brand", key: "productId.brand"},
        {label: "Category", key: "productId.category"},
        {
            label: "Price",
            key: "productId.price",
            sortable: true,
        },
        {
            label: "Quantity",
            key: "quantity",
        }
    ];
    return (
        <Dialog open={Boolean(viewDetails)} onOpenChange={setViewDetailsClose}>
            <DialogContent className="w-[80vw] flex flex-col gap-4 max-w-none max-h-none overflow-y-auto ">
                <DialogHeader>
                    <DialogTitle>Order Details</DialogTitle>
                    <DialogDescription>Order ID: {order?.orderId}</DialogDescription>
                </DialogHeader>
                <div className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start justify-center md:justify-normal">
                        <div>
                            <h3 className="font-semibold">Customer Information</h3>
                            <p>
                                <span className="font-medium">Name:</span> {order?.userId.name}
                            </p>
                            <p>
                                <span className="font-medium">Email:</span> {order?.userId?.email}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">Order Information</h3>
                            <p>
                                <span className="font-medium">Date:</span>{' '}
                                {order?.updatedAt
                                    ? moment(order?.updatedAt).date(2).year(2024).format('MMMM D, YYYY')
                                    : 'N/A'}
                            </p>
                            <p>
                                <span className="font-medium">Status:</span> {order?.status}
                            </p>
                            <p>
                                <span className="font-medium">Total:</span> ${order?.totalPrice?.toFixed(2) || '0.00'}
                            </p>
                        </div>
                    </div>
                    <h3 className="font-semibold">Order Items</h3>
                    <div className={"overflow-hidden"}>
                        <Table<TProduct>
                            data={order?.products || []}
                            columns={columns}
                            isLoading={isFetching}
                            emptyMessage="No Orders found"
                            allowPagination={false}
                            allowSearch={false}
                            allowSorting={false}
                            height={"auto"}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

