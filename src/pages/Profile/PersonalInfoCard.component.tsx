import {GenericForm, TGenericFormRef} from "@/components/form/GenericForm.tsx";
import {profileSchema} from "@/pages/Profile/profile.schema.ts";
import {CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {TPersonalInfo} from "@/pages/Profile/profile.interface.ts";
import {Button} from "@/components/ui/button.tsx";
import {handleToastPromise} from "@/utils/handleToastPromise.ts";
import {useRef} from "react";
import {useGetProfileQuery, useUpdateMyProfileMutation} from "@/redux/features/profile/profile.api.ts";

const PersonalInfoCardComponent = () => {
    const formRef = useRef<TGenericFormRef<TPersonalInfo>>(null);
    const {data: userData} = useGetProfileQuery(undefined)
    const [updateProfile] = useUpdateMyProfileMutation(undefined)
    const personalInfoInitialValues: TPersonalInfo = {
        name: userData?.name || "",
        email: userData?.email || "",
    };
    const onSubmitPersonalInfo = async (values: TPersonalInfo) => {
        const {name, email} = values
        const updatedData = {
            name,
            email,
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
        <GenericForm ref={formRef} schema={profileSchema} initialValues={personalInfoInitialValues} onSubmit={onSubmitPersonalInfo} values={personalInfoInitialValues}>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-center mb-4">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src="/placeholder-avatar.jpg" alt={userData?.name}/>
                        <AvatarFallback>
                            {userData?.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="space-y-2">
                    <GenericForm.Text<TPersonalInfo> label="Your Name" name="name"
                                                     placeholder={"Enter your name here"}/>
                </div>
                <div className="space-y-2">
                    <GenericForm.Text<TPersonalInfo>
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder={"Enter your email address"}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Save Changes</Button>
            </CardFooter>
        </GenericForm>
    );
};
PersonalInfoCardComponent.displayName = `PersonalInfoCardComponent`

export default PersonalInfoCardComponent;