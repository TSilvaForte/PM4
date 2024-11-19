"use client";
import React, { useState, useEffect } from 'react';
import Card from '@/components/Card/Card';
import { getProducts } from '@/services/products';
import { Product } from '@/interfaces';

const Products = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>('default');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); 
        setProductsData(data);
        setSortedProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSort = (criteria: string) => {
    let sorted: Product[] = [...productsData];

    if (criteria === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (criteria === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === 'default') {
      sorted = [...productsData];
    }

    setSortCriteria(criteria);
    setSortedProducts(sorted);
  };

  return (
    <div className="min-h-[70vh]">
    <div className="flex justify-start mb-6">
      <select
        className="border rounded px-4 py-2 bg-secondary text-text hover:bg-tertiary"
        value={sortCriteria}
        onChange={(e) => handleSort(e.target.value)} 
      >
        <option value="default">Sort by</option>
        <option value="price">Sort by Price</option>
        <option value="name">Sort by Name</option>
      </select>
    </div>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
        {productsData.length > 0 ? (
          sortedProducts.map((product, i) => <Card key={i} {...product} />)
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Products;

