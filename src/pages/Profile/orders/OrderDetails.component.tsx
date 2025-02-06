import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import {TOrderGetApiResponse} from "@/types/order.types.ts";
import { Badge } from "@/components/ui/badge.tsx";
import moment from "moment/moment";

interface OrderDetailsProps {
    order: TOrderGetApiResponse;
    isOpen: boolean;
    onClose: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, isOpen, onClose }) => {

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Order Details - {order.orderId}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p><strong>Status:</strong> <Badge variant={order.status === "Cancelled" ? "destructive" : "default"}>{order.status}</Badge></p>
                            <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                        </div>
                        <div>
                            <p><strong>Created At:</strong>  {moment(order?.createdAt).format('MMMM Do YYYY')}</p>
                            <p><strong>Updated At:</strong> {moment(order.updatedAt).format('MMMM Do YYYY')}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Products</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead>Brand</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Subtotal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {order.products.map((product) => (
                                    <TableRow key={product.productId._id}>
                                        <TableCell>{product.productId.name}</TableCell>
                                        <TableCell>{product.productId.brand}</TableCell>
                                        <TableCell>{product.productId.category}</TableCell>
                                        <TableCell>${product.productId.price.toFixed(2)}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>${(product.productId.price * product.quantity).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>${order.totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>${order.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default OrderDetails;
