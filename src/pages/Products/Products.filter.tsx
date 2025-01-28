import React, {useRef} from "react";
import {GenericForm, TGenericFormRef} from "@/components/form/GenericForm";
import {SelectField} from "@/components/form/fields/SelectField";
import {Button} from "@/components/ui/button";
import { TFilter} from "@/pages/Products/Products.schema.ts";

type FilterFormProps = {
    categories: string[];
};

export const FilterForm: React.FC<FilterFormProps> = ({
                                                          categories,
                                                      }) => {
    const formRef = useRef<TGenericFormRef<TFilter>>(null);

    const handleSubmit = () => {
        if (formRef.current) {
            // formRef.current.submit();
        }
    };

    return (
        <div className="p-4 space-y-4">
            {/* Price Range Slider */}
            <GenericForm.SliderField<TFilter>
                name="priceRange"
                min={0}
                max={50}
                step={1}
                label="Price Range"
            />

            {/* Category Selector */}
            <SelectField<TFilter>
                name="selectedCategory"
                label="Category"
                placeholder="Select a category"
                options={[
                    {value: "all", label: "All Categories"},
                    ...categories.map((category) => ({
                        value: category,
                        label: category,
                    })),
                ]}
            />
            {/* Sort By Selector */}
            <SelectField<TFilter>
                name="sortBy"
                label="Sort By"
                placeholder="Sort by"
                options={[
                    {value: "title", label: "Title"},
                    {value: "price", label: "Price: Low to High"},
                ]}
            />
            <Button type="submit" className={"w-full"} onClick={handleSubmit}>
                Apply Filters
            </Button>
        </div>
    );
};