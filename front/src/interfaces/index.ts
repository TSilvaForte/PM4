//Esto sale de la carpeta entities del back

export interface Product {
    id:number,
    name:string,
    description: string,
    price:number,
    stock:number,
    image:string,
    categoryId:number
}

export interface User {
    id:number,
    name:string,
    email:string,
    address:string,
    phone:string
}
