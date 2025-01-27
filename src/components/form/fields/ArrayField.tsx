import {ReactNode} from "react";
import {ArrayPath, FieldValues, useFieldArray, UseFieldArrayReturn} from "react-hook-form";
import {useGenericFormContext} from "@/components/form/GenericFormContext.ts";

export type TArrayFieldProps<TFormValues extends FieldValues> = {
    children: (field:  UseFieldArrayReturn<TFormValues, ArrayPath<TFormValues>>) => ReactNode;
    name: ArrayPath<TFormValues>
}
const ArrayField = <TFormValues extends FieldValues> ({children, name}: TArrayFieldProps<TFormValues>) => {
    const control = useGenericFormContext<TFormValues>();
    const fieldArray = useFieldArray<TFormValues>({control, name});
    return children(fieldArray);
};

export default ArrayField;