import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {GenericForm, TGenericFormRef} from "@/components/form/GenericForm.tsx";
import {productSchema} from "@/pages/Dashboard/Products.schema.ts"
import type {z} from "zod";
import {
    useGetSingleProductQuery,
} from "@/redux/features/products/products.api.ts";
import toast from "react-hot-toast";
import {productCategories} from "@/constants/global.ts";
import {useEffect, useRef} from "react";
import {useGenerateDescriptionMutation} from "@/redux/services/openAiApi.ts";
import {useCreateProductMutation, useUpdateProductMutation} from "@/redux/features/admin/products/products.api.ts";

type TProductManageProps = {
    isDialogOpen: boolean;
    setIsDialogOpen: (value: boolean) => void;
    editingProduct: boolean | string;
    setEditingProduct: (value: boolean | string) => void;
}

type TProduct = z.infer<typeof productSchema>

const initialValues: TProduct = {
    name: "",
    brand: "",
    price: 0,
    category: "",
    description: "",
    quantity: 0,
    inStock: true,
}

const ProductManagement = ({
                               isDialogOpen,
                               editingProduct,
                               setEditingProduct,
                               setIsDialogOpen,
                           }: TProductManageProps) => {
    const formRef = useRef<TGenericFormRef<TProduct>>(null)
    const [generateDescription, {isLoading}] = useGenerateDescriptionMutation();
    const [addProduct, {isLoading: isAddProductLoading,}] = useCreateProductMutation(undefined)
    const [updateProduct, {isLoading: isUpdateProductLoading}] = useUpdateProductMutation(undefined);
    const {data, refetch} = useGetSingleProductQuery(editingProduct, {skip: !editingProduct,});
    const categoryOptions = productCategories.map((item) => ({
        label: item,
        value: item,
    }))
    const handleAddProduct = async (newProduct: TProduct) => {
        try {
            await toast.promise(
                (async () => {
                    await addProduct(newProduct).unwrap();
                    setIsDialogOpen(false)
                })(),
                {
                    loading: 'Loading...',
                    success: 'Successfully logged in',
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

    const handleUpdateProduct = async (updatedProduct: TProduct) => {
        try {
            await toast.promise(
                (async () => {
                    await updateProduct({
                        productId: editingProduct as string,
                        productData: {
                            ...updatedProduct,
                        },
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
        // Implement update product logic

    }

    const onSubmit = async (values: TProduct) => {
        if (editingProduct) {
            await handleUpdateProduct(values)
        } else {
            await handleAddProduct(values)
        }
    }
    useEffect(() => {
        if (editingProduct) {
            refetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingProduct]);
    useEffect(() => {
        if (data && formRef.current) {
            const {name, brand, price, category, description, quantity, inStock} = data;
            const newInitialValues = {
                name,
                brand,
                price,
                category,
                description,
                quantity,
                inStock,
            }
            formRef.current.reset(newInitialValues);
        }
    }, [data]);
    const aiAction = async () => {
        const {name, brand, category} = formRef.current?.getValues() ?? {};
        if (!name || !brand || !category) {
            toast("Please fill in Name, Brand, and Category first.");
            return;
        }
        try {
            const generatedText = await generateDescription({name, brand, category}).unwrap();
            formRef.current?.setValue(
                "description",
                generatedText)
        } catch (error) {
            console.error("Error generating description:", error);
            alert("Failed to generate description.");
        }
    }
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setEditingProduct(false)}>
                    <Plus className="mr-2 h-4 w-4"/> Add Product
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                </DialogHeader>
                <DialogDescription/>
                <GenericForm ref={formRef} onSubmit={onSubmit} initialValues={initialValues} schema={productSchema}>
                    <div className="space-y-2 mb-2">
                        <GenericForm.Text<TProduct> label="Name" name="name" placeholder="Product Name" required/>
                        <GenericForm.Text<TProduct> label="Brand" name="brand" placeholder="Product Brand" required/>
                        <GenericForm.Select<TProduct> name="category" label="Category" options={categoryOptions}
                                                      required/>
                        <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
                            <GenericForm.Text<TProduct> label="Price" name="price" placeholder="Product Price"
                                                        required/>
                            <GenericForm.Text<TProduct> name="quantity" label="Quantity" required
                                                        placeholder="Product Quantity"/>
                        </div>
                        <GenericForm.TextArea<TProduct>
                            name="description"
                            label="Description"
                            placeholder={"Enter Product Description"}
                            required
                            resizeable
                            ai={false}
                            aiAction={aiAction}
                            loading={isLoading}
                        />
                    </div>
                    <Button type="submit"
                            loading={isAddProductLoading || isUpdateProductLoading}>{editingProduct ? "Update Product" : "Add Product"}</Button>
                </GenericForm>
            </DialogContent>
        </Dialog>
    );
};
ProductManagement.displayName = `ProductManagement`
export default ProductManagement;