import React, {Ref, useImperativeHandle} from "react";
import {
    Control,
    DefaultValues,
    FieldValues,
    FormState,
    Path,
    SubmitHandler,
    useForm,
    UseFormReturn
} from "react-hook-form";
import {Form} from "@/components/ui/form.tsx";
import {GenericFormContext} from "@/components/form/GenericFormContext.ts";
import {z, ZodType} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import TextField from "@/components/form/fields/TextField.tsx";
import {FormReset} from "@/components/form/fields/FormReset.tsx";
import {SelectField} from "@/components/form/fields/SelectField.tsx";
import DateField from "@/components/form/fields/DateField.tsx";
import ImageField from "@/components/form/fields/ImageField.tsx";
import {PasswordField} from "@/components/form/fields/PasswordField.tsx";
import {SliderField} from "@/components/form/fields/Slider.tsx";
import SearchField from "@/components/form/fields/SearchField.tsx";
import CheckBoxField from "@/components/form/fields/CheckBoxField.tsx";
import TextAreaField from "@/components/form/fields/TextAreaField.tsx";
import SwitchField from "@/components/form/fields/SwitchField.tsx";
import AutoResizeTextArea from '@/components/form/fields/AutoResizeTextArea.tsx';

// eslint-disable-next-line
export type TGenericFormRef<TFormValues extends FieldValues = any> = {
    control: Control<TFormValues>,
    form: UseFormReturn<TFormValues>,
    formState: FormState<TFormValues>,
    getValues: () => TFormValues,
    setValue: (name: Path<TFormValues>, value: TFormValues[Path<TFormValues>]) => void,
    reset: (values?: Partial<TFormValues> | undefined) => void,
    watch: (field: Path<TFormValues>) => TFormValues[Path<TFormValues>],
}

type TGenericFormProviderProps<TSchema extends ZodType> = {
    schema: TSchema,
    initialValues: Partial<z.infer<TSchema>>,
    onSubmit: SubmitHandler<z.infer<TSchema>>,
    mode?: "onBlur" | "onChange" | "onSubmit",
    children: React.ReactNode,
    ref?: Ref<TGenericFormRef<z.infer<TSchema>>>
    values?: z.infer<TSchema>
}


export const GenericForm = <TSchema extends ZodType>(props: TGenericFormProviderProps<TSchema>) => {
    const {children, initialValues, mode = "onChange", schema, onSubmit, ref, values} = props;
    type TFormValues = z.infer<TSchema>
    const form = useForm<TFormValues>({
        mode,
        resolver: zodResolver(schema),
        defaultValues: initialValues as DefaultValues<TFormValues>,
        values
    })
    useImperativeHandle(ref, () => ({
        control: form.control,
        form: form,
        formState: form.formState,
        getValues: form.getValues,
        setValue: form.setValue,
        reset: form.reset,
        watch: form.watch,
    }))
    return (
        <GenericFormContext.Provider value={{control: form.control}}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {children}
                </form>
            </Form>
        </GenericFormContext.Provider>
    )
}

GenericForm.displayName = 'GenericForm'
GenericForm.Text = TextField
GenericForm.TextArea = TextAreaField
GenericForm.Select = SelectField
GenericForm.Reset = FormReset
GenericForm.Date = DateField
GenericForm.Image = ImageField
GenericForm.PasswordField = PasswordField
GenericForm.SliderField = SliderField
GenericForm.SearchField = SearchField
GenericForm.Checkbox = CheckBoxField
GenericForm.Switch = SwitchField
GenericForm.Image = ImageField
GenericForm.AutoResizeTextArea = AutoResizeTextArea