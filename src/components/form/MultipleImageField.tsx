import React, { useState} from 'react';
import { Button } from '@/components/ui/button';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Image, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';

type ImageFieldProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
};

const MultiImageField = <T extends FieldValues>({
                                                    name,
                                                    label,
                                                    required = false,
                                                    className,
                                                    disabled = false,
                                                }: ImageFieldProps<T>) => {
    const { control } = useFormContext<T>();
    const [previews, setPreviews] = useState<{ file: File; preview: string }[]>([]);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        onChange: (value: { file: File; preview: string }[] | undefined) => void
    ) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);
            const newPreviews = fileArray.map((file) => {
                const preview = URL.createObjectURL(file);
                return { file, preview };
            });

            setPreviews((prev) => [...prev, ...newPreviews]);
            onChange(previews.concat(newPreviews));
        }
    };

    const handleRemove = (
        index: number,
        onChange: (value: { file: File; preview: string }[] | undefined) => void
    ) => {
        const updatedPreviews = previews.filter((_, i) => i !== index);
        setPreviews(updatedPreviews);
        onChange(updatedPreviews);
    };


    return (
        <FormField
            control={control}
            name={name}
            render={({ field: { onChange } }) => (
                <FormItem className={cn(className)}>
                    {label && (
                        <FormLabel>
                            <span>{label}</span>
                            {required && <span className="ml-1 text-red-500">*</span>}
                        </FormLabel>
                    )}
                    <FormControl>
                        {/* Use grid to manage layout (no overlap) */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {/* Render uploaded images */}
                            {previews.map((image, index) => (
                                <div
                                    className="relative group h-36 w-36"
                                    key={`${image.file.name}-${index}`}
                                >
                                    <img
                                        src={image.preview}
                                        alt="Preview"
                                        className="h-full w-full rounded-lg object-cover"
                                    />
                                    {/* Remove Button */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity">
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleRemove(index, onChange)}
                                            disabled={disabled}
                                        >
                                            <X className="h-5 w-5 text-white" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {/* Add Images Button */}
                            <div>
                                <label
                                    htmlFor={`file-${name}`}
                                    className="flex h-36 w-36 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 cursor-pointer hover:border-gray-400 hover:bg-gray-200 transition-all"
                                >
                                    <Image className="h-8 w-8 text-gray-400" />
                                    <span className="text-sm text-gray-500">Add Images</span>
                                </label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    id={`file-${name}`}
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e, onChange)}
                                    multiple
                                    disabled={disabled}
                                />
                            </div>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default MultiImageField;