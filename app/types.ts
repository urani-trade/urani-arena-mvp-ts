export interface Order {
    srcToken: string;
    srcAmount: number;
    dstToken: string;
    minOut: number;
    expiration: string;
    orderId: string;
}

export interface Batch {
    batchTime: string;
    batchNumber: number;
    batchId?: string;
    orders: IBatchOrder[];
    solutions: ISolution[];
}

export interface IBatch {
    batchId: number;
    orders: IOrder[];
    solutions: ISolution[];
    fillData: {
        agentName: string;
        tx: string;
        route: IRoute[];
    }
}

export interface IOrder {
    dstAddress: string;
    dstToken: string;
    expiration: number;
    intentId: number;
    minReceived: number;
    srcAddress: string;
    srcAmount: number;
    srcToken: string;
    status: string;
}

export interface IRoute {
    dstAddress: string;
    dstImage: string;
    dstName: string;
    sentAmount: number;
    sentToken: string;
    srcAddress: string;
    srcImage: string;
    srcName: string;
}

export interface ISolution {
    agent: {
        image: string;
        name: string;
    }
    route: IRoute[];
    score: number;
}

export interface IBatchOrder {
    id?: string;
    srcToken: {
        image: string;
        name: string;
        amount: string;
    },
    targetToken: {
        image: string;
        name: string;
        amount: string;
    }
}
