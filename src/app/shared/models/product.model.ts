export interface Product{
    productoId: number,
    vendedorId: number,
    categoriaId: number,
    categoria: string,
    nombre: string,
    descripcion: string,
    marca: string,
    modelo: string,
    genero: string,
    cantidad: number,
    precio: number,
    esOferta: number,
    precioOferta: number,
    fotos: string[]
}