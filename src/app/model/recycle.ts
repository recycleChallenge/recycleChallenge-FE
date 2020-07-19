import { Rating } from './rating';
import { RecycleItem } from './recycle-item';
import { User } from './user';
export class Recycle {
    constructor(
        public recycleId: number,
        public userId: number | User,
        public image: File,
        public time: string,
        public lat: number,
        public lon: number,
        public items?: RecycleItem[],
        public rating?: Rating
    ) { }
}