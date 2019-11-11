export class Hotel {
    constructor(
        public name:string,
        public code:string,
        public agency:any,
        public category:number,
        public active: boolean,
        public id?: number
    ){}
}