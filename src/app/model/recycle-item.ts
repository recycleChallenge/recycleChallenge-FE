export class RecycleItem {
    constructor(
        public itemId: number,
        public recycleId: number,
        public category: number,
        public count: number,
    ) { }
}

export enum Category {
    '종이류',
    '캔류',
    '금속류',
    '병류',
    '플라스틱류',
    '스티로폼',
    '비닐',
    '폐형광등',
    '폐건전지'
}








