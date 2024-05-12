import { BasicProduct } from "./basic-product.model";

export interface CategoryWithProducts{
    categoriaId: number;
    categoria: string;
    productos: BasicProduct[];
}