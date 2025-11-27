'use client';

import { useParams } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data (ideally this comes from an API or shared constant)
const allProducts = [
    {
        id: 1,
        name: 'Basic Tee',
        href: '/product/1',
        imageSrc: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
        category: 't-shirts'
    },
    {
        id: 2,
        name: 'Basic Tee',
        href: '/product/2',
        imageSrc: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        imageAlt: "Front of men's Basic Tee in white.",
        price: '$35',
        color: 'White',
        category: 't-shirts'
    },
    {
        id: 3,
        name: 'Nomad Tumbler',
        href: '/product/3',
        imageSrc: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        price: '$89',
        color: 'Green',
        category: 'accessories'
    },
    {
        id: 4,
        name: 'Artwork Tee',
        href: '/product/4',
        imageSrc: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        price: '$35',
        color: 'Iso Dots',
        category: 't-shirts'
    },
    {
        id: 5,
        name: 'Pullover Hoodie',
        href: '/product/5',
        imageSrc: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        imageAlt: 'Front of men\'s pullover hoodie.',
        price: '$55',
        color: 'Gray',
        category: 'hoodies'
    },
    {
        id: 6,
        name: 'Zip-up Jacket',
        href: '/product/6',
        imageSrc: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        imageAlt: 'Front of men\'s zip-up jacket.',
        price: '$75',
        color: 'Blue',
        category: 'jackets'
    }
];

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug as string;

    // Filter products based on category slug
    // Note: In a real app, you'd fetch from API with category filter
    const filteredProducts = allProducts.filter(product => product.category === slug);

    return (
        <div className="bg-white min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl capitalize">{slug.replace('-', ' ')}</h1>
                    <p className="mt-4 text-xl text-gray-500">
                        Browse our collection of {slug.replace('-', ' ')}.
                    </p>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="group relative">
                                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
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
                                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-gray-900">No products found in this category.</h2>
                        <p className="mt-4 text-gray-500">Try checking back later or browse other categories.</p>
                        <div className="mt-8">
                            <Link href="/shop">
                                <Button>View All Products</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
