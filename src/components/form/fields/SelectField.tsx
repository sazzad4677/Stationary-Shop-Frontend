import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {FieldValues, Path} from "react-hook-form";
import {FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useGenericFormContext} from "@/components/form/GenericFormContext.ts";
import {cn} from "@/lib/utils.ts";

export type TSelectFieldProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    placeholder?: string;
    options: { value: string, label: string }[];
    className?: string;
    onChange?: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
}


export const SelectField = <T extends FieldValues>({
                                                       name,
                                                       label,
                                                       placeholder,
                                                       options,
                                                       className,
                                                       onChange,
                                                       required = false,
                                                       disabled = false
                                                   }: TSelectFieldProps<T>) => {
    const control = useGenericFormContext<T>();
    return (
        <FormField name={name} control={control} render={({field}) =>
            (
                <FormItem className={className}>
                    {label &&
                        <FormLabel>
                            <span>{label}</span>
                            {required && <span className={"text-destructive"}>*</span>}
                        </FormLabel>}
                    <Select onValueChange={onChange || field.onChange} value={field.value} disabled={disabled}>
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder ?? "Select an item"}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    options.length === 0 ? <SelectItem value={"0"} disabled={true} className={cn("cursor-not-allowed")}>No Data Available</SelectItem> :
                                        options.map(({value, label}) => (
                                            <SelectItem key={value} value={value} className={cn("cursor-pointer")}>{label}</SelectItem>
                                        ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <FormMessage/>
                </FormItem>
            )
        }>
        </FormField>
    )
}
