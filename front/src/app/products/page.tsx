import React from 'react';
import Card from '@/components/Card/Card';
import { getProducts } from '@/services/products';
import { Product } from '@/interfaces';

const Products = async () => {
  let productsData: Product[] = [];
  try {
    productsData = await getProducts();
  } catch(error) {
    console.error("Error loading products:", error);
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
      {productsData.length > 0 ? (
        productsData.map((product, i) => (
          <Card key={i} {...product} />
        ))
      ) : (
        <p>No products available</p> 
      )}
    </div>
  );
};

export default Products;

