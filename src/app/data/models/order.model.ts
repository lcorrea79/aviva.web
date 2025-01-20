import { PaymentMode } from "./enums";
import { IFee } from "./fee.model";
import { IProductProvider } from "./product.model";

export interface IOrder {
    orderId: string;
    amount: number;
    status: string;
    method: string;
    otherData: Record<string, any>;
    controlData: Record<string, any>;    
}

export interface IOrderProvider {
    orderId: string;
    amount: number;
    status: string;
    method: string;
    fees: IFee[];
    products: IProductProvider[];
    otherData: Record<string, any>;
    controlData: Record<string, any>;    
}

export interface IOrderRequest {
    method: PaymentMode;
    products: IProductProvider[]; 
}

export interface IOrderResponse {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    result: IOrder[];
}