import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Table from "@/components/features/Table"
import { useGetSingleOrderQuery } from "@/redux/features/order/order.api"
import type { Dispatch, SetStateAction } from "react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, Package, CreditCard } from "lucide-react"
import {TProduct} from "@/pages/Products";

interface OrderDetailsDialogProps {
    viewDetails: string | boolean
    setViewDetailsClose: Dispatch<SetStateAction<string | boolean>>
}

export function OrderDetailsDialog({ viewDetails, setViewDetailsClose }: OrderDetailsDialogProps) {
    const { data: order, isFetching } = useGetSingleOrderQuery(viewDetails as string, { skip: !viewDetails })

    const columns = [
        { label: "Name", key: "productId.name", sortable: true },
        { label: "Brand", key: "productId.brand" },
        { label: "Category", key: "productId.category" },
        {
            label: "Price",
            key: "productId.price",
            sortable: true,
            render: (value: number) => `$${value.toFixed(2)}`,
        },
        { label: "Quantity", key: "quantity" },
        {
            label: "Subtotal",
            key: "subtotal",
            render: (_: null, item: { productId: { price: number }; quantity: number }) => `$${(item.productId.price * item.quantity).toFixed(2)}`,
        },
    ]

    const statusColors: Record<string, string> = {
        Pending: "bg-yellow-500 text-white",
        Paid: "bg-emerald-600 text-white",
        Processing: "bg-blue-500 text-white",
        Shipped: "bg-purple-500 text-white",
        Delivered: "bg-green-700 text-white",
        Refunded: "bg-red-500 text-white",
    }

    return (
        <Dialog open={Boolean(viewDetails)} onOpenChange={setViewDetailsClose}>
            <DialogContent className="w-[95vw] max-w-5xl max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Order Details</DialogTitle>
                </DialogHeader>
                {order && (
                    <div className="mt-4 space-y-6 overflow-x-auto">
                        <div className="flex flex-col md:flex-row justify-between md:items-center items-start gap-y-2 md:gap-y-0">
                            <h2 className="text-xl font-semibold">Order #{order?.orderId}</h2>
                            <Badge variant={"outline"} className={statusColors[order?.status]}>{order?.status}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        Shipping Address
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-medium">{order.userId.name}</p>
                                    <p>{order.userId.shippingAddress.address1}</p>
                                    <p>{order.userId.shippingAddress.address2}</p>
                                    <p>
                                        {order.userId.shippingAddress.city}, {order.userId.shippingAddress.state}{" "}
                                        {order.userId.shippingAddress.zipCode}
                                    </p>
                                    <p>{order.userId.shippingAddress.country}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Package className="mr-2 h-4 w-4" />
                                        Order Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between">
                                        <span>Order Date:</span>
                                        <span>{format(new Date(order.createdAt), "MMM d, yyyy")}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Total Items:</span>
                                        <span>{order.products.reduce((sum: number, item: TProduct) => sum + item.quantity, 0)}</span>
                                    </div>
                                    <Separator className="my-2" />
                                    <div className="flex justify-between font-semibold">
                                        <span>Total:</span>
                                        <span>${order.totalPrice.toFixed(2)}</span>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Payment Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        <span className="font-medium">Payment ID:</span> {order.paymentData.paymentIntentId}
                                    </p>
                                    <p>
                                        <span className="font-medium">Status:</span> {order.status === "Paid" ? "Completed" : "Pending"}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Items</CardTitle>
                            </CardHeader>
                            <CardContent className={"overflow-x-auto"}>
                                <Table<TProduct>
                                    data={order.products || []}
                                    columns={columns}
                                    isLoading={isFetching}
                                    emptyMessage="No items found"
                                    allowPagination={false}
                                    allowSearch={false}
                                    allowSorting={true}
                                    height="auto"
                                />
                            </CardContent>
                        </Card>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

