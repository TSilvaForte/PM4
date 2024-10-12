import React from 'react';
import Card from '@/components/Card/Card';
import { productsMock } from '../mocks/products';

const Products = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productsMock.map((product, i) => (
        <Card key={i} {...product} />
      ))}
    </div>
  )
}

export default Products;