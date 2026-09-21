export type CategorySlug = 'clothing' | 'accessories' | 'home' | 'gifts'

export interface ProductVariant {
  id: number
  sku: string
  color: string
  size: string
  price: number
  compare_at_price?: number | null
  online_stock_quantity: number
  offline_stock_quantity: number
}

export interface Product {
  id: number
  name: string
  slug: string
  category: { name: string; slug: CategorySlug }
  brand: string
  manufacturer: string
  short_description: string
  description: string
  material: string
  composition: string
  properties: string[]
  measurements: Record<string, Record<string, string>>
  model_info: string
  care: string
  country_of_origin: string
  is_new: boolean
  is_gift: boolean
  images: { url: string; alt: string }[]
  variants: ProductVariant[]
}

export interface CartItem {
  product: Product
  variant: ProductVariant
  quantity: number
}

