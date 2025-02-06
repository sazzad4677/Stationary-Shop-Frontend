export type TProduct = {
  name: string
  brand: string
  price: number
  category: string
  description: string
  quantity: number
  inStock: boolean
  images: TProductWithImages
}

export type TProductWithImages = TProduct & {
  images: {
    file: File,
    preview: string,
  }[]
}

export type TProductGetApiResponse = TProduct & {
  _id: string
  images: string[]
  __v: number
  createdAt: Date,
  updatedAt: Date,
}