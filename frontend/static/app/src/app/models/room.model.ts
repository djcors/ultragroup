export class Room {
    constructor(
        public name:string,
        public code:string,
        public hotel:any,
        public base_price:number,
        public tax:number,
        public active: boolean,
        public location:string,
        public room_type:string,
        public id?: number,
        public hotel_display?:string
    ){}
}