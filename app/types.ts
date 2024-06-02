export interface Order {
    srcToken: string;
    srcAmount: number;
    dstToken: string;
    minOut: number;
    expiration: string;
    orderId: string;
}

export interface Batch {
    time: string;
    batchId: string;
    orders: Order[];
}