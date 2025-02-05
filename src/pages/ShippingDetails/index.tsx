import {shippingDetailsSchema, TShippingDetails} from "@/pages/ShippingDetails/shippingDetails.schema.ts";
import {GenericForm, TGenericFormRef} from "@/components/form/GenericForm.tsx";
import {useGetCountryQueryQuery} from "@/redux/services/countryInfo.api.ts";
import {useGetProfileQuery, useUpdateMyProfileMutation} from "@/redux/features/profile/profile.api.ts";
import {Dispatch, SetStateAction, useRef} from "react";
import {handleToastPromise} from "@/utils/handleToastPromise.ts";
import {Button} from "@/components/ui/button.tsx";

const ShippingDetails = ({isEditing, setIsEditing}: {
    isEditing: boolean,
    setIsEditing: Dispatch<SetStateAction<boolean>>
}) => {
    const formRef = useRef<TGenericFormRef<TShippingDetails>>(null);
    const [updateProfile, {isLoading}] = useUpdateMyProfileMutation(undefined)
    const {data: myData} = useGetProfileQuery(undefined)
    const {data: countryData} = useGetCountryQueryQuery(undefined)
    const countryOptions = countryData?.map((item: { name: string }) => ({
        label: item.name,
        value: item.name,
    }))

    const initialValues = {
        email: myData?.email || "",
        fullName: myData?.name || "",
        addressLine1: myData?.shippingAddress.address1 || "",
        addressLine2: myData?.shippingAddress.address2 || "",
        city: myData?.shippingAddress.city || "",
        state: myData?.shippingAddress.state || "",
        zipCode: myData?.shippingAddress.zipCode || "",
        country: myData?.shippingAddress.country || "",
    }

    const onSubmit = async (values: TShippingDetails) => {
        const {addressLine1, addressLine2, city, state, zipCode, country} = values
        const data = {
            shippingAddress: {
                address1: addressLine1,
                address2: addressLine2,
                city,
                state,
                zipCode,
                country,
            },
        }
        await handleToastPromise(
            async () => {
                await updateProfile(data).unwrap();
                setIsEditing(false)
            },
            {
                loading: "Loading...",
                success: "Successfully updated",
                error: (err: { data: { message: string } }) =>
                    err?.data?.message || "An error occurred during update. Please try again later.",
            },
            "update-profile"
        );
    }

    return (
        <GenericForm ref={formRef} initialValues={{
            ...initialValues,
        }} values={initialValues} onSubmit={onSubmit} schema={shippingDetailsSchema}>
            {isEditing ? <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className={"col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4"}>
                            <GenericForm.Text
                                <TShippingDetails>
                                name="fullName"
                                required
                                label={"Full Name"}
                                placeholder={"Enter your full name"}
                                disabled={true}
                            />
                            <GenericForm.Text
                                <TShippingDetails>
                                name="email"
                                required
                                label={"Email"}
                                placeholder={"Enter your Email"}
                                disabled={true}
                            />
                        </div>
                        <div className={"col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4"}>
                            <GenericForm.TextArea
                                <TShippingDetails>
                                name="addressLine1"
                                required
                                label={"Address Line 1"}
                                placeholder={"123 Main St"}
                                resizeable
                            />
                            <GenericForm.TextArea
                                <TShippingDetails>
                                name="addressLine2"
                                label={"Address Line 2"}
                                placeholder={"Apartment 123"}
                                resizeable
                            />
                        </div>
                        <GenericForm.Select
                            <TShippingDetails>
                            name="country"
                            required
                            placeholder={"Country"}
                            label={"Country"}
                            options={countryOptions || []}
                        />
                        <GenericForm.Select
                            <TShippingDetails>
                            name="city"
                            required
                            placeholder={"City"}
                            label={"City"}
                            options={[{
                                label: "New York",
                                value: "New York"
                            }, {
                                label: "Los Angeles",
                                value: "Los Angeles"
                            }, {
                                label: "Chicago",
                                value: "Chicago"
                            }
                            ]}
                        />
                        <GenericForm.Text
                            <TShippingDetails>
                            name="state"
                            placeholder={"State"}
                            label={"State"}
                            required
                        />
                        <GenericForm.Text
                            <TShippingDetails>
                            name="zipCode"
                            placeholder={"Zip Code"}
                            label={"Zip Code"}
                            required
                        />

                    </div>
                </>
                :
                <div className="space-y-4 p-4 rounded-lg ">
                    <div className="flex items-center space-x-2">
                        <strong className="text-gray-600 w-24">Name:</strong>
                        <span className="text-gray-800">{myData?.name || "N/A"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <strong className="text-gray-600 w-24">Email:</strong>
                        <span className="text-gray-800">{myData?.email || "N/A"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <strong className="text-gray-600 w-24">Address 1:</strong>
                        <span className="text-gray-800">{myData?.shippingAddress?.address1 || "N/A"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <strong className="text-gray-600 w-24">Address 2:</strong>
                        <span className="text-gray-800">{myData?.shippingAddress?.address2 || "N/A"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <strong className="text-gray-600 w-24">City:</strong>
                        <span className="text-gray-800">{myData?.shippingAddress?.city || "N/A"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <strong className="text-gray-600 w-24">Country:</strong>
                        <span className="text-gray-800">{myData?.shippingAddress?.country || "N/A"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <strong className="text-gray-600 w-24">State:</strong>
                        <span className="text-gray-800">{myData?.shippingAddress?.state || "N/A"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <strong className="text-gray-600 w-24">Zip Code:</strong>
                        <span className="text-gray-800">{myData?.shippingAddress?.zipCode || "N/A"}</span>
                    </div>
                </div>}
            {isEditing && <div className={"mt-6"}>
                <Button type="submit" className="w-full" loading={isLoading}>
                    {"Save Changes"}
                </Button>
            </div>}
        </GenericForm>
    )
}


export default ShippingDetails