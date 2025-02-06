import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useLocation, useNavigate } from 'react-router';
import { useReactToPrint } from 'react-to-print';
import { useEffect, useRef, useState } from 'react';
import { useGetSingleOrderQuery } from '@/redux/features/order/order.api.ts';
import InvoicePDF from '@/pages/Invoice/InvoicePDF.component.tsx';
import LoadingSpinner from '@/components/ui/loadingSpinner.tsx';

export default function OrderPlaced() {
    const navigate = useNavigate();
    const locationState = useLocation().state;
    const invoiceRef = useRef(null)
    const [isPrinting, setIsPrinting] = useState<boolean>(false);
    const { data: order, isFetching } = useGetSingleOrderQuery(locationState?.id);
    const [singleOrderData, setSingleOrderData] = useState(order);
    const [loading, setLoading] = useState<boolean>(false);
    const handlePrint = useReactToPrint({
        contentRef: invoiceRef,
        onBeforePrint: async() => {
            setLoading(true)
        },
        onAfterPrint: () => {
            setSingleOrderData(null)
            setLoading(false)
        }
    })
    useEffect(() => {
        if (singleOrderData && isPrinting) {
            handlePrint();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [singleOrderData, isPrinting]);
    return (
      (<div className="flex items-center justify-center min-h-screen p-4">
          {  (loading || isFetching) && <LoadingSpinner/>}
            <Card className="max-w-md w-full text-center p-6 shadow-lg">
                <CardHeader>
                    <div className="flex justify-center">
                        <CheckCircle className="text-green-500 w-16 h-16" />
                    </div>
                    <CardTitle className="text-xl font-semibold mt-4">
                        Order Placed Successfully!
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600">Thank you for your purchase. Your order {locationState?.orderId || ""} has been confirmed.</p>
                    <Button loading={isFetching} variant={"outline"} className="mt-4 w-full" onClick={async() => {
                        setSingleOrderData(order)
                        setIsPrinting(true)
                    }}>
                        Print Invoice
                    </Button>
                    <Button className="mt-4 w-full" onClick={() => navigate("/")}>
                        Continue Shopping
                    </Button>
                </CardContent>
            </Card>
            {<div className="hidden">{singleOrderData && <InvoicePDF order={singleOrderData} ref={invoiceRef}/>}</div>}
        </div>)
    );
}
