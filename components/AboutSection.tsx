'use client';

import { Truck, ShieldCheck, Headphones, RefreshCw } from 'lucide-react';

const features = [
    {
        name: 'Free Shipping',
        description: 'On all orders over $50',
        icon: Truck,
    },
    {
        name: 'Secure Payment',
        description: '100% secure payment',
        icon: ShieldCheck,
    },
    {
        name: '24/7 Support',
        description: 'Dedicated support',
        icon: Headphones,
    },
    {
        name: 'Easy Returns',
        description: '30 day return policy',
        icon: RefreshCw,
    },
];

const AboutSection = () => {
    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Why Choose Us
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                        We are committed to providing the best shopping experience with premium quality products and exceptional customer service.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
                    {features.map((feature) => (
                        <div key={feature.name} className="text-center group">
                            <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 pt-8 hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="-mt-12">
                                    <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-md shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                                    </div>
                                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                                    <p className="mt-5 text-base text-gray-500">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
