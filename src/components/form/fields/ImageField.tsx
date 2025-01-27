import {Button} from '@/components/ui/button';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {cn} from '@/lib/utils';
import {Image, X} from 'lucide-react';
import {FieldValues, Path, useFormContext} from 'react-hook-form';

type ImageFieldProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
};


const ImageField = <T extends FieldValues>({name, label, required = false, className, disabled = false}: ImageFieldProps<T>) => {
    const {control} = useFormContext<T>();

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        onChange: (value: { file: File; preview: string } | undefined) => void
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const previewUrl = reader.result as string;
                onChange({ file, preview: previewUrl });
            };

            reader.readAsDataURL(file);
        } else {
            onChange(undefined);
        }
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({field: {value, onChange}}) => (
                <FormItem className={cn(className)}>
                    {label && (
                        <FormLabel>
                            <span>{label}</span>
                            {required && <span className="ml-1 text-red-500">*</span>}
                        </FormLabel>
                    )}
                    <FormControl>
                        <div className="flex flex-col gap-4">
                            {value?.preview ? (
                                <div className="relative group h-48 w-48">
                                    <img
                                        src={value?.preview}
                                        alt="Preview"
                                        className="h-full w-full rounded-lg object-cover"
                                    />
                                    <div
                                        className="absolute inset-x-0 bottom-0 h-0 bg-black/50 group-hover:h-full transition-all duration-300 rounded-lg flex items-center justify-center">
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            onClick={() => onChange(undefined)}
                                            disabled={disabled}
                                        >
                                            <X className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="flex h-48 w-48 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50">
                                    {
                                        <div
                                            onClick={() => document.getElementById(name)?.click()}
                                            className="flex h-48 w-48 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                            <Image className="h-8 w-8 text-gray-400"/>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) =>
                                                    handleFileChange(e, onChange)
                                                }
                                                id={name}
                                                disabled={disabled}
                                            />
                                        </div>
                                    }
                                </div>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
}

ImageField.displayName = 'ImageLinkField';

export default ImageField