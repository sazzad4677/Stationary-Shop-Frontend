import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {cn} from "@/lib/utils.ts";
import {FieldValues, Path, useFormContext} from "react-hook-form";
import {Checkbox} from "@/components/ui/checkbox.tsx";

type IOptions = {
    value: string;
    label: string;
}

type TCheckBoxGroupProps<T extends FieldValues> = {
    name: Path<T>;
    options: IOptions[];
    label?: string;
    className?: string;
    disabled?: boolean;
    column?: boolean;
    required?: boolean;
}

/**
 * `CheckBoxField` component for rendering a group of checkboxes in a form.
 *
 * @template T - The shape of the form values, extending `FieldValues` from `react-hook-form`.
 *
 * @prop {Path<T>} name - The name of the field, mapped to the form data.
 * @prop {IOptions[]} options - An array of options for the checkbox group. Each option includes:
 *   - `value` (string): The value of the checkbox option.
 *   - `label` (string): The label text displayed next to the checkbox.
 * @prop {string} [label] - Optional label text displayed above the checkbox group.
 * @prop {boolean} [required=false] - If true, an asterisk (*) is displayed next to the label to indicate the field is required.
 * @prop {boolean} [disabled=false] - If true, disables all checkboxes in the group.
 * @prop {boolean} [column=false] - If true, displays the checkboxes in a vertical column layout. Defaults to horizontal.
 * @prop {string} [className] - Additional CSS classes for styling the outer container.
 *
 * Example usage:
 *
 * ```tsx
 * <CheckBoxField
 *     name="hobbies"
 *     label="Select Your Hobbies"
 *     options={[
 *         { value: "reading", label: "Reading" },
 *         { value: "traveling", label: "Traveling" },
 *         { value: "cooking", label: "Cooking" },
 *     ]}
 *     required
 *     column
 * />
 * ```
 */


const CheckBoxGroupField = <T extends FieldValues>({
                                                       name,
                                                       options,
                                                       label,
                                                       required = false,
                                                       disabled = false,
                                                       className,
                                                       column = false,
                                                   }: TCheckBoxGroupProps<T>) => {
    const {control} = useFormContext<T>()
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem className={className}>
                    <FormLabel>
                        <span>{label}</span>
                        {required && <small className={"text-destructive mr-1"}>*</small>}
                    </FormLabel>
                    <FormControl>
                        <div
                            className={cn("flex gap-4", column ? "flex-col" : "flex-row flex-wrap")}>
                            {
                                options.map((option) => (
                                    <div className={"flex gap-x-2"} key={option.value}>
                                        <Checkbox id={option.value} disabled={disabled} className={"cursor-pointer"}
                                                  checked={(field.value as string[])?.includes(option.value)}
                                                  onCheckedChange={(checked) => {
                                                      const value = (field.value as string[]) || []
                                                      if (checked) {
                                                          field.onChange([...value, option.value])
                                                      } else {
                                                          field.onChange(value.filter((val) => val !== option.value))
                                                      }
                                                  }}
                                        />
                                        <FormLabel htmlFor={option.value}
                                                   className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer")}>
                                            <span>{option.label}</span>
                                        </FormLabel>
                                    </div>
                                ))
                            }
                        </div>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default CheckBoxGroupField;