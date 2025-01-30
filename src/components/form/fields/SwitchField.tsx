import {FieldValues, Path} from "react-hook-form";
import {useGenericFormContext} from "@/components/form/GenericFormContext";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Switch} from "@/components/ui/switch";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label.tsx";

export type SwitchFieldProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    disabled?: boolean;
    className?: string;
    showLeftHandLabel?: boolean;
};

/**
 * The `SwitchField` component provides a form switch input integrated with React Hook Form,
 * styled similarly to the `TextField` component.
 *
 * @template T - The shape of the form values extending `FieldValues`.
 *
 * @prop {Path<T>} name - The name of the field in the form.
 * @prop {string} [label] - The label for the switch input.
 * @prop {string} [description] - Optional supplementary description text.
 * @prop {string} [className] - Additional CSS classes for styling the outer container.
 */
const SwitchField = <T extends FieldValues>({
                                                name,
                                                label,
                                                disabled,
                                                className,
                                                showLeftHandLabel = true,
                                            }: SwitchFieldProps<T>) => {
    const control = useGenericFormContext<T>();

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem className={cn("flex items-center gap-x-2", className)}>
                    <FormControl>
                        <div className="flex items-center space-x-2">
                            {showLeftHandLabel && <Label htmlFor={name}>{label}</Label>}
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={disabled}
                            />
                            {!showLeftHandLabel && <Label htmlFor={name}>{label}</Label>}
                        </div>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default SwitchField;