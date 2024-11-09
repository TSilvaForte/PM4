"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { Country, City, ICity } from "country-state-city";

const SupportForm = () => {
    const [formData, setFormData] = useState<{
        description: string;
        country: string;
        city: string;
        contactTime: string;
    }>({
        description: "",
        country: "",
        city: "",
        contactTime: "",
    });

    const [cities, setCities] = useState<ICity[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        if (name === "country") {
            setCities(City.getCitiesOfCountry(value) || []);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Muestra la alerta informativa con SweetAlert2
        Swal.fire({
            icon: "success",
            title: "Form Submitted",
            text: "Our support team will be in touch within the next 24 hours",
            confirmButtonText: "OK",
        });
        // Limpia los campos del formulario
        setFormData({
            description: "",
            country: "",
            city: "",
            contactTime: "",
        });
        setCities([]);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Ask for support</h2>

            <label htmlFor="description" className="block text-sm font-medium mb-1">What happened to your device?:</label>
            <textarea
                id="description"
                name="description"
                maxLength={180} // Cambiado a number
                value={formData.description}
                onChange={handleChange}
                placeholder="Max 180 characters"
                className="w-full p-2 mb-4 border rounded-md"
                required
            />

            <label htmlFor="country" className="block text-sm font-medium mb-1">Current localization:</label>
            <div className="flex gap-2 mb-4">
                <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-1/2 p-2 border rounded-md"
                    required
                >
                    <option value="">Select a country</option>
                    {Country.getAllCountries().map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>
                            {country.name}
                        </option>
                    ))}
                </select>
                <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-1/2 p-2 border rounded-md"
                    required
                >
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                        <option key={city.name} value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>

            <label htmlFor="contactTime" className="block text-sm font-medium mb-1">Preferred contact time:</label>
            <input
                type="time"
                id="contactTime"
                name="contactTime"
                value={formData.contactTime}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded-md"
                required
            />
            <div className="flex justify-center p-2">
            <button
                type="submit"
            >
                Submit
            </button>
            </div>
        </form>
    );
};

export default SupportForm;

