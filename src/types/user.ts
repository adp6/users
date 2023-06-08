export interface User{
    id:number,
    username:string,
    name:string,
    email:string,
    address:Address,
    phone:string,
    website:string,
    company:Company,
    photo:string,
    geo:Geo
    [key: string]: string | number | Company | Address | Geo
}
export interface Geo{
    lat:number,
    lng:number
}
export interface Company{
    name:string,
    catchPhrase:string,
    bs:string
}
export interface Address{
    street:string,
    suite:string,
    city:string,
    geo:{
        lat:string,
        lng:string
    }
}
