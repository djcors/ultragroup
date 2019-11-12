export class BookingModel {
    constructor(
        public room?:number,
        public emergency_name?:string,
        public emergency_phone?:string,
        public tax?:number,
        public base_price?:number,
        public total_imported?:number,
        public confirmed?:boolean,
        public date?:string,
        public total_pax?:number,
        public arrival?:string,
        public deperture?: string,
        public id?:number
    ){}
}