import { Photo } from "./photo.model";
import { Comment } from "./comment.model";

export interface Product{
    productoId: number,
    vendedorId: number,
    categoriaId: number,
    nombre: string,
    descripcion: string,
    marca: string,
    modelo: string,
    genero: string,
    cantidad: number,
    precio: number,
    esOferta: number,
    precioOferta: number,
    fotos: Photo[],
    comentarios: Comment[]
}