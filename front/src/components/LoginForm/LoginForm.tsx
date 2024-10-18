"use client";
import { ChangeEvent, FormEvent, useState, useEffect, useCallback } from "react";
import { validateEmail, validatePassword } from "@/helpers/validation";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [touched, setTouched] = useState({ email: false, password: false });
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }, []);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({ ...prevData, [event.target.name]: event.target.value }));

        // Validar en tiempo real al cambiar los datos
        if (event.target.name === "email") {
            setErrors((prevErrors) => ({ ...prevErrors, email: validateEmail(event.target.value) }));
        } else if (event.target.name === "password") {
            setErrors((prevErrors) => ({ ...prevErrors, password: validatePassword(event.target.value) }));
        }
    }, []);

    const handleBlur = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTouched((prevTouched) => ({ ...prevTouched, [event.target.name]: true }));
    }, []);

    useEffect(() => {
        const isValid = !errors.email && !errors.password && touched.email && touched.password;
        setIsSubmitDisabled(!isValid);
    }, [errors, touched]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-md font-medium text-white">
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
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">
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
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-white">
                    Remember me
                </label>
            </div>
            <button
                type="submit"
                className={`text-white bg-tertiary rounded p-2 ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={isSubmitDisabled}>
                Submit
            </button>
        </form>
    );
};

export default LoginForm;

