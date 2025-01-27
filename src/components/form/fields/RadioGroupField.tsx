import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {cn} from "@/lib/utils.ts";
import {FieldValues, Path, useFormContext} from "react-hook-form";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";

type TOptions = {
    value: string;
    label: string;
}

type TRadioGroupProps<T extends FieldValues> = {
    name: Path<T>;
    options: TOptions[];
    label?: string;
    required?: boolean;
    className?: string;
    column?: boolean;
    longGap?: boolean;
    reverse?: boolean;
    gap?: "2" | "4" | "6" | "8" | "10";
    columnGroup?: boolean;
    rowGroup?: boolean;
}

/**
 * Props for the `RadioGroupField` component.
 *
 * @template T - The shape of the form values, extending `FieldValues` from `react-hook-form`.
 *
 * @prop {Path<T>} name - The name of the field, mapped to the form data.
 * @prop {TOptions[]} options - An array of options for the radio group. Each option includes:
 *   - `value` (string): The value of the radio option.
 *   - `label` (string): The label text displayed next to the radio option.
 * @prop {string} [label] - Optional label text displayed above the radio group.
 * @prop {boolean} [required=false] - If true, an asterisk (*) is displayed next to the label.
 * @prop {string} [className] - Additional CSS classes for styling the outer container.
 * @prop {boolean} [column=false] - If true, individual radio items are displayed in a column layout.
 * @prop {boolean} [longGap=false] - If true, adds additional spacing between the label and radio option.
 * @prop {boolean} [reverse=false] - If true, reverses the order of the label and the radio button.
 * @prop {"2" | "4" | "6" | "8" | "10"} [gap="2"] - Specifies the gap size between the label and the radio button.
 * @prop {boolean} [columnGroup=true] - If true, the entire group is displayed in a column layout.
 * @prop {boolean} [rowGroup=false] - If true, the entire group is displayed in a row layout.
 */


const RadioGroupField = <T extends FieldValues>({
                                                    name,
                                                    options,
                                                    label,
                                                    required = false,
                                                    className,
                                                    column = false,
                                                    columnGroup = true,
                                                    longGap = false,
                                                    reverse = false,
                                                    gap = "2",
                                                    rowGroup = false,
                                                }: TRadioGroupProps<T>) => {
    const {control} = useFormContext<T>()
    if (options.length < 2) {
        throw new Error("Provide at least two options")
    }
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    {
                        label && (
                            <FormLabel>
                                <span>{label}</span>
                                {required && (<small className={"text-destructive ml-1"}>*</small>)}
                            </FormLabel>
                        )
                    }
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className={cn(
                                className,
                                columnGroup && "flex-col",
                                rowGroup && "flex-row",
                                "flex gap-2"
                            )}
                        >
                            {
                                options.map((option, index) => (
                                    <FormItem key={index}>
                                        <FormControl>
                                            <div
                                                className={cn("relative flex items-center", `gap-${gap}`, column ? "flex-col items-start" : "", longGap ? "justify-between" : "")}>
                                                <RadioGroupItem id={option.value} value={option.value}
                                                                className={cn(reverse ? "order-1" : "order-0", "cursor-pointer")}>
                                                </RadioGroupItem>
                                                <FormLabel htmlFor={option.value}
                                                           className={cn(reverse ? "order-0" : "order-1",  "cursor-pointer")}>
                                                    {option.label}
                                                </FormLabel>

                                            </div>
                                        </FormControl>
                                    </FormItem>
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default RadioGroupField;