import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Trash2, X } from "lucide-react";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { ReactNode } from "react";

type TConfirmationModalProps = {
    handleConfirm: () => void; // Action when the "Confirm" button is clicked
    itemName?: string; // Name of the item being modified or deleted
    message?: string; // Custom description message inside the modal
    type?: "delete" | "cancel"; // Type of the modal: delete or cancel
    variant?: "default" | "destructive" | "secondary" | "outline"; // Button style variant
    loading?: boolean; // Show loading state on the "Confirm" button
    /**
     * Properties for customizing the modal if `customType` is set to true.
     *
     * Allows full control over the dialog's content and actions when `customType` is enabled.
     */
    customType?: {
        message: string; // Custom modal title
        triggerComponent?: ReactNode; // Custom trigger element for opening
        action?: () => void; // Custom confirm action (fallbacks to `handleConfirm`)
        actionLabel?: string; // Custom label for the confirm button
        cancelLabel?: string; // Custom label for the cancel button
    } | null;
    /**
     * If customTrigger is provided, you can manage the modal's state externally.
     */
    customTrigger?: {
        open: boolean; // Boolean to control external modal open/close state
        setOpen: (state: boolean) => void; // State setter for modal control
    };
};

const ConfirmationModal = ({
                               handleConfirm,
                               itemName = "",
                               message,
                               type = "delete",
                               variant,
                               loading = false,
                               customType = null,
                               customTrigger
                           }: TConfirmationModalProps) => {
    const isCustom = !!customType;

    return (
        <AlertDialog
            open={customTrigger ? customTrigger.open : undefined}
            onOpenChange={customTrigger ? customTrigger.setOpen : undefined}
        >
            {/* Trigger Component */}
            {!customTrigger && (
                <AlertDialogTrigger asChild>
                    {isCustom && customType?.triggerComponent ? (
                        customType.triggerComponent
                    ) : (
                        <Button variant={variant ?? "destructive"} size="sm">
                            {type === "delete" ? <Trash2 className="mr-2 h-4 w-4" /> : <X className="mr-2 h-4 w-4" />}
                            {type === "delete" ? "Delete" : "Cancel"}
                        </Button>
                    )}
                </AlertDialogTrigger>
            )}

            {/* Modal Content */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {isCustom ? customType?.message : `Are you sure you want to ${type === "delete" ? "delete" : "cancel"} ${itemName}?`}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {message ?? `This action cannot be undone.`}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    {/* Cancel Button */}
                    <AlertDialogCancel asChild={true}>
                        <Button variant="default" >
                            {isCustom && customType?.cancelLabel ? customType.cancelLabel : type === "delete" ? "Cancel" : "No"}
                        </Button>
                    </AlertDialogCancel>

                    {/* Confirm/Custom Action Button */}
                    <AlertDialogAction
                        asChild={true}
                        onClick={() => (isCustom && customType?.action ? customType.action() : handleConfirm())}
                    >
                        <Button variant={variant ?? "destructive"} loading={loading} className={"p-4"}>
                            {isCustom && customType?.actionLabel ? customType.actionLabel : type === "delete" ? "Delete" : "Yes"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

ConfirmationModal.displayName = "ConfirmationModal";

export default ConfirmationModal;