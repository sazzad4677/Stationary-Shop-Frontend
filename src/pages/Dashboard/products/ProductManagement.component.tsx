import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {GenericForm, TGenericFormRef} from "@/components/form/GenericForm.tsx";
import {productSchema} from "@/pages/Dashboard/products/products.schema.ts"
import {
    useGetSingleProductQuery,
} from "@/redux/features/products/products.api.ts";
import toast from "react-hot-toast";
import {productCategories} from "@/constants/global.ts";
import {useRef} from "react";
import {
    useCreateProductMutation,
    useGenerateDescriptionMutation,
    useUpdateProductMutation
} from "@/redux/features/admin/products/products.api.ts";
import MultiImageField from "@/components/form/fields/MultipleImageField.tsx";
import { TProductManageProps, TProductSchema } from '@/pages/Dashboard/products/products.type.ts';

const ProductManagement = ({
                               isDialogOpen,
                               editingProduct,
                               setEditingProduct,
                               setIsDialogOpen,
                           }: TProductManageProps) => {
    const formRef = useRef<TGenericFormRef<TProductSchema>>(null)

    const [generateDescription, {isLoading}] = useGenerateDescriptionMutation();
    const [addProduct, {isLoading: isAddProductLoading,}] = useCreateProductMutation(undefined)
    const [updateProduct, {isLoading: isUpdateProductLoading}] = useUpdateProductMutation(undefined);
    const {data} = useGetSingleProductQuery(editingProduct, {skip: !editingProduct,});
    const initialValues = {
        name: data?.name || '',
        brand: data?.brand || '',
        price: data?.price || 0,
        category: data?.category || '',
        description: data?.description || '',
        quantity: data?.quantity || 0,
        inStock: data?.inStock || false,
        images: data?.images?.map((image) => ({
            file: undefined,
            preview: typeof image === "string" ? image : "",
        })) ?? [],
    }
    const categoryOptions = productCategories.map((item) => ({
        label: item,
        value: item,
    }))
    const handleAddProduct = async (newProduct: TProductSchema) => {
        const formValues = {...newProduct};
        const formData = new FormData();
        formValues?.images?.forEach((image) => {
            if (image.file) {
                formData.append("images", image.file);
            }
        });
        formValues.images = []
        formData.append("data", JSON.stringify(formValues));
        try {
            await toast.promise(
                (async () => {
                    await addProduct(formData).unwrap();
                    setIsDialogOpen(false)
                })(),
                {
                    loading: 'Loading...',
                    success: 'Successfully Product Created',
                    error: (err: { data: { message: string; }; }) => err?.data?.message,
                },
                {
                    id: 'addProduct',
                }
            );
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error('Something went wrong! Please try again.', {id: 'addProduct',});
        }

    }

    const handleUpdateProduct = async (updatedProduct: TProductSchema) => {
        const formValues = {...updatedProduct};
        const formData = new FormData();
        formValues?.images?.forEach((image) => {
            if (image.file) {
                formData.append("images", image.file);
            }
        });
        const images = formValues?.images?.map((v) => v.preview).filter(
            (v) => !v.includes("blob")
        )
        const newValues = {...formValues, images}
        formData.append("data", JSON.stringify(newValues));
        try {
            await toast.promise(
                (async () => {
                    await updateProduct({
                        productId: editingProduct as string,
                        productData: formData,
                    }).unwrap();
                    setIsDialogOpen(false)
                    setEditingProduct(false)
                })(),
                {
                    loading: 'Loading...',
                    success: 'Successfully Updated',
                    error: (err: { data: { message: string; }; }) => err?.data?.message,
                },
                {
                    id: 'updateProduct',
                }
            );
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error('Something went wrong! Please try again.', {id: 'updateProduct',});
        }
    }

    const onSubmit = async (values: TProductSchema) => {
        if (editingProduct) {
            await handleUpdateProduct(values)
        } else {
            await handleAddProduct(values)
        }
    }
    const aiAction = async () => {
        const values = formRef.current?.getValues();
        const {name, brand, category} = values || {};
        if (!name || !brand || !category) {
            toast("Please fill in Name, Brand, and Category first.");
            return;
        }
        try {
            const generatedDescription = await generateDescription({name, brand, category}).unwrap();
            formRef.current?.setValue(
                "description",
                generatedDescription)
            toast.success("Successfully generated description.", {
                id: "generateDescription",
            });
        } catch (error) {
            console.error("Error generating description:", error);
            toast.error("Failed to generate description.", {
                id: "generateDescription",
            });
        }
    }
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setEditingProduct(false)}>
                    <Plus className="mr-2 h-4 w-4"/> Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-4xl  max-h-[90vh] overflow-y-auto" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                </DialogHeader>
                <DialogDescription/>
                <GenericForm ref={formRef} onSubmit={onSubmit} initialValues={initialValues} schema={productSchema}
                             values={initialValues}>
                    <div className="space-y-2 mb-2">
                        <div className={"grid grid-cols-1 md:grid-cols-2 gap-x-2"}>
                            <GenericForm.Text<TProductSchema> label="Name"
                                                        name="name"
                                                        placeholder="Product Name"
                                                        required/>
                            <GenericForm.Text<TProductSchema> label="Brand" name="brand" placeholder="Product Brand"
                                                        required/>
                        </div>
                        <GenericForm.Select<TProductSchema> name="category" label="Category" options={categoryOptions}
                                                      required/>
                        <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
                            <GenericForm.Text<TProductSchema> label="Price" name="price" placeholder="Product Price"
                                                        required/>
                            <GenericForm.Text<TProductSchema> name="quantity" label="Quantity" required
                                                        placeholder="Product Quantity"/>
                        </div>
                        <GenericForm.AutoResizeTextArea<TProductSchema>
                            name="description"
                            label="Description"
                            placeholder={"Enter Product Description"}
                            required
                            resizeable
                            ai={true}
                            aiAction={aiAction}
                            loading={isLoading}
                        />
                        {/*<Controller*/}
                        {/*    name="description"*/}
                        {/*    render={({field}) => (*/}
                        {/*        <div className={"grid gap-2"}>*/}
                        {/*            <div className={"flex justify-between items-center"}>*/}
                        {/*                <p><Label>Description<span className={"text-destructive"}>*</span></Label></p>*/}
                        {/*                <div>*/}
                        {/*                    <Button*/}
                        {/*                        type={"button"}*/}
                        {/*                        onClick={aiAction}*/}
                        {/*                        disabled={isLoading}*/}
                        {/*                        variant={"ghost"}*/}
                        {/*                    >*/}
                        {/*                        <Sparkles className={"text-primary-foreground"}/> Generate*/}
                        {/*                        With AI*/}
                        {/*                    </Button>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*            <Editor*/}
                        {/*                value={field.value ?? ""}*/}
                        {/*                placeholder="Start typing content..."*/}
                        {/*                onChange={field.onChange}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    )}*/}
                        {/*/>*/}
                        {<MultiImageField<TProductSchema>
                            name="images"
                            label="Product Images"
                            required
                            maxLength={4}
                        />}

                    </div>
                    <DialogFooter>
                        <Button type="submit"
                                loading={isAddProductLoading || isUpdateProductLoading}>{editingProduct ? "Update Product" : "Add Product"}
                        </Button>
                    </DialogFooter>
                </GenericForm>
            </DialogContent>
        </Dialog>
    );
};
ProductManagement.displayName = `ProductManagement`
export default ProductManagement;