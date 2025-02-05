import React from 'react';
import {Button} from '@/components/ui/button.tsx';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form.tsx';
import {Image, X} from 'lucide-react';
import {Input} from '@/components/ui/input.tsx';
import {FieldValues, Path, useFormContext} from 'react-hook-form';
import {cn} from '@/lib/utils.ts';

type ImageFieldProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
    maxLength: number
};

const MultiImageField = <T extends FieldValues>({
                                                    name,
                                                    label,
                                                    required = false,
                                                    className,
                                                    disabled = false,
                                                    maxLength = 10,
                                                }: ImageFieldProps<T>) => {
    const {control, watch} = useFormContext<T>();
    const fieldValue = watch(name);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        onChange: (value: { file: File; preview: string }[] | undefined) => void,
        prevValue: { file: File; preview: string }[] = []
    ) => {
        const files = e.target.files;
        if (files) {
            const newPreviews = Array.from(files).map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }));

            const updatedPreviews = [...prevValue, ...newPreviews];
            onChange(updatedPreviews);
        }
        e.target.value = '';
    };

    const handleRemove = (
        index: number,
        prevValue: { file: File; preview: string }[],
        onChange: (value: { file: File; preview: string }[]) => void
    ) => {
        const updatedPreviews = prevValue.filter((_, i) => i !== index);
        onChange(updatedPreviews);
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({field: {onChange, value}}) => (
                <FormItem className={cn(className)}>
                    {label && (
                        <FormLabel>
                            <span>{label}</span>
                            {required && <span className="ml-1 text-red-500">*</span>}
                        </FormLabel>
                    )}
                    <FormControl>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {/* Render uploaded images */}
                            {fieldValue.map((image: { file: File | undefined, preview: string }, index: number) => (
                                 <div
                                    className="relative group h-36 w-36"
                                    key={index}
                                >
                                    <img
                                        src={image.preview}
                                        alt="Preview"
                                        className="h-full w-full rounded-lg object-cover"
                                    />
                                    {/* Remove Button */}
                                    <div
                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity">
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleRemove(index, value, onChange)}
                                            disabled={disabled}
                                        >
                                            <X className="h-5 w-5 text-white"/>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {/* Add Images Button */}
                            {fieldValue.length !== maxLength && <div>
                                <label
                                    htmlFor={`file-${name}`}
                                    className="flex h-36 w-36 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 cursor-pointer hover:border-gray-400 hover:bg-gray-200 transition-all"
                                >
                                    <Image className="h-8 w-8 text-gray-400"/>
                                    <span className="text-sm text-gray-500">Add Images</span>
                                </label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    id={`file-${name}`}
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e, onChange, value)}
                                    multiple
                                    disabled={disabled}
                                />
                            </div>}
                        </div>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default MultiImageField;