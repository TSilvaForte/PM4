"use client"; 

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/swiper-bundle.css"; 

const Hero = () => {
  return (
    <div className="relative h-[60vh]">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        style={{ height: "100%" }}
      >
        <SwiperSlide
          className="relative h-full flex items-center justify-center text-center bg-gradient-to-r"
          style={{ background: `linear-gradient(to right, #02AFD1, #6B56A4)` }}
        >
          <div className="p-8">
            <h1 className="text-5xl font-bold mb-4">Free Delivery!</h1>
            <p className="text-3xl">Enjoy free delivery on all orders above $500</p>
            <div className="absolute top-12 left-0 w-full h-auto z-10">
              <Image
                src="/phones.png"
                alt="Smartphones displayed"
                layout="responsive"
                width={800} 
                height={400}
                className="object-cover"
                priority 
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide
          className="relative h-full flex items-center justify-center text-center"
          style={{
            backgroundImage: "url('/background-slice.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="p-8 relative z-10">
            <h1 className="text-4xl font-bold m-8">Guaranteed Store</h1>
            <p className="text-3xl mb-4">Upgrade your tech gear today</p>
            <p className="text-3xl mb-4">We guarantee the best worldwide service</p>
            <p className="text-3xl">Lifetime, everywhere</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;






