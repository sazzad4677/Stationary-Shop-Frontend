import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {GenericForm, TGenericFormRef} from "@/components/form/GenericForm.tsx";
import {z} from "zod";
import {loginSchema} from "@/pages/Auth/auth.schema.ts";
import {Link, useLocation, useNavigate} from "react-router";
import {useRef} from "react";
import {useLoginMutation} from "@/redux/features/auth/auth.api.ts";
import toast from "react-hot-toast";
import {useAppDispatch} from "@/redux/hooks.ts";
import {setUser} from "@/redux/features/auth/auth.slice.ts";

type TLogin = z.infer<typeof loginSchema>

const initialValues: TLogin = {
    email: "",
    password: "",
}

const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const dispatch = useAppDispatch();
    const ref = useRef<TGenericFormRef<TLogin>>(null)
    const [login, {isLoading}] = useLoginMutation(undefined)

    const onSubmit = async (values: TLogin) => {
        try {
            await toast.promise(
                (async () => {
                    const response = login(values).unwrap();
                    const {data} = await response;
                    dispatch(setUser({ token: data.token }));
                    navigate(from);
                })(),
                {
                    loading: 'Loading...',
                    success: 'Successfully logged in',
                    error: (err: { data: { message: string; }; }) => err?.data?.message,
                },
                {
                    id: 'login',
                }
            );
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error('Something went wrong! Please try again.', {id: 'login',});
        }
    };

    return (
        <div className={cn("flex flex-col gap-6 py-16")}>
            <Card className="w-[450px] mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="flex flex-col gap-4">
                            <Button variant="default" className="w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Login with Google
                            </Button>
                        </div>
                        <div
                            className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                        <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                             Or continue with
                                         </span>
                        </div>
                        <GenericForm ref={ref} schema={loginSchema} onSubmit={onSubmit}
                                     initialValues={initialValues}>
                            <div className={"grid gap-6"}>
                                <div className="grid gap-2">
                                    <Label htmlFor={"email"}>
                                        <span>Email</span>
                                        {<span className={"text-destructive"}>*</span>}
                                    </Label>
                                    <GenericForm.Text
                                        <TLogin>
                                        name="email"
                                        type="email"
                                        placeholder="your-email@example.com"
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor={"password"}>
                                            <span>Password</span>
                                            {<span className={"text-destructive"}>*</span>}
                                        </Label>
                                        <Link
                                            to={"/"}
                                            className="ml-auto text-sm underline-offset-4 hover:underline text-primary-foreground"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <GenericForm.PasswordField<TLogin> name="password" required
                                                                       placeholder="********"/>
                                </div>
                                <Button type="submit" className="w-full" loading={isLoading}>
                                    Login
                                </Button>
                            </div>
                        </GenericForm>
                        <div className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link to="/register" className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div
                className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary-foreground ">
                By clicking login, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}

export default LoginForm