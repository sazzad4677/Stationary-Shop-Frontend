import {useEffect, useRef, useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"
import {useGetProfileQuery, useUpdateMyProfileMutation} from "@/redux/features/profile/profile.api.ts";
import {GenericForm, TGenericFormRef} from "@/components/form/GenericForm.tsx";
import {z} from "zod";
import {ProfileSchema} from "@/pages/Profile/Profile.schema.ts";
import {useGetCountryQueryQuery} from "@/redux/services/countryInfo.api.ts";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import toast from "react-hot-toast";

const initialOrders = [
    {id: 1, status: "Delivered", date: "2023-05-15", total: "$120.00"},
    {id: 2, status: "Shipped", date: "2023-05-20", total: "$85.50"},
    {id: 3, status: "Processing", date: "2023-05-25", total: "$200.00"},
    {id: 4, status: "Pending", date: "2023-05-30", total: "$150.75"},
    {id: 5, status: "Pending", date: "2023-05-30", total: "$150.75"},
    {id: 6, status: "Pending", date: "2023-05-30", total: "$150.75"},
    {id: 7, status: "Pending", date: "2023-05-30", total: "$150.75"},
    {id: 8, status: "Pending", date: "2023-05-30", total: "$150.75"},
    {id: 9, status: "Pending", date: "2023-05-30", total: "$150.75"},
    {id: 10, status: "Pending", date: "2023-05-30", total: "$150.75"},
]

type TProfileSchema = z.infer<typeof ProfileSchema>

export default function ProfilePage() {
    const formRef = useRef<TGenericFormRef<TProfileSchema>>(null);
    const {data: userData} = useGetProfileQuery(undefined)
    const [orders, setOrders] = useState(initialOrders)
    const {data: countryData} = useGetCountryQueryQuery(undefined)
    const [updateProfile] = useUpdateMyProfileMutation(undefined)
    const countryOptions = countryData?.map((item: { name: string }) => ({
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
    const onSubmit = async (values:TProfileSchema) => {
        const {name, email, shippingAddress} = values
        const updatedData = {
            name,
            email,
            shippingAddress: {
                address1: shippingAddress.addressLine1,
                address2: shippingAddress.addressLine2,
                city: shippingAddress.city,
                state: shippingAddress.state,
                zipCode: shippingAddress.zipCode,
                country: shippingAddress.country,
            }
        }
        try {
            await toast.promise(
                updateProfile(updatedData).unwrap(),
                {
                    loading: 'Loading...',
                    success: 'Successfully updated',
                    error: (err: { data: { message: string; }; }) => err?.data?.message,
                },
                {
                    id: 'update-profile',
                }
            );
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error('Something went wrong! Please try again.', {id: 'update-profile',});
        }
    }

    const handleCancelOrder = (orderId: number) => {
        setOrders(orders.map((order) => (order.id === orderId ? {...order, status: "Cancelled"} : order)))
    }

    useEffect(() => {
        if (userData && countryData && formRef.current) {
            formRef.current.reset(initialValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData, countryData]);

    const orderStatus = ["All", "Processing", "Shipped", "Delivered", "Refunded"]

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
                                    <AvatarImage src="/placeholder-avatar.jpg" alt={userData?.name}/>
                                    <AvatarFallback>
                                        {userData?.name
                                            .split(" ")
                                            .map((n: string) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="space-y-2">
                                <GenericForm.Text<TProfileSchema> label="Your Name" name="name"
                                                                  placeholder={"Enter your name here"}/>
                            </div>
                            <div className="space-y-2">
                                <GenericForm.Text<TProfileSchema> label="Email Address" name="email" type="email"
                                                                  placeholder={"Enter your email address"}/>
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
                                <GenericForm.Text<TProfileSchema> name={"shippingAddress.addressLine1"}
                                                                  label={"Address Line 1"}
                                                                  placeholder={"Address Line 1"}/>
                            </div>
                            <div className="space-y-2">
                                <GenericForm.Text<TProfileSchema> name={"shippingAddress.addressLine2"}
                                                                  label={"Address Line 2"}
                                                                  placeholder={"Address Line 2"}/>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                                <TabsTrigger key={status} value={status}
                                                             className="rounded-sm px-4 py-1.5 w-full text-sm font-medium">
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </TabsTrigger>
                                            ))}
                                        </TabsList>
                                        <ScrollBar orientation="horizontal"/>
                                    </ScrollArea>
                                </div>
                                <ScrollArea className="h-[400px] mt-4 rounded-md border">
                                    {orderStatus.map((tab) => (
                                        <TabsContent key={tab} value={tab} className="p-4">
                                            <div className="space-y-4">
                                                {initialOrders
                                                    .filter((order) => tab === orderStatus[0] || order.status === tab)
                                                    .map((order) => (
                                                        <div key={order.id}
                                                             className="flex items-center justify-between p-4 border rounded-lg">
                                                            <div>
                                                                <p className="font-medium">Order #{order.id}</p>
                                                                <p className="text-sm text-gray-500">{order.date}</p>
                                                                <p className="text-sm font-medium">{order.total}</p>
                                                            </div>
                                                            <div className="text-right flex flex-col">
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
                                                                {(order.status === "Pending") && (
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => handleCancelOrder(order.id)}
                                                                        className="mt-2"
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </TabsContent>
                                    ))}
                                </ScrollArea>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </GenericForm>
        </div>
    )
}

