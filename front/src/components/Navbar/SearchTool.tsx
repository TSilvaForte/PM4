import React, { useState, useEffect } from 'react';
import { getProducts } from '@/services/products';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { Product } from '@/interfaces';
import debounce from 'lodash.debounce';

const SearchTool = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el valor del campo de entrada
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const router = useRouter();

  // Cargar todos los productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProductsData(products);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Filtrar productos en función del término de búsqueda con debounce para mejor rendimiento
  const handleSearchChange = debounce((value: string) => {
    setSearchTerm(value); // Actualiza el estado del campo de entrada
    if (value.length > 1) {
      const filtered = productsData.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, 100); // 300ms debounce delay

  const handleProductClick = (productId: number) => {
    setFilteredProducts([]); // Limpia las sugerencias
    setSearchTerm(''); // Limpia el campo de entrada
    router.push(`/products/${productId}`); // Redirecciona al producto seleccionado
  };

  return (
    <div className="relative">
      <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600" />
      <input
        type="text"
        placeholder="Type to search"
        className="pl-10 h-10 rounded-full bg-primary text-white outline-none placeholder:text-white"
        value={searchTerm} // Conecta el valor del input al estado searchTerm
        onChange={(e) => handleSearchChange(e.target.value)}
        aria-label="Search for products"
      />
      {(filteredProducts.length > 0 || searchTerm.length > 1) && (
        <ul
          className="absolute top-12 left-0 w-full bg-secondary text-text rounded-lg shadow-lg max-h-60 overflow-y-auto"
          role="listbox"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li
                key={product.id}
                className="p-2 hover:bg-tertiary cursor-pointer"
                onClick={() => handleProductClick(product.id)}
                role="option"
              >
                {product.name}
              </li>
            ))
          ) : (
            <li className="p-2 text-center text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchTool;



/* const [search, setSearch] = useState (""); //Este estado hace la búsqueda
const [filteredData, setFilteredData]= useState([]); //este estado carga los datos
// Ahora definimos el método que va a recibir el evento
const handleSearch = e => {
    setSearch(e.target.value)
    if (search.length>1) {
    const filterValues = data.filter(q=> {
        const qName=q.name.toLowerCase();
        const qResult = e.target.value.toLowerCase();
        if (qName.includes(qResult)){
            return true
        }
        return false
    })
    setFilteredData(filterValues)
}
}

useEffect(() => {
setFilteredData(data)}, [])

<input type="text" value={search} onChange={setSearch}/>
 */