import Table from "@/components/features/Table.tsx";
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {Layout} from "@/components/layout/DashboardLayout.tsx";
import {useBlockUserMutation, useGetAllUsersQuery} from "@/redux/features/admin/users/users.api.ts";
import {handleToastPromise} from "@/utils/handleToastPromise.ts";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useEffect, useState} from "react";
import {limitPerPage} from "@/constants/global.ts";
import {Button} from "@/components/ui/button.tsx";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    isBlocked: boolean;
    shippingAddress: {
        address1: string;
        address2: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
    }
}

export default function UsersPage() {
    const [blockUser, {isLoading}] = useBlockUserMutation(undefined)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [sortBy, setSortBy] = useState("-createdAt")
    const [query, setQuery] = useState<Record<string, unknown>>({
        page: currentPage,
        limit: limit,
        sortBy: sortBy,
        search: searchTerm,
    })
    const {data: users, isFetching} = useGetAllUsersQuery(query)
    const toggleBlockStatus = async (userId: string) => {
        await handleToastPromise(
            async () => {
               await blockUser(userId).unwrap();
            },
            {
                loading: "Loading...",
                success: "Successfully blocked ",
                error: (err: { data: { message: string } }) =>
                    err?.data?.message || "An error occurred during login.",
            },
            "login"
        );

    }

    const columns = [
        {
            label: "User",
            key: "name",
            render: (name: string, user: IUser) => (
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {name}
                </div>
            ),
        },
        { label: "Email", key: "email" },
        {
            label: "Status",
            key: "isBlocked",
            render: (isBlocked: boolean) => (
                <Badge variant={isBlocked ? "destructive" : "default"}>
                    {isBlocked ? "Blocked" : "Active"}
                </Badge>
            ),
        },
        {
            label: "Actions",
            key: "actions",
            render: (_: unknown, user: IUser) => (
                <Switch checked={!user.isBlocked} onCheckedChange={async() => await toggleBlockStatus(user._id)} />
            ),
        },
    ]

    useEffect(() => {
        setQuery({
            page: currentPage,
            limit: limit,
            sortBy: sortBy,
            search: searchTerm,
        })
    }, [currentPage, limit, sortBy, searchTerm])

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortBy(`-${column}`)
        } else {
            setSortBy(column)
        }
    }


    return (
        <Layout>
            <Card>
                <CardHeader>
                    <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <Input
                            placeholder="Search Users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                        <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select limit"/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    limitPerPage.map((item, key) => (
                                        <SelectItem key={key} value={item.toString()}>{item} per page</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <Table<IUser>
                        data={users?.data || []}
                        columns={columns}
                        isLoading={isFetching || isLoading}
                        emptyMessage="No users found"
                        onSort={handleSort}
                    />
                    <div className="flex justify-between items-center mt-4">
                        <div>
                            Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, users?.meta?.total || 0)} of{" "}
                            {users?.meta?.total || 0} entries
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}>
                                Previous
                            </Button>
                            <Button
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                disabled={currentPage * limit >= (users?.meta?.total || 0)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Layout>
    )
}

