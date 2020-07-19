export class Rating {
    constructor(
        public ratingId: number,
        public recycleId: number,
        public userId: number,
        public good: number,
        public bad: number) {
    }
}