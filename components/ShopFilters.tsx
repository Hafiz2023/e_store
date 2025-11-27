'use client';

import { Button } from '@/components/ui/button';

const categories = ['All', 'T-Shirts', 'Hoodies', 'Jackets', 'Accessories'];

interface ShopFiltersProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const ShopFilters = ({ selectedCategory, onSelectCategory }: ShopFiltersProps) => {
    return (
        <div className="bg-gray-50 p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
            <div className="flex flex-row lg:flex-col flex-wrap gap-2">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'ghost'}
                        onClick={() => onSelectCategory(category)}
                        className={`justify-center lg:justify-start w-auto lg:w-full ${selectedCategory === category
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                    >
                        {category}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default ShopFilters;
