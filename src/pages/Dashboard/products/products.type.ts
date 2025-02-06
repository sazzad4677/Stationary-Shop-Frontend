import type { z } from 'zod';
import { productSchema } from '@/pages/Dashboard/products/products.schema.ts';

export type TProductManageProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
  editingProduct: boolean | string;
  setEditingProduct: (value: boolean | string) => void;
}

export type TProductSchema = z.infer<typeof productSchema>