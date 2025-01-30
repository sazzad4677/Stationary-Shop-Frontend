import toast from "react-hot-toast";

interface ToastPromiseOptions {
    loading: string;
    success: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: (err: any) => string; // Dynamic error extractor
}

export async function handleToastPromise<T>(
    asyncFn: () => Promise<T>, // The asynchronous operation to execute
    toastOptions: ToastPromiseOptions,
    toastId: string = "default-toast"
) {
    try {
        return await toast.promise(
            asyncFn(),
            {
                loading: toastOptions.loading,
                success: toastOptions.success,
                error: toastOptions.error,
            },
            {
                id: toastId,
            }
        );
    } catch (error) {
        console.error("An error occurred:", error);
        toast.error("Something went wrong! Please try again.", {id: toastId});
        throw error; // Re-throw the error to handle it further if needed
    }
}