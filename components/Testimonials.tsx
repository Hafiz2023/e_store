'use client';

import { Star } from 'lucide-react';

const reviews = [
    {
        id: 1,
        name: 'Sarah Johnson',
        rating: 5,
        review: 'Absolutely love the quality of the clothes! The fabric is soft and durable. Will definitely shop here again.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 2,
        name: 'Michael Chen',
        rating: 5,
        review: 'Fast shipping and great customer service. The sizing guide was spot on. Highly recommended!',
        image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 3,
        name: 'Emily Davis',
        rating: 4,
        review: 'Great selection of trendy items. I bought a jacket and it fits perfectly. Good value for money.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
];

const Testimonials = () => {
    return (
        <section className="bg-gray-50 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        What Our Customers Say
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Don't just take our word for it. Read reviews from our satisfied customers.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-xl shadow-md overflow-hidden p-8 transition-transform duration-300 hover:-translate-y-2">
                            <div className="flex items-center mb-6">
                                <img
                                    className="h-12 w-12 rounded-full object-cover mr-4"
                                    src={review.image}
                                    alt={review.name}
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{review.name}</h3>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"{review.review}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
