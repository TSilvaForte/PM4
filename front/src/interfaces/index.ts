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

export interface UserRegister {
    name: string,
    email: string,
    password: string,
    address: string,
    phone: string,
}

export interface UserLogin {
    email: string,
    password: string,
}

export interface UserSession {
    login:boolean,
    user: UserSessionData,
    token:string
}

export interface UserSessionData {
    id: number,
    name: string,
    email: string,
    address: string,
    phone: string,
    role: string,
    credential: Credential,
    orders: Order[]
}

export interface Order {
    id: number,
    status: string,
    date: string
}
