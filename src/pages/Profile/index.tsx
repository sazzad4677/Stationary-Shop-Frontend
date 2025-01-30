"use client"

import {useEffect, useRef, useState} from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {useGetProfileQuery} from "@/redux/features/profile/profile.api.ts";
import {GenericForm} from "@/components/form/GenericForm.tsx";
import {z} from "zod";
import {ProfileSchema} from "@/pages/Profile/Profile.schema.ts";
import {useGetCountryQueryQuery} from "@/redux/api/countryInfo.api.ts";

const initialOrders = [
    { id: 1, status: "Delivered", date: "2023-05-15", total: "$120.00" },
    { id: 2, status: "Shipped", date: "2023-05-20", total: "$85.50" },
    { id: 3, status: "Processing", date: "2023-05-25", total: "$200.00" },
    { id: 4, status: "Pending", date: "2023-05-30", total: "$150.75" },
]

type TProfileSchema = z.infer<typeof ProfileSchema>

export default function ProfilePage() {
    const formRef = useRef<any>(null);
    const {data: userData} = useGetProfileQuery(undefined)
    const [orders, setOrders] = useState(initialOrders)
    const {data: countryData} = useGetCountryQueryQuery(undefined)
    const countryOptions = countryData?.map((item: {name: string}) => ({
        label: item.name,
        value: item.name,
    }))
    const initialValues: TProfileSchema = {
        name: userData?.name || "",
        email: userData?.email || "",
        shippingAddress: {
            addressLine1: userData?.shippingAddress?.address1 || "",
            addressLine2: userData?.shippingAddress?.address2 || "",
            city: userData?.shippingAddress?.city || "",
            state: userData?.shippingAddress?.state || "",
            zipCode: userData?.shippingAddress?.zipCode || "",
            country: userData?.shippingAddress?.country || "",
        },
    };
    const onSubmit = () => {
        // In a real app, you would send this data to your backend
        console.log("Saving user data:", userData)
    }

    const handleCancelOrder = (orderId: number) => {
        setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "Cancelled" } : order)))
    }

    useEffect(() => {
        if (userData && countryData && formRef.current) {
            formRef.current.reset(initialValues);
        }
    }, [userData, countryData]);

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">My Profile</h1>
            <GenericForm ref={formRef} schema={ProfileSchema} initialValues={initialValues} onSubmit={onSubmit}>
            <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                <Card className="md:row-span-2">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-center mb-4">
                            <Avatar className="w-24 h-24">
                                <AvatarImage src="/placeholder-avatar.jpg" alt={userData?.name} />
                                <AvatarFallback>
                                    {userData?.name
                                        .split(" ")
                                        .map((n: string) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="space-y-2">
                            <GenericForm.Text<TProfileSchema> label="Your Name" name="name" placeholder={"Enter your name here"} />
                        </div>
                        <div className="space-y-2">
                            <GenericForm.Text<TProfileSchema> label="Email Address" name="email" type="email" placeholder={"Enter your email address"} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">
                            Save Changes
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Shipping Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <GenericForm.Text <TProfileSchema> name={"shippingAddress.addressLine1"} label={"Address Line 1"} placeholder={"Address Line 1"} />
                        </div>
                        <div className="space-y-2">
                            <GenericForm.Text <TProfileSchema> name={"shippingAddress.addressLine2"} label={"Address Line 2"} placeholder={"Address Line 2"} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <GenericForm.Select
                                    <TProfileSchema>
                                    name="shippingAddress.city"
                                    required
                                    placeholder={"City"}
                                    label={"City"}
                                    options={[{
                                        label: "New York",
                                        value: "New York"
                                    }, {
                                        label: "Los Angeles",
                                        value: "Los Angeles"
                                    }, {
                                        label: "Chicago",
                                        value: "Chicago"
                                    }
                                    ]}
                                />
                            </div>
                            <div className="space-y-2">
                                <GenericForm.Text
                                    <TProfileSchema>
                                    name="shippingAddress.state"
                                    placeholder={"State"}
                                    label={"State"}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <GenericForm.Text
                                    <TProfileSchema>
                                    name="shippingAddress.zipCode"
                                    placeholder={"Zip Code"}
                                    label={"Enter Zip Code"}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <GenericForm.Select
                                    <TProfileSchema>
                                    name="shippingAddress.country"
                                    required
                                    placeholder={"Country"}
                                    label={"Country"}
                                    options={countryOptions || []}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">
                            Update Shipping Details
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Order History</CardTitle>
                        <CardDescription>View and manage your recent orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="processing">Processing</TabsTrigger>
                                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                                <TabsTrigger value="delivered">Delivered</TabsTrigger>
                            </TabsList>
                            {["all", "processing", "shipped", "delivered"].map((tab) => (
                                <TabsContent key={tab} value={tab} className="space-y-4">
                                    {orders
                                        .filter((order) => tab === "all" || order.status.toLowerCase() === tab)
                                        .map((order) => (
                                            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div>
                                                    <p className="font-medium">Order #{order.id}</p>
                                                    <p className="text-sm text-gray-500">{order.date}</p>
                                                    <p className="text-sm font-medium">{order.total}</p>
                                                </div>
                                                <div className="text-right">
                                                    <Badge
                                                        variant={
                                                            order.status === "Delivered"
                                                                ? "default"
                                                                : order.status === "Shipped"
                                                                    ? "secondary"
                                                                    : order.status === "Processing"
                                                                        ? "outline"
                                                                        : "destructive"
                                                        }
                                                    >
                                                        {order.status}
                                                    </Badge>
                                                    {(order.status === "Pending" || order.status === "Processing") && (
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="ghost" size="sm" className="mt-2">
                                                                    Cancel
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you sure you want to cancel this order?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This action cannot be undone. The order will be cancelled and you may need to place
                                                                        a new order if you change your mind.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>No, keep the order</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleCancelOrder(order.id)}>
                                                                        Yes, cancel the order
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                </TabsContent>
                            ))}
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
            </GenericForm>
        </div>
    )
}

