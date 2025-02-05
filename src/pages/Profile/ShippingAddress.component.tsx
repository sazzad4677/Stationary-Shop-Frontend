import {shippingAddressSchema} from "@/pages/Profile/profile.schema.ts";
import {CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {GenericForm} from "@/components/form/GenericForm.tsx";
import {TShippingDetails} from "@/pages/Profile/profile.interface.ts";
import {Button} from "@/components/ui/button.tsx";
import {handleToastPromise} from "@/utils/handleToastPromise.ts";
import {useGetProfileQuery, useUpdateMyProfileMutation} from "@/redux/features/profile/profile.api.ts";
import {useGetCountryQueryQuery} from "@/redux/services/countryInfo.api.ts";

const ShippingAddressComponent = () => {
    const {data: userData} = useGetProfileQuery(undefined)
    const {data: countryData} = useGetCountryQueryQuery(undefined)
    const [updateProfile] = useUpdateMyProfileMutation(undefined)
    const countryOptions = countryData?.map((item: { name: string }) => ({
        label: item.name,
        value: item.name,
    }))

    const shippingAddressInitialValues: TShippingDetails = {
        addressLine1: userData?.shippingAddress?.address1 || "",
        addressLine2: userData?.shippingAddress?.address2 || "",
        city: userData?.shippingAddress?.city || "",
        state: userData?.shippingAddress?.state || "",
        zipCode: userData?.shippingAddress?.zipCode || "",
        country: userData?.shippingAddress?.country || "",

    }

    const onSubmitShippingDetails = async (values: TShippingDetails) => {
        const updatedData = {
            shippingAddress: {
                address1: values.addressLine1,
                address2: values.addressLine2,
                city: values.city,
                state: values.state,
                zipCode: values.zipCode,
                country: values.country,
            }
        }
        await handleToastPromise(
            async () => {
                await updateProfile(updatedData).unwrap()
            },
            {
                loading: "Loading...",
                success: "Successfully updated",
                error: (err: { data: { message: string } }) =>
                    err?.data?.message || "An error occurred during update.",
            },
            "update-profile"
        );
    }
    return (
        <GenericForm  schema={shippingAddressSchema} initialValues={shippingAddressInitialValues} onSubmit={onSubmitShippingDetails} values={shippingAddressInitialValues}>
            <CardHeader>
                <CardTitle>Shipping Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <GenericForm.Text<TShippingDetails>
                        name={"addressLine1"}
                        label={"Address Line 1"}
                        placeholder={"Address Line 1"}
                    />
                </div>
                <div className="space-y-2">
                    <GenericForm.Text<TShippingDetails>
                        name={"addressLine2"}
                        label={"Address Line 2"}
                        placeholder={"Address Line 2"}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <GenericForm.Select<TShippingDetails>
                            name="city"
                            required
                            placeholder={"City"}
                            label={"City"}
                            options={[
                                {
                                    label: "New York",
                                    value: "New York",
                                },
                                {
                                    label: "Los Angeles",
                                    value: "Los Angeles",
                                },
                                {
                                    label: "Chicago",
                                    value: "Chicago",
                                },
                            ]}
                        />
                    </div>
                    <div className="space-y-2">
                        <GenericForm.Text<TShippingDetails>
                            name="state"
                            placeholder={"State"}
                            label={"State"}
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <GenericForm.Text<TShippingDetails>
                            name="zipCode"
                            placeholder={"Zip Code"}
                            label={"Enter Zip Code"}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <GenericForm.Select<TShippingDetails>
                            name="country"
                            required
                            placeholder={"Country"}
                            label={"Country"}
                            options={countryOptions || []}
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">
                    Update Shipping Details
                </Button>
            </CardFooter>
        </GenericForm>
    );
};
ShippingAddressComponent.displayName = `ShippingAddressComponent`
export default ShippingAddressComponent;