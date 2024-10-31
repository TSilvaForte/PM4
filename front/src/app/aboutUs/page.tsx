import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <section className="container mx-auto my-14 p-6 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold text-center mb-6 text-text">About Us</h2>
            <p className="text-lg text-text mb-4">
                Welcome to our e-commerce store, where quality meets convenience. 
                Our mission is to provide you with the best products available online 
                at competitive prices. We believe that shopping should be an enjoyable 
                experience, and we are dedicated to ensuring that you find exactly what 
                you're looking for.
            </p>
            <p className="text-lg text-text mb-4">
                Our team consists of passionate individuals who work tirelessly to curate 
                a diverse selection of products. We strive to bring you innovative solutions that enhance your 
                life.
            </p>
            <p className="text-lg text-text mb-4">
                Customer satisfaction is our top priority. We are committed to providing 
                exceptional service and support to ensure your shopping experience is 
                smooth and enjoyable, no matter where you are located. If you have any questions or need assistance, 
                our friendly customer service team is always here to help.
            </p>
            <p className="text-lg text-text">
                Thank you for choosing us as your shopping destination. We look forward 
                to serving you!
            </p>
        </section>
    );
};

export default AboutUs;
