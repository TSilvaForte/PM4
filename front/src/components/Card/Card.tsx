import Link from "next/link"; 
import { Product } from "@/interfaces";
import { FaShoppingCart } from "react-icons/fa"; 

interface CardProps extends Product {}

const Card = ({ id, name, image, price }: CardProps) => {
    return (
        <article className="w-full max-w-sm shadow-xl border border-secondary rounded-lg transition-transform duration-200 transform hover:scale-105 justify-between">
            <Link href={`/products/${id}`}>
                <img className="p-4 rounded-t-md" src={image} alt={name} />
            </Link>
            <div className="flex flex-col items-center h-full p-5">
                <h2 className="text-xl font-semibold text-center tracking-tight text-text">{name}</h2>
                <span className="text-3xl font-bold text-text mt-2">${price}</span>
                <Link href={`/cart`} className="bg-secondary hover:bg-tertiary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white flex items-center mt-4">
                    <FaShoppingCart className="mr-2" />
                    Add to cart
                </Link>
            </div>

        </article>
    );
}

export default Card;









