import Link from "next/link";
import { FaInfoCircle } from "react-icons/fa";
import { Image } from "@nextui-org/react";

interface CardProps {
    id: number;
    name: string;
    image: string;
    price: number;
}

const Card: React.FC<CardProps> = ({ id, name, image, price }) => {
    return (
        <article className="w-full max-w-sm shadow-xl border border-secondary rounded-lg transition-transform duration-200 transform hover:scale-105 justify-between">
            <Link href={`/products/${id}`}>
            <div className="relative w-full h-64 p-4">
                    <Image
                        src={image}
                        alt={name}
                        style={{ objectFit: "cover" }} 
                        className="rounded-t-md" 
                    />
                </div>
            </Link>
            <div className="flex flex-col items-center p-5">
                <h2 className="text-xl font-semibold text-center tracking-tight">{name}</h2>
                <span className="text-3xl font-bold mt-2">${price}</span>
                <Link href={`/products/${id}`} aria-label="Check this product" className="bg-secondary hover:bg-tertiary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center text-text flex items-center mt-4">
                    <FaInfoCircle className="mr-2" />
                    Get more details
                </Link>
            </div>
        </article>
    );
}

export default Card;









