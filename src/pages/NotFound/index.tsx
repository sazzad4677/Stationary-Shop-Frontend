import { Button } from "@/components/ui/button"
import { Home, AlertCircle } from "lucide-react"
import {Link} from "react-router";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <div className="text-center space-y-6 max-w-md px-4">
                <div className="space-y-2">
                    <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground" />
                    <h1 className="text-4xl font-extrabold tracking-tight">404 - Page Not Found</h1>
                    <p className="text-xl text-muted-foreground">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>
                <div className="pt-6">
                    <Button asChild>
                        <Link to="/" className="inline-flex items-center space-x-2">
                            <Home className="w-4 h-4" />
                            <span>Return Home</span>
                        </Link>
                    </Button>
                </div>
                <div className="pt-12">
                    <p className="text-sm text-muted-foreground">If you believe this is an error, please contact support.</p>
                </div>
            </div>
        </div>
    )
}

export default NotFound