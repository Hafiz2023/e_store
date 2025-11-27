'use client';

import { Truck, RotateCcw, Headset, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        name: 'Free Shipping',
        description: 'On all orders over $50',
        icon: Truck,
    },
    {
        name: '7-Days Returns',
        description: 'Money back guarantee',
        icon: RotateCcw,
    },
    {
        name: '24/7 Support',
        description: 'Contact us anytime',
        icon: Headset,
    },
    {
        name: 'Secure Payment',
        description: '100% secure payment',
        icon: ShieldCheck,
    },
];

const FeatureSection = () => {
    return (
        <div className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 gap-x-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.name}
                            className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className="flex-shrink-0">
                                <feature.icon className="h-8 w-8 text-indigo-600" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                                <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeatureSection;
