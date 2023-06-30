export type tSymbol = {
    id: number;
    sessionId: string;
    symbol: string;
    previousSymbol: string;
    load: number;
    delayTime: number;
    deltaInteraction: boolean;
}

export type Node = {
    id?: number,
    children: Node[],
    name: string,
    value?: string
}