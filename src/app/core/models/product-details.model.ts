/**
 * Represents details of a product.
 */
export interface ProductDetails {
  id: number;
  name: string;
  price: number;
  description: string
}
/**
 * Represents error messages related to product validation.
 */
export interface Message {
  FILED_REQUIRD: string;
  PRICE_INVALID: string;
  PRICE_PATTEN: string;
}