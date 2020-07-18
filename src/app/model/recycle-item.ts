export class RecycleItem {
    constructor(
        public itemId: number,
        public recycleId: number,
        public category: Category,
        public count: number,
    ) { }
}

export enum Category {
    paper,
    can,
    metal,
    bottle,
    plastic,
    styrofoam,
    vinyl,
    lamp,
    battery,
}








