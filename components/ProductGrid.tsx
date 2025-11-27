'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

interface ProductGridProps {
    selectedCategory?: string;
}

const ProductGrid = ({ selectedCategory = 'All' }: ProductGridProps) => {
    const products = useSelector((state: RootState) => state.productStore.products);

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory || product.category?.toLowerCase() === selectedCategory.toLowerCase());

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                    {selectedCategory === 'All' ? 'Featured Products' : `${selectedCategory}`}
                </h2>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No products found in this category.</p>
                    </div>
                ) : (
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                className="group relative"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="w-full h-80 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.name}
                                        className="w-full h-full object-center object-cover"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <Link href={`/product/${product.id}`}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.name}
                                            </Link>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">${product.price}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {selectedCategory === 'All' && (
                    <div className="mt-12 text-center">
                        <Link href="/shop" className="inline-block bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700">
                            View All Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductGrid;
