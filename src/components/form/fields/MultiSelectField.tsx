import {FieldValues, Path} from "react-hook-form";
import {FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useGenericFormContext} from "@/components/form/GenericFormContext.ts";
import MultiSelector from "@/components/ui/MultiSelector.tsx";

type TOptions = {
    value: string;
    label: string;
}

export type TMultiSelectFieldProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    placeholder?: string;
    options: TOptions[];
    className?: string;
    // onChange?: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
}


export const MultiSelectField = <T extends FieldValues>({
                                                            name,
                                                            label,
                                                            placeholder,
                                                            options,
                                                            className,
                                                            // onChange,
                                                            required = false,
                                                            disabled = false
                                                        }: TMultiSelectFieldProps<T>) => {
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
                    <MultiSelector
                        onChange={field.onChange}
                        value={field.value}
                        disabled={disabled}
                        options={options}
                        placeholder={placeholder}
                        // emptyIndicator={
                        //     <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        //         no results found.
                        //     </p>
                        // }
                    />
                    {/*<Select onValueChange={onChange || field.onChange} value={field.value} disabled={disabled}>*/}
                    {/*    <SelectTrigger>*/}
                    {/*        <SelectValue placeholder={placeholder ?? "Select an item"}/>*/}
                    {/*    </SelectTrigger>*/}
                    {/*    <SelectContent>*/}
                    {/*        <SelectGroup>*/}
                    {/*            {*/}
                    {/*                options.length === 0 ? <SelectItem value={"0"} disabled={true} className={cn("cursor-not-allowed")}>No Data Available</SelectItem> :*/}
                    {/*                    options.map(({value, label}) => (*/}
                    {/*                        <SelectItem key={value} value={value} className={cn("cursor-pointer")}>{label}</SelectItem>*/}
                    {/*                    ))*/}
                    {/*            }*/}
                    {/*        </SelectGroup>*/}
                    {/*    </SelectContent>*/}
                    {/*</Select>*/}
                    <FormMessage/>
                </FormItem>
            )
        }>
        </FormField>
    )
}
