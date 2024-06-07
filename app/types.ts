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

export interface ISolution {
    agentName: string;
    agentImage: string;
    route: {
            venueName: string;
            venueImage: string;
    }[];
    solutionScore: number;
}

export interface IBatchOrder {
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
