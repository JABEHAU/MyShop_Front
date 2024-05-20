import { BasicProduct } from "./basic-product.model";

export interface ShoppingCart{
    itemId: number;
    productoId: number;
    cantidad: number;
    productDetail: BasicProduct;
}