import {FieldValues, Path} from "react-hook-form";
import {useGenericFormContext} from "@/components/form/GenericFormContext.ts";
import {FormControl, FormField, FormLabel, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {ReactNode} from "react";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {X} from "lucide-react";
import LoadingSpinner from "@/components/ui/loadingSpinner.tsx";

export type TextFieldProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'url'
    required?: boolean;
    Icon?: ReactNode;
    iconClassName?: string;
    loading?: boolean;
    className?: string;
    inputClassName?: string;
    disabled?: boolean;
    action?: () => void
}

/**
 * Props for the `TextField` component.
 *
 * @template T - The shape of the form values, extending `FieldValues` from `react-hook-form`.
 *
 * @prop {Path<T>} name - The name of the field, mapped to the form data.
 * @prop {string} [label] - Optional label text displayed above the input field.
 * @prop {string} [placeholder] - Optional placeholder text displayed inside the input field.
 * @prop {'text' | 'password' | 'email' | 'number' | 'url'} [type='text'] - The type of input field. Defaults to "text".
 * @prop {boolean} [required] - If true, an asterisk (*) is displayed next to the label.
 * @prop {ReactNode} [Icon] - Optional icon displayed inside the input field, typically on the right.
 * @prop {string} [iconClassName] - Additional CSS classes for styling the icon.
 * @prop {boolean} [loading] - If true, a loading spinner is displayed inside the input field.
 * @prop {string} [className] - Additional CSS classes for styling the outer container.
 * @prop {string} [inputClassName] - Additional CSS classes for styling the input field itself.
 * @prop {boolean} [disabled] - If true, the input field is disabled.
 * @prop {() => void} [action] - Optional action triggered when the button inside the input is clicked. If present, a button is displayed inside the input.
 */

const TextField = <T extends FieldValues>({
                                              name,
                                              label,
                                              placeholder,
                                              type = "text",
                                              required,
                                              Icon,
                                              iconClassName,
                                              loading,
                                              className,
                                              inputClassName,
                                              disabled,
                                              action
                                          }: TextFieldProps<T>) => {
    const control = useGenericFormContext<T>();
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem className={cn(className)}>
                    {label &&
                        <FormLabel>
                            <span>{label}</span>
                            {required && <span className={"text-destructive"}>*</span>}
                        </FormLabel>}
                    <FormControl>
                        <div className={"relative flex items-center gap-2"}>
                            <Input
                                placeholder={placeholder} type={type} {...field}
                                className={cn(`w-full ${inputClassName}`, action && "pr-12")}
                                id={name}
                                disabled={disabled}/>
                            {loading && <LoadingSpinner className={"absolute right-4"}/>}
                            {
                                action && (
                                    <Button variant={"ghost"} size={"sm"} onClick={action} type={"button"}
                                            className={cn("absolute right-0.5 top-0.5", iconClassName)}>
                                        {Icon ? Icon : <X className={"w-4 h-4 text-destructive"}/>}
                                    </Button>
                                )
                            }
                            {
                                !action && Icon && (
                                    <div className={cn("absolute right-2 top-3", iconClassName)}>
                                        {Icon}
                                    </div>
                                )
                            }
                        </div>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
};

export default TextField;