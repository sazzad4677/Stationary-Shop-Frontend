import {format} from "date-fns"

const InvoicePDF = ({order, ref}: { order: any; ref: React.Ref<HTMLDivElement> }) => {
    return (
        <div
            ref={ref}
            className="p-8 bg-gradient-to-br flex flex-col from-gray-50 to-white text-gray-800 rounded-lg max-w-4xl mx-auto min-h-[100vh]"
        >
            {/* Main Content */}
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 text-blue-600">INVOICE</h1>
                        <p className="text-sm">
                            Invoice #: <span className="font-semibold">{order?.orderId}</span>
                        </p>
                        <p className="text-sm">
                            Date:{" "}
                            <span className="font-semibold">
                                {order?.createdAt && format(new Date(order.createdAt), "MMMM d, yyyy")}
                            </span>
                        </p>
                    </div>
                    <div className="text-right">
                        <img src="/logo.png" alt="logo" className="h-20 mb-2"/>
                        <p className="text-sm">123 Company Street</p>
                        <p className="text-sm">City, State 12345</p>
                        <p className="text-sm">Phone: (123) 456-7890</p>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 my-6"></div>

                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-blue-600">Bill To:</h3>
                        <p className="font-medium">{order?.userId?.name}</p>
                        <p>{order?.userId?.shippingAddress?.address1}</p>
                        <p>{order?.userId?.shippingAddress?.address2}</p>
                        <p>
                            {order?.userId?.shippingAddress?.city}, {order?.userId?.shippingAddress?.state}{" "}
                            {order?.userId?.shippingAddress?.zipCode}
                        </p>
                        <p>{order?.userId?.shippingAddress?.country}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-blue-600">Payment Information:</h3>
                        <p>
                            Payment ID: <span className="font-medium">{order?.paymentData?.paymentIntentId}</span>
                        </p>
                        <p>
                            Status: <span className="font-medium">{order?.status}</span>
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <table className="w-full">
                        <thead>
                        <tr className="bg-blue-100 text-blue-600">
                            <th className="text-left py-2 px-4 rounded-tl-lg">Item</th>
                            <th className="text-right py-2 px-4">Quantity</th>
                            <th className="text-right py-2 px-4">Price</th>
                            <th className="text-right py-2 px-4 rounded-tr-lg">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {order?.products.map(
                            (product: {
                                productId: { name: string; price: number };
                                quantity: number
                            }, index: number) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                    <td className="py-2 px-4">{product?.productId?.name}</td>
                                    <td className="text-right py-2 px-4">{product?.quantity}</td>
                                    <td className="text-right py-2 px-4">${product?.productId?.price.toFixed(2)}</td>
                                    <td className="text-right py-2 px-4">
                                        ${(product?.quantity * product?.productId?.price).toFixed(2)}
                                    </td>
                                </tr>
                            ),
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 text-right">
                    <p className="text-xl font-semibold text-blue-600">
                        Total: <span className="text-gray-800">${order?.totalPrice?.toFixed(2)}</span>
                    </p>
                </div>

                <div className="h-px bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 my-6"></div>

                <div className="mt-8 text-sm text-center text-gray-600">
                    <p className="font-medium mb-2">Thank you for your business!</p>
                    <p>If you have any questions concerning this invoice, please contact our customer support.</p>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-xs text-center text-gray-500 mt-8">
                <p>&copy; {new Date().getFullYear()} Pappier. All rights reserved.</p>
                <p>This is a computer-generated document and no signature required.</p>
            </footer>
        </div>)
}


InvoicePDF.displayName = "InvoicePDF"

export default InvoicePDF
