export interface Producto{
    id:string;
    nombre:string;
    precio:number;
    stock:number;
    sku:string;
    descripcion:string;
    imagen?: any;
    cantidad?:number;
    talla?:number;
}