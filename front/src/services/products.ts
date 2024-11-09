import { productsMock } from "@/app/mocks/products";
import { Product } from "@/interfaces";

const ffProductsMock = process.env.FF_PRODUCTS_MOCK || false;
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const getProducts = async (): Promise<Product[]> => {
    let fetchFailed = false;

    try {
        const res = await fetch(apiUrl + "/products", {
            headers: {
                'Cache-Control': 'no-store', 
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            fetchFailed = true;
        } else {
            const data = await res.json();
            return data;  // Devolver productos del backend
        }
    } catch (error) {
        console.log(error)
        fetchFailed = true;
    }

    // Si la solicitud falló y el mock está habilitado, retornamos los productos mock
    if (fetchFailed && ffProductsMock) {
        return productsMock;
    }

    return fetchFailed ? productsMock : [];
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
    const res = await getProducts();
    const featured = res.slice(0, 3);
    return featured;
};

export const getProductById = async (id:number): Promise <Product> => {
    const res = await getProducts();
    const product = res.filter((p) => p.id === id) [0];
    return product;
}