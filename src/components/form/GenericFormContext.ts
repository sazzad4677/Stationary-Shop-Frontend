/* eslint-disable @typescript-eslint/no-explicit-any */
import {createContext, useContext} from "react";
import {Control, FieldValues} from "react-hook-form";

export type TGenericFormProps<TFormValues extends FieldValues = any> = {
    control: Control<TFormValues>
}

export const GenericFormContext = createContext<TGenericFormProps | null>(null)

export const useGenericFormContext = <TFormValues extends FieldValues = any>() => {
    const context = useContext(GenericFormContext)
    if (context === undefined) {
        throw new Error('useGenericFormContext must be used within a GenericFormProvider')
    }
    return context?.control as Control<TFormValues>
}