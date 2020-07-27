import { IBlog } from "../interfaces/blog.interface";

export class Blog implements IBlog {
    constructor(
        public id: number,
        public postedBy: string,
        public topic: string,
        public message: string,
        public date: any
    ) { }
}