"use client";

import { useState } from 'react';
import {
    validateEmail,
    validateNameAndAddress,
    validatePhone,
    validateNewPassword,
    validateRepeatPassword
} from "@/helpers/validation"; 

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        password: '',
        repeatPassword: '',
        terms: false,
    });

    const [errors, setErrors] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (type !== 'checkbox') {
            const error = validateInput(name, value);
            setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
        }
    };

    const validateInput = (name: string, value: string) => {
        switch (name) {
            case 'name':
                return validateNameAndAddress(value);
            case 'address':
                return validateNameAndAddress(value);
            case 'phone':
                return validatePhone(value);
            case 'email':
                return validateEmail(value);
            case 'password':
                return validateNewPassword(value);
            case 'repeatPassword':
                return validateRepeatPassword(formData.password, value);
            default:
                return '';
        }
    };

    const isFormValid = () => {
        return Object.values(errors).every(error => error === '') && formData.terms;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = {
            name: validateNameAndAddress(formData.name),
            address: validateNameAndAddress(formData.address),
            phone: validatePhone(formData.phone),
            email: validateEmail(formData.email),
            password: validateNewPassword(formData.password),
            repeatPassword: validateRepeatPassword(formData.password, formData.repeatPassword),
        };
        setErrors(newErrors);

        if (isFormValid()) {
            // Aquí iría la lógica para registrar la cuenta
            // Por ejemplo, enviar una solicitud POST a tu API
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    throw new Error('Registration failed');
                }

                console.log('Form submitted', formData);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 w-2/3 mx-auto" onSubmit={handleSubmit}>
            <div>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-md font-medium text-white">Name and Surname</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        value={formData.name} 
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-primary text-sm rounded-lg block w-[21rem] p-2.5" 
                        placeholder="Name and Surname" 
                        required 
                    />
                    <p className={`text-red-500 text-xs mt-1 ${errors.name ? '' : 'invisible'}`} style={{ minHeight: '1rem' }}>
                        {errors.name}
                    </p>
                </div>
                <div className="mb-5">
                    <label htmlFor="address" className="block mb-2 text-md font-medium text-white">Address</label>
                    <input 
                        type="text" 
                        name="address" 
                        id="address" 
                        value={formData.address} 
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-primary text-sm rounded-lg block w-[21rem] p-2.5" 
                        placeholder="Your address" 
                        required 
                    />
                    <p className={`text-red-500 text-xs mt-1 ${errors.address ? '' : 'invisible'}`} style={{ minHeight: '1rem' }}>
                        {errors.address}
                    </p>
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 text-md font-medium text-white">Phone</label>
                    <input 
                        type="tel" 
                        name="phone" 
                        id="phone" 
                        value={formData.phone} 
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-primary text-sm rounded-lg block w-[21rem] p-2.5" 
                        placeholder="Your phone number" 
                        required 
                    />
                    <p className={`text-red-500 text-xs mt-1 ${errors.phone ? '' : 'invisible'}`} style={{ minHeight: '1rem' }}>
                        {errors.phone}
                    </p>
                </div>
            </div>

            <div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-md font-medium text-white">Your email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-primary text-sm rounded-lg block w-[21rem] p-2.5" 
                        placeholder="name@flowbite.com" 
                        required 
                    />
                    <p className={`text-red-500 text-xs mt-1 ${errors.email ? '' : 'invisible'}`} style={{ minHeight: '1rem' }}>
                        {errors.email}
                    </p>
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-md font-medium text-white">Your password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        value={formData.password} 
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-primary text-sm rounded-lg block w-[21rem] p-2.5" 
                        required 
                    />
                    <p className={`text-red-500 text-xs mt-1 ${errors.password ? '' : 'invisible'}`} style={{ minHeight: '1rem' }}>
                        {errors.password}
                    </p>
                </div>
                <div className="mb-5">
                    <label htmlFor="repeatPassword" className="block mb-2 text-md font-medium text-white">Repeat password</label>
                    <input 
                        type="password" 
                        name="repeatPassword" 
                        id="repeatPassword" 
                        value={formData.repeatPassword} 
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-primary text-sm rounded-lg block w-[21rem] p-2.5" 
                        required 
                    />
                    <p className={`text-red-500 text-xs mt-1 ${errors.repeatPassword ? '' : 'invisible'}`} style={{ minHeight: '1rem' }}>
                        {errors.repeatPassword}
                    </p>
                </div>
            </div>

            <div className="col-span-2 flex items-center justify-center mb-2">
                <input 
                    id="terms" 
                    name="terms" 
                    type="checkbox" 
                    checked={formData.terms}
                    onChange={handleChange}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 accent-tertiary focus:ring-3 focus:ring-blue-300" 
                    required 
                />
                <label htmlFor="terms" className="ms-2 text-sm font-medium text-white">
                    I agree with the <a href="#" className="text-tertiary hover:underline">terms and conditions</a>
                </label>
            </div>

            <div className="col-span-2 flex justify-center">
                <button 
                    type="submit" 
                    className={`text-white bg-tertiary rounded p-2 ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    disabled={!isFormValid()}
                >
                    Register new account
                </button>
            </div>
        </form>
    );
}

export default RegisterForm;



