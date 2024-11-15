"use client"
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import SupportForm from '@/components/SupportForm/SupportForm';

const Support = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      {user ? (
        <SupportForm />
      ) : (
        <p className="text-center text-xl">
          Please log in to request support
        </p>
      )}
    </div>
  );
};

export default Support;