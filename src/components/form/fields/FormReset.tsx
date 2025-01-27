import {FieldValues, useFormContext} from "react-hook-form";
import {Button} from "@/components/ui/button.tsx";

type TResetFormProps<T extends FieldValues> = {
    label?: string;
    resetValues?: Partial<T>;
    disabled?: boolean;
}
export const FormReset = <T extends FieldValues>({
                                                     label = "Reset",
                                                     resetValues,
                                                     disabled = false,
                                                     ...props
                                                 }: TResetFormProps<T>
    ) => {
        const {reset} = useFormContext<T>();
        const handleReset = () => {
            if (resetValues) {
                reset(resetValues as T);
            } else {
                reset();
            }
        }
        return (
            <Button type={"reset"} variant={"destructive"} onClick={handleReset} disabled={disabled} {...props}>{label}</Button>
        )
    }
;