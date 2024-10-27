import Card from '@/components/Card/Card';
import React from 'react';
import Hero from '@/components/Hero/Hero';
import { getFeaturedProducts } from '@/services/products';
import { Product } from '@/interfaces';

//El page es como si fuera el index de nuestros proyectos anteriores, en este caso es la landing
const Page = async (): Promise<React.JSX.Element> => {
  let  products: Product[] = [];
  try{
    products = await getFeaturedProducts();
  } catch (error) {
    console.error ("Error loading products:", error);
  }

  return (
    <div>
      <Hero/>
      <div className= "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 m-14 gap-8 justify-center">
      {products.length? (
        products.map((product, i) => <Card key={i} {...product} />)
      ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Page;