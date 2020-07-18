export class User {
    constructor(
        public userId: number,
        public name: string,
        public mail: string,
        public password: string,
        public point: number,
        public image: string,
    ) { }
}