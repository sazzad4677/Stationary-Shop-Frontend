import type React from "react"
import {Loader} from "lucide-react"

interface LoadingScreenProps {
    backgroundColor?: string
    spinnerColor?: string
}

const LoadingSpinner: React.FC<LoadingScreenProps> = ({
                                                                backgroundColor = "bg-black/50",
                                                                spinnerColor = "text-white",
                                                            }) => {
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center ${backgroundColor} backdrop-blur-sm animate-fade-in`}
        >
            <Loader className={`h-16 w-16 animate-spin ${spinnerColor}`} />
        </div>
    )
}

export default LoadingSpinner