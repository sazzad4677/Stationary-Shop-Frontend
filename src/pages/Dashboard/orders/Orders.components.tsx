/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';
import { Layout } from '@/components/layout/DashboardLayout.tsx';
import Table from '@/components/features/Table.tsx';
import {
  useGetOrdersQuery,
  useInitiateRefundMutation,
  useUpdateOrderMutation
} from '@/redux/features/order/order.api.ts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { TOrderGetApiResponse } from '@/types/order.types.ts';
import { handleToastPromise } from '@/utils/handleToastPromise.ts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { MoreHorizontal, FileText, Printer, DownloadCloudIcon, X, TicketX } from 'lucide-react';
import { Badge } from '@/components/ui/badge.tsx';
import { OrderDetailsDialog } from '@/pages/Dashboard/orders/OrderDetails.component.tsx';
import { useReactToPrint } from 'react-to-print';
import InvoicePDF from '@/pages/Invoice/InvoicePDF.component.tsx';
import exportToExcel from '@/utils/exportToExcel.ts';
import ConfirmationModal from '@/components/features/ConfirmationModal.tsx';

export default function OrdersPage() {
  const [viewProduct, setViewProduct] = useState<boolean | string>(false);
  const invoiceRef = useRef(null);
  const [singleOrderData, setSingleOrderData] = useState<TOrderGetApiResponse | null>();
  const [isCanceling, setIsCanceling] = useState<boolean | string>(false);
  const [isRefunding, setIsRefunding] = useState<boolean | string>(false);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [query, setQuery] = useState<Record<string, unknown>>({
    page: 1,
    limit: 10,
    sortBy: '-createdAt',
    search: ''
  });
  const { data: orderData, isFetching } = useGetOrdersQuery(query);
  const [updateStatus, { isLoading }] = useUpdateOrderMutation(undefined);
  const [initiateRefund, { isLoading: isRefundLoading }] = useInitiateRefundMutation(undefined);
  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    onAfterPrint: () => {
      setSingleOrderData(null);
    }
  });

  const statusColors: Record<string, string> = {
    Pending: 'bg-yellow-500 text-white',
    Paid: 'bg-emerald-600 text-white',
    Processing: 'bg-blue-500 text-white',
    Shipped: 'bg-purple-500 text-white',
    Delivered: 'bg-green-700 text-white',
    Refunded: 'bg-red-500 text-white',
    Canceled: 'bg-destructive text-white'
  };

  const columns = [
    { label: 'Order ID', key: 'orderId', sortable: true },
    { label: 'User', key: 'userId.name' },
    {
      label: 'Total Price',
      key: 'totalPrice',
      sortable: true,
      render: (value: number) => `$${value.toFixed(2)}`
    },
    {
      label: 'Status',
      key: 'status',
      render: (status: string, value: TOrderGetApiResponse) => {
        return (
          ((status !== 'Refunded' && status !== 'Canceled')) ?
            <Select value={status} onValueChange={async (status) => {
              await handleUpdateStatus(value._id, status);
            }}>
              <SelectTrigger className={`w-[130px] ${statusColors[status]}`}>
                <SelectValue placeholder="Update Status" />
              </SelectTrigger>
              <SelectContent>
                {
                  ['Pending', 'Paid', 'Processing', 'Shipped', 'Delivered'].map(status => (
                    <SelectItem key={status}
                                disabled={!value.isPaid || status === "Pending" || status === "Paid"}
                                value={status}>{status}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select> : <Badge variant="destructive" className={statusColors[status]}>{status}</Badge>
        );
      }
    },
    {
      label: 'Date',
      key: 'createdAt',
      sortable: true,
      render: (value: Date) => new Date(value).toLocaleDateString()
    }
  ];

  const handleUpdateStatus = async (orderId: string, status: string) => {
    await handleToastPromise(
      async () => {
        await updateStatus({ id: orderId, status }).unwrap();
      },
      {
        loading: 'Updating order status...',
        success: 'Successfully updated status',
        error: (err: { data: { message: string } }) =>
          err?.data?.message || 'An error occurred during update.'
      },
      'update-status'
    );
  };

  const handleExport = () => {
    const exportData: Partial<TOrderGetApiResponse>[] = orderData?.map(({
                                                                          _id,
                                                                          createdAt,
                                                                          updatedAt,
                                                                          ...rest
                                                                        }: TOrderGetApiResponse) => rest) || [];
    exportToExcel<Partial<TOrderGetApiResponse>>(exportData, 'orders');
  };

  const handleCancelOrder = async () => {
    if (typeof isCanceling === 'string') {
      await handleToastPromise(
        async () => {
          await updateStatus({ id: isCanceling, status: 'Canceled' }).unwrap();
        },
        {
          loading: 'Cancelling order...',
          success: 'Successfully cancelled order',
          error: (err: { data: { message: string } }) =>
            err?.data?.message || 'An error occurred during cancel order.'
        }
      );
    }
  };

  const handleRefundOrder = async () => {
    if (typeof isRefunding === 'string') {
      await handleToastPromise(
        async () => {
          await initiateRefund(isRefunding).unwrap();
        },
        {
          loading: 'Refunding order...',
          success: 'Successfully refunded order',
          error: (err: { data: { message: string } }) =>
            err?.data?.message || 'An error occurred during cancel order.'
        }
      );
    }
  };

  useEffect(() => {
    if (singleOrderData && isPrinting) {
      handlePrint();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleOrderData, isPrinting]);


  return (
    <Layout>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between space-x-2">
            <div>
              <Button onClick={handleExport}>
                <DownloadCloudIcon className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
            <div className="flex space-x-2">
              {Object.entries(statusColors).map(([status, color]) => (
                <Badge key={status} variant="outline" className={color}
                  // onClick={() => {
                  //     setQuery((prev) => {
                  //         return {...prev, "filter[status]": status}
                  //     })
                  // }}
                >
                  {status}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table<TOrderGetApiResponse>
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
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.orderId)}>
                    <FileText className="mr-2 h-4 w-4" />
                    Copy order ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setViewProduct(item._id)}>
                    <FileText className="mr-2 h-4 w-4" />
                    View Order Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    setSingleOrderData(item);
                    setIsPrinting(true);
                  }}>
                    <Printer className="mr-2 h-4 w-4" />
                    Print Order
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {item.status === 'Canceled' && item.isPaid &&
                    <DropdownMenuItem onClick={() => setIsRefunding(item._id)} disabled={isRefundLoading}>
                      <TicketX className="mr-2 h-4 w-4" />
                      Refund Order
                    </DropdownMenuItem>}
                  {item.status !== 'Canceled' && item.status !== 'Refunded' &&
                    <DropdownMenuItem onClick={() => setIsCanceling(item._id)} disabled={isLoading}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel Order
                    </DropdownMenuItem>}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            emptyMessage="No Orders found"
          />
        </CardContent>
      </Card>
      <OrderDetailsDialog viewDetails={viewProduct} setViewDetailsClose={setViewProduct} />
      {<div className="hidden">{singleOrderData && <InvoicePDF order={singleOrderData} ref={invoiceRef} />}</div>}
      {/*  Order Cancel Confirmation  */}
      <ConfirmationModal
        handleConfirm={() => handleCancelOrder()}
        customType={{
          message: `Are you sure you want to cancel this order?`,
          actionLabel: 'Proceed',
          cancelLabel: 'Go Back'
        }}
        customTrigger={{
          open: Boolean(isCanceling),
          setOpen: (state: boolean) => setIsCanceling(state)
        }}
      />
      {/*  Refund Confirmation  */}
      <ConfirmationModal
        handleConfirm={() => handleRefundOrder()}
        customType={{
          message: `Are you sure you want to refund this order?`,
          actionLabel: 'Proceed',
          cancelLabel: 'Go Back'
        }}
        customTrigger={{
          open: Boolean(isRefunding),
          setOpen: (state: boolean) => setIsRefunding(state)
        }}
      />

    </Layout>
  );
}
