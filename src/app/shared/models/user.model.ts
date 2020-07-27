import { IUser } from "../interfaces/user.interface";

export class User implements IUser {
    constructor(
        public id: number,
        public username: string,
        public email: string,
        public password: any
    ) { }
}