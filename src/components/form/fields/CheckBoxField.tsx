import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {cn} from "@/lib/utils.ts";
import {FieldValues, Path, useFormContext} from "react-hook-form";
import {Checkbox} from "@/components/ui/checkbox.tsx";


type TCheckBoxProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    column?: boolean;
    className?: string;
    longGap?: boolean;
    reverse?: boolean;
    gap?: "2" | "4" | "6" | "8" | "10";
}

/**
 * Props for the `CheckBoxField` component.
 *
 * @template T - The shape of the form values, extending `FieldValues` from `react-hook-form`.
 *
 * @prop {Path<T>} name - The name of the field, mapped to the form data.
 * @prop {string} [label] - Optional label text displayed next to the checkbox.
 * @prop {boolean} [required] - If true, indicates that the field is required, typically marked with an asterisk (*).
 * @prop {boolean} [disabled] - If true, disables the checkbox.
 * @prop {boolean} [column=false] - If true, displays the checkbox and label in a vertical column layout.
 * @prop {string} [className] - Additional CSS classes for styling the outer container.
 * @prop {boolean} [longGap=false] - If true, adds more space between the checkbox and its label.
 * @prop {boolean} [reverse=false] - If true, reverses the order of the checkbox and its label.
 * @prop {"2" | "4" | "6" | "8" | "10"} [gap="2"] - Specifies the spacing (gap) between the checkbox and its label.
 */



const CheckBoxField = <T extends FieldValues>({
                                                  name,
                                                  label,
                                                  required = false,
                                                  disabled = false,
                                                  className,
                                                  column = false,
                                                  longGap = false,
                                                  reverse = false,
                                                  gap = "2",
                                              }: TCheckBoxProps<T>) => {
    const {control} = useFormContext<T>()
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem className={className}>
                    <FormControl>
                        <div
                            className={cn("relative flex items-center", `gap-${gap}`, column ? "flex-col items-start" : "", longGap ? "justify-between" : "")}>

                            <Checkbox id={name} disabled={disabled} checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className={cn(reverse ? "order-1" : "order-0", "cursor-pointer")}/>

                            <FormLabel htmlFor={name}
                                       className={cn(reverse ? "order-0" : "order-1", "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70")}>
                                <span>{label}</span>
                                {required && <small className={"text-destructive mr-1"}>*</small>}
                            </FormLabel>
                        </div>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default CheckBoxField;