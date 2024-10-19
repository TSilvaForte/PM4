import Card from '@/components/Card/Card';
import React from 'react';
import Hero from '@/components/Hero/Hero';
import { getFeaturedProducts } from '@/service/products';

//El page es como si fuera el index de nuestros proyectos anteriores, en este caso es la landing
const Page = async() => {
  const  products = await getFeaturedProducts();
  return (
    <div>
      <Hero/>
      <div className= "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 m-14 gap-8 justify-center">
      {products.map((product, i) => (
        <Card key={i} {...product} />
      ))}
      </div>
    </div>
  )
}

export default Page;