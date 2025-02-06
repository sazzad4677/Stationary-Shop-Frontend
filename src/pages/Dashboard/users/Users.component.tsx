import Table from "@/components/features/Table.tsx";
import {Switch} from "@/components/ui/switch.tsx"
import {Badge} from "@/components/ui/badge.tsx"
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx"
import {Layout} from "@/components/layout/DashboardLayout.tsx";
import {useBlockUserMutation, useGetAllUsersQuery} from "@/redux/features/admin/users/users.api.ts";
import {handleToastPromise} from "@/utils/handleToastPromise.ts";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {DownloadCloudIcon} from "lucide-react";
import exportToExcel from "@/utils/exportToExcel.ts";
import {cn} from "@/lib/utils.ts";
import { TUserGetApiResponse } from '@/types/user.types.ts';

export default function UsersPage() {
    const [blockUser, {isLoading}] = useBlockUserMutation(undefined)
    const [query, setQuery] = useState<Record<string, unknown>>({
        page: 1,
        limit: 10,
        sortBy: "-createdAt",
        search: "",
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
            render: (name: string) => (
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {name}
                </div>
            ),
        },
        {label: "Email", key: "email"},
        {
            label: "Status",
            key: "isBlocked",
            render: (isBlocked: boolean) => (
                <Badge variant={isBlocked ? "destructive" : "default"}>
                    {isBlocked ? "Blocked" : "Active"}
                </Badge>
            ),
        },
    ]


    const handleExport = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const exportData = users?.data.map(({_id, createdAt, updatedAt, __v, ...rest}: TUserGetApiResponse) => rest);
        exportToExcel(exportData, 'Users');
    };


    return (
        <Layout>
            <Card>
                <CardHeader>
                    <CardTitle>

                        <Button onClick={handleExport} variant="default" size="sm"
                                className="flex items-center gap-1"><DownloadCloudIcon/>Export</Button>

                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table<TUserGetApiResponse>
                        data={users?.data || []}
                        columns={columns}
                        allowPagination
                        allowSearch
                        allowSorting
                        isLoading={isFetching || isLoading}
                        totalEntries={users?.meta?.total}
                        onQueryChange={setQuery}
                        emptyMessage="No products found"
                        actions={(user) => (
                            <Switch className={cn(!user.isBlocked ? "!bg-primary-foreground" : "bg-primary")}
                                    checked={!user.isBlocked}
                                    onCheckedChange={async () => await toggleBlockStatus(user._id)}/>)}
                    />

                </CardContent>
            </Card>
        </Layout>
    )
}

