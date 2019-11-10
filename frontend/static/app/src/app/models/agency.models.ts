export class Agency {
    constructor(
        public username:string,
        public email?:string,
        public password?:string,
        public id?:number,
        public token?: string
    ){}
}