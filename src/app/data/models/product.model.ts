export interface IProduct {
    id: number;
    name: string;
    details: string;
    status: boolean;
    unitPrice: number;
}

export interface IProductResponse {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    result: IProduct[];
}

export interface IProductProvider {
    name: string;
    unitPrice: number;
}