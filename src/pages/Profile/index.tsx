import {Card} from "@/components/ui/card"
import {ChevronRight} from "lucide-react";
import PersonalInfoCardComponent from "@/pages/Profile/PersonalInfoCard.component.tsx";
import ShippingAddressComponent from "@/pages/Profile/ShippingAddress.component.tsx";
import OrderHistoryComponent from "@/pages/Profile/OrderHistory.component.tsx";

const ProfilePage = () => {
    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-primary-foreground">My Profile</h1>
                <div className="flex items-center text-sm text-muted-foreground">
                    <span>Home</span>
                    <ChevronRight className="h-4 w-4 mx-1"/>
                    <span>Profile</span>
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                <Card className="md:row-span-2">
                    <PersonalInfoCardComponent/>
                </Card>
                <Card>
                    <ShippingAddressComponent/>
                </Card>
                <OrderHistoryComponent/>
            </div>

        </div>
    )
}

export default ProfilePage