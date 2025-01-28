import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useGenericFormContext } from "@/components/form/GenericFormContext";
import {Input} from "@/components/ui/input.tsx";

export type TSliderFieldProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    className?: string;
    onChange?: (value: number[]) => void;
    max?: number;
    min?: number;
    step?: number;
    defaultValue?: number[];
    required?: boolean;
    disabled?: boolean;
};

export const SliderField = <T extends FieldValues>({
                                                       name,
                                                       label,
                                                       className,
                                                       onChange,
                                                       max = 100,
                                                       min = 0,
                                                       step = 1,
                                                       defaultValue = [25, 75],
                                                       required = false,
                                                       disabled = false,
                                                   }: TSliderFieldProps<T>) => {
    const control = useGenericFormContext<T>();

    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem className={className}>
                    {label && (
                        <FormLabel>
                            <span>{label}</span>
                            {required && <span className="text-destructive">*</span>}
                        </FormLabel>
                    )}
                    <Slider
                        max={max}
                        min={min}
                        step={step}
                        value={field.value ?? defaultValue}
                        onValueChange={(value) => {
                            field.onChange(value);
                            onChange?.(value);
                        }}
                        defaultValue={defaultValue}
                        className={cn("w-full", disabled ? "opacity-50 cursor-not-allowed" : "")}
                        disabled={disabled}
                    />
                    <div className="flex items-center justify-between space-x-4">
                        {/* "From" input field */}
                        <div className="flex flex-col items-center">
                            <Input
                                id="from"
                                type="number"
                                value={field.value[0] ?? defaultValue[0]}
                                onChange={(event) => {
                                    const newValue = Number(event.target.value);
                                    const boundedValue = Math.min(max, Math.max(min, newValue));
                                    const updatedValue = [boundedValue, Math.max(boundedValue, field.value[1] ?? defaultValue[1])];
                                    field.onChange(updatedValue);
                                    onChange?.(updatedValue);
                                }}
                                step={step}
                                min={min}
                                max={field.value[1] ?? defaultValue[1]}
                                disabled={disabled}
                            />
                        </div>
                        {/* "To" input field */}
                        <div className="flex flex-col items-center">
                            <Input
                                id="to"
                                type="number"
                                value={field.value[1] ?? defaultValue[1]} // Second value of the range
                                onChange={(event) => {
                                    const newValue = Number(event.target.value);
                                    const boundedValue = Math.min(max, Math.max(min, newValue));
                                    const updatedValue = [Math.min(field.value[0] ?? defaultValue[0], boundedValue), boundedValue];
                                    field.onChange(updatedValue);
                                    onChange?.(updatedValue);
                                }}
                                step={step}
                                min={field.value[0] ?? defaultValue[0]}
                                max={max}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};