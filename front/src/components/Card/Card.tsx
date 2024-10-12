import { Product } from "@/interfaces";
interface CardProps extends Product{};

const Card = ({name, image, price}:CardProps) => {
    return (
        <article className="max-w-sm rounded overflow-hidden shadow-lg p-4" style={{ backgroundColor: 'var(--secondary-color)' }}>
        <img className="w-full h-48 object-cover" src={image} alt={name} />
        <h3 className="text-xl font-bold mt-2">{name}</h3>
        <p className="text-white text-base mt-1">USD {price}</p>
    </article>
    ) 
}

export default Card;