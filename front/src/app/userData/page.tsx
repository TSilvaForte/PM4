"use client";
import React from 'react'
import { AuthContext } from "../../../context/authContext";
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const page = () => {
    const { user } = useContext(AuthContext); 
    const router = useRouter();

    useEffect(() => {
        if (!user) {
          router.push('/login');
        }
      }, []);

  return (
    <div>
        <h1>My Shipping Data</h1>
    </div>
  )
}

export default page