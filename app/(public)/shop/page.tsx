'use client';

import { useState } from 'react';
import ProductGrid from '@/components/ProductGrid';
import ShopFilters from '@/components/ShopFilters';

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');

    return (
        <div className="bg-white min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Shop Our Collection</h1>
                    <p className="mt-4 text-xl text-gray-500">
                        Explore our wide range of premium products.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="sticky top-24">
                            <ShopFilters selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
                        </div>
                    </aside>

                    <div className="flex-1 w-full">
                        <ProductGrid selectedCategory={selectedCategory} />
                    </div>
                </div>
            </div>
        </div>
    );
}
