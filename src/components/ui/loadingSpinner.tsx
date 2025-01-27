import {Loader} from "lucide-react";
import {cn} from "@/lib/utils.ts";

const LoadingSpinner = ({className}: { className?: string }) => {
    return (
        <Loader className={cn(className, "animate-spin")}/>
    );
};

export default LoadingSpinner;