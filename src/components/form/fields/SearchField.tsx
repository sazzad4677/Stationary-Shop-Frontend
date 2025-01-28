import { FieldValues, Path } from "react-hook-form";
import { useGenericFormContext } from "@/components/form/GenericFormContext";
import {
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

export type SearchFieldProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    placeholder?: string;
    required?: boolean;
    icon?: ReactNode;
    iconClassName?: string;
    disabled?: boolean;
    className?: string;
    inputClassName?: string;
};

const SearchField = <T extends FieldValues>({
                                                name,
                                                label,
                                                placeholder = "Search...",
                                                required,
                                                icon = <SearchIcon className="text-gray-400" />,
                                                iconClassName,
                                                disabled = false,
                                                className = "",
                                                inputClassName = "",
                                            }: SearchFieldProps<T>) => {
    const control = useGenericFormContext<T>();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn(className)}>
                    {label && (
                        <FormLabel>
                            <span>{label}</span>
                            {required && <span className="text-destructive">*</span>}
                        </FormLabel>
                    )}
                    <FormControl>
                        <div className="relative flex items-center">
                            <Input
                                type="text"
                                placeholder={placeholder}
                                id={name}
                                {...field}
                                className={cn("w-full pl-10", inputClassName)}
                                disabled={disabled}
                            />
                            <div
                                className={cn(
                                    "absolute left-3 top-1/2 -translate-y-1/2",
                                    iconClassName
                                )}
                            >
                                {icon}
                            </div>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default SearchField;