import { Product } from './product.type'

/* -1: Product in cart
  0: All products
  1: Product is waiting response from shop owner
  2: Product is waiting to pick up
  3: Product is in delivery
  4: Prodcut deliveried
  5: Product is cancelled */

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchaseListStatus = 0 | PurchaseStatus

export interface Purchase {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: number
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}
