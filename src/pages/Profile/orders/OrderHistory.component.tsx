import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import { TOrder, TOrderGetApiResponse } from '@/types/order.types.ts';
import {Badge} from "@/components/ui/badge.tsx";
import ConfirmationModal from "@/components/features/ConfirmationModal.tsx";
import {Button} from "@/components/ui/button.tsx";
import {handleToastPromise} from "@/utils/handleToastPromise.ts";
import toast from "react-hot-toast";
import {useCancelOrderMutation, useGetMyOrderQuery, useOrderPayNowMutation} from "@/redux/features/order/order.api.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import OrderDetails from "@/pages/Profile/orders/OrderDetails.component.tsx";
import {useState} from "react";
import CheckoutDialog from "@/pages/Checkout/CheckoutDialog.tsx";

const OrderHistoryComponent = () => {
    const [cancelOrder, {isLoading: isCancelLoading}] = useCancelOrderMutation(undefined)
    const {data} = useGetMyOrderQuery(undefined)
    const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null)
    const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
    const [payNow] = useOrderPayNowMutation(undefined)
    const [orderData, setOrderData] = useState<{
        clientSecret: string,
        order: {
            id: string,
            orderId: string
        }
    } | null>(null)
    const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
    const handleCancelOrder = async (orderId: string) => {
        await handleToastPromise(
            async () => {
                await cancelOrder(orderId).unwrap();
            },
            {
                loading: "Cancelling Order...",
                success: "Successfully Cancelled the Order!",
                error: (err: { data: { message: string } }) =>
                    err?.data?.message || "An error occurred during update. Please try again later.",
            },
            "cancel-order"
        );
    }

    const orderStatus = ["All", "Pending", "Paid", "Processing", "Shipped", "Delivered", "Refunded"]

    const handlePayNow = async (_id: string, orderId: string) => {
        const {data} = await payNow(_id).unwrap();
        if (!data?.clientSecret) return toast.error("An error occurred during placing the order. Please try again later.");
        setOrderData({
            ...data,
            order: {
                id: _id,
                orderId
            }
        })
        setIsPaymentDialogOpen(true)
    }

    return (
        <>
            <Card className="overflow-x-auto">
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View and manage your recent orders</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs orientation={"vertical"} defaultValue={orderStatus[0] as string}>
                        <div className={"w-full relative py-2"}>
                            <ScrollArea>
                                <TabsList className="w-full">
                                    {orderStatus.map((status) => (
                                        <TabsTrigger
                                            key={status}
                                            value={status}
                                            className="rounded-sm px-4 py-1.5 w-full text-sm font-medium"
                                        >
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                <ScrollBar orientation="horizontal"/>
                            </ScrollArea>
                        </div>
                        <ScrollArea className="h-[400px] mt-4 rounded-md border">
                            {orderStatus.map((tab) => (
                                <TabsContent key={tab} value={tab} className="p-4 ">
                                    <div className="space-y-4">
                                        {data
                                            ?.filter((order: TOrderGetApiResponse) => tab === orderStatus[0] || order.status === tab)
                                            .map((order: TOrderGetApiResponse) => (
                                                <div
                                                    key={order._id}
                                                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
                                                >
                                                    <div onClick={() => {
                                                        setSelectedOrder(order)
                                                        setIsOrderDetailsOpen(true)
                                                    }}>
                                                        <p className="font-medium">Order #{order.orderId}</p>
                                                        <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                                                        <p className="text-sm font-medium">${order.totalPrice.toFixed(2)}</p>
                                                    </div>
                                                    <div className="text-right flex flex-col items-end gap-2">
                                                        <div>
                                                            <Badge
                                                                variant={
                                                                    order.status === "Delivered"
                                                                        ? "default"
                                                                        : order.status === "Shipped" || order.status === "Paid"
                                                                            ? "secondary"
                                                                            : order.status === "Processing"
                                                                                ? "outline"
                                                                                : "destructive"
                                                                }
                                                                className={""}
                                                            >
                                                                {order.status}
                                                            </Badge>
                                                        </div>
                                                        {order.status === "Pending" && (
                                                            <div className=" flex items-center gap-x-2">
                                                                <div>
                                                                    <ConfirmationModal
                                                                        handleConfirm={() => handleCancelOrder(order._id)}
                                                                        itemName={order.orderId}
                                                                        type={"cancel"}
                                                                        variant={"outline"}
                                                                        loading={isCancelLoading}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Button
                                                                        variant="default"
                                                                        size="sm"
                                                                        type="button"
                                                                        onClick={async (e) => {
                                                                            e.stopPropagation()
                                                                            await handlePayNow(order._id, order.orderId)
                                                                        }}
                                                                    >
                                                                        Pay Now
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </TabsContent>
                            ))}
                            <ScrollBar orientation="horizontal"/>
                        </ScrollArea>
                    </Tabs>
                </CardContent>
            </Card>
            {selectedOrder && (
                <OrderDetails order={selectedOrder} isOpen={isOrderDetailsOpen}
                              onClose={() => setIsOrderDetailsOpen(false)}/>
            )}
            <CheckoutDialog isOpen={isPaymentDialogOpen} setIsOpen={setIsPaymentDialogOpen}
                            orderData={orderData}/>
        </>

    );
};
OrderHistoryComponent.displayName = `OrderHistoryComponent`
export default OrderHistoryComponent;