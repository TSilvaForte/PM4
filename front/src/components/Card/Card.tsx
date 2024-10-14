import Link from "next/link"; // Asegúrate de importar el componente Link
import { Product } from "@/interfaces";
import { FaShoppingCart } from "react-icons/fa"; // Asegúrate de tener react-icons instalado

interface CardProps extends Product {}

const Card = ({ id, name, image, price }: CardProps) => {
    return (
        <article className="max-w-sm rounded overflow-hidden shadow-xl p-2 transition-transform duration-200 transform hover:scale-105"> {/* Sombra aumentada */}
            <Link href={`/products/${id}`}>
                <div>
                  <img className="w-full object-cover" src={image} alt={name} />  
                </div>
                {/* Contenedor dividido en dos columnas */}
                <div className="grid grid-cols-2 items-center p-4 gap-4">
                  {/* Columna izquierda: nombre y precio */}
                  <div>
                    <h3 className="text-text text-xl font-[var(--font-primary)]">{name}</h3>
                    <p className="text-text text-base mt-1">USD {price}</p> 
                  </div>
                  {/* Columna derecha: botón centrado */}
                  <div className="flex justify-center">
                    <button className="flex items-center bg-tertiary text-white rounded-md py-1 px-2 hover:bg-secondary transition-colors duration-300">
                      <FaShoppingCart className="mr-1" /> {/* Icono del carrito */}
                      Add to Cart
                    </button>
                  </div>
                </div>
            </Link>
        </article>
    );
}

export default Card;





