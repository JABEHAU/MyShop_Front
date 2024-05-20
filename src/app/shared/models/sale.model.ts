import { SaleItem } from "./sale-item.model";

export interface Sale{
    clienteId: number;
    numCtaPago: string;
    total: number;
    paisEntrega: string;
    estadoEntrega: string;
    ciudadEntrega: string;
    cpEntrega: string;
    domicilioEntrega: string;
    saleItems: SaleItem[];
}