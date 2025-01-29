import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import {useNavigate} from "react-router";

export default function OrderPlaced() {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center min-h-screen p-4">
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
                    <p className="text-gray-600">Thank you for your purchase. Your order #12345 has been confirmed.</p>
                    <Button className="mt-4 w-full" onClick={() => navigate("/")}>
                        Continue Shopping
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
