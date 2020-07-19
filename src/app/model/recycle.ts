import { RecycleItem } from './recycle-item';
export class Recycle {
    constructor(
        public recycleId: number,
        public userId: number,
        public image: File,
        public time: string,
        public lat: number,
        public lon: number,
        public items?: RecycleItem[]
    ) { }
}