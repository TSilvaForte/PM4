"use client";
import { ChangeEvent, FormEvent, useState, useEffect, useContext } from "react";
import { validateEmail, validatePassword } from "@/helpers/validation";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { AuthContext } from "../../../context/authContext";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [touched, setTouched] = useState({ email: false, password: false });
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const {setUser}=useContext(AuthContext);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData(prevData => ({
            ...prevData,
            [name]: value
        }));

        if (name === "email") {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: validateEmail(value)
            }));
        } else if (name === "password") {
            setErrors(prevErrors => ({
                ...prevErrors,
                password: validatePassword(value)
            }));
        }
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched(prevTouched => ({
            ...prevTouched,
            [name]: true
        }));
    };

    useEffect(() => {
        const isValid = !errors.email && !errors.password && touched.email && touched.password;
        setIsSubmitDisabled(!isValid);
    }, [errors, touched]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            // console.log(response);
            if (!response.ok) {
                throw new Error('Login failed');
            }
            const userData = await response.json();  
            setUser(userData);  

            Swal.fire({
                icon: 'success',
                title: 'User logged in successfully!',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
              router.push('/')  
            });

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Login failed. Please try again.'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-md font-medium">
                    Your email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className={`bg-gray-50 border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'} text-primary text-sm rounded-lg block w-[350px] p-2.5`}
                    placeholder="name@fulltechno.com"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={data.email}
                />
                <div className="min-h-[20px]">
                    {touched.email && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium">
                    Your password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className={`bg-gray-50 border ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'} text-primary text-sm rounded-lg block w-full p-2.5`}
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={data.password}
                />
                <div className="min-h-[20px]">
                    {touched.password && errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
            </div>
            <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                    <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 accent-tertiary focus:ring-tertiary"
                        required
                    />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium">
                    I am not a robot
                </label>
            </div>
            <button
                type="submit"
                className={`${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={isSubmitDisabled}
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;


