'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Check, Truck, RotateCcw } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/app/store/reducer/cartReducer';
import { RootState } from '@/app/store/store';
import { toast } from 'sonner';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function ProductPage() {
    const params = useParams();
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.productStore.products);

    // Find product by ID
    const product = products.find(p => p.id === Number(params.id) || p.id === String(params.id));

    const [selectedColor, setSelectedColor] = useState<{ name: string; class: string; selectedClass: string } | null>(null);
    const [selectedSize, setSelectedSize] = useState<{ name: string; inStock: boolean } | null>(null);
    const [mainImage, setMainImage] = useState('');

    // Initialize state when product is found
    useEffect(() => {
        if (product) {
            setMainImage(product.imageSrc);
            // Mocking colors/sizes if not in product object, or using defaults
            // In a real app, these would come from the product object
            setSelectedColor({ name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' });
            setSelectedSize({ name: 'M', inStock: true });
        }
    }, [product]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
            </div>
        );
    }

    // Mock data for details not in the simple product model
    const productDetails = {
        images: [
            product.imageSrc,
            'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        ],
        colors: [
            { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
            { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
            { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        ],
        sizes: [
            { name: 'XS', inStock: true },
            { name: 'S', inStock: true },
            { name: 'M', inStock: true },
            { name: 'L', inStock: true },
            { name: 'XL', inStock: true },
        ],
        description: product.description || 'The Basic Tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit.',
        details: [
            'Only the best materials',
            'Ethically sourced',
            'Pre-washed and pre-shrunk',
            'Machine wash cold with like colors',
        ],
        reviews: { href: '#reviews', average: 4, totalCount: 117 },
    };

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: Number(product.id),
            name: product.name,
            price: product.price,
            imageSrc: mainImage,
            color: selectedColor?.name,
            size: selectedSize?.name,
            quantity: 1,
        }));
        toast.success('Added to cart successfully!');
    };

    return (
        <div className="bg-white">
            <div className="pt-6">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li>
                            <div className="flex items-center">
                                <a href="/" className="mr-2 text-sm font-medium text-gray-900">
                                    Home
                                </a>
                                <svg width={16} height={20} viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-5 text-gray-300">
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <a href="/shop" className="mr-2 text-sm font-medium text-gray-900">
                                    Shop
                                </a>
                                <svg width={16} height={20} viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-5 text-gray-300">
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>
                        <li className="text-sm">
                            <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {product.name}
                            </a>
                        </li>
                    </ol>
                </nav>

                {/* Image gallery */}
                <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
                    <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full h-full object-center object-cover"
                        />
                    </div>
                    <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4 mt-4 lg:mt-0 lg:col-span-2 lg:col-start-1 lg:row-start-2">
                        {productDetails.images.map((image, idx) => (
                            <button key={idx} onClick={() => setMainImage(image)} className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50">
                                <img src={image} alt="" className="absolute inset-0 w-full h-full object-center object-cover rounded-md" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product info */}
                <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:mt-0 lg:row-span-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl text-gray-900">${product.price}</p>

                        {/* Reviews */}
                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <Star
                                            key={rating}
                                            className={classNames(
                                                productDetails.reviews.average > rating ? 'text-yellow-400 fill-current' : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{productDetails.reviews.average} out of 5 stars</p>
                                <a href={productDetails.reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    {productDetails.reviews.totalCount} reviews
                                </a>
                            </div>
                        </div>

                        <form className="mt-10">
                            {/* Colors */}
                            <div>
                                <h3 className="text-sm text-gray-900 font-medium">Color</h3>
                                <div className="mt-4 flex items-center space-x-3">
                                    {productDetails.colors.map((color) => (
                                        <div
                                            key={color.name}
                                            onClick={() => setSelectedColor(color)}
                                            className={classNames(
                                                color.selectedClass,
                                                selectedColor?.name === color.name ? 'ring ring-offset-1' : '',
                                                'relative -m-0.5 p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                            )}
                                        >
                                            <span className="sr-only">{color.name}</span>
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    color.class,
                                                    'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                                )}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sizes */}
                            <div className="mt-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm text-gray-900 font-medium">Size</h3>
                                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        Size guide
                                    </a>
                                </div>

                                <div className="mt-4 grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                    {productDetails.sizes.map((size) => (
                                        <div
                                            key={size.name}
                                            onClick={() => size.inStock && setSelectedSize(size)}
                                            className={classNames(
                                                size.inStock
                                                    ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                                    : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                                selectedSize?.name === size.name ? 'ring-2 ring-indigo-500' : '',
                                                'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                            )}
                                        >
                                            <span>{size.name}</span>
                                            {size.inStock ? (
                                                <span
                                                    className={classNames(
                                                        selectedSize?.name === size.name ? 'border-indigo-500' : 'border-transparent',
                                                        'absolute -inset-px rounded-md pointer-events-none'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <span
                                                    aria-hidden="true"
                                                    className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                                                >
                                                    <svg
                                                        className="absolute inset-0 h-full w-full text-gray-200 stroke-2"
                                                        viewBox="0 0 100 100"
                                                        preserveAspectRatio="none"
                                                        stroke="currentColor"
                                                    >
                                                        <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                    </svg>
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button
                                type="button"
                                onClick={handleAddToCart}
                                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <ShoppingCart className="mr-2 h-5 w-5" /> Add to bag
                            </Button>
                        </form>

                        <div className="mt-6 text-sm text-gray-500 space-y-2">
                            <div className="flex items-center">
                                <Check className="h-5 w-5 text-green-500 mr-2" />
                                <span>In stock and ready to ship</span>
                            </div>
                            <div className="flex items-center">
                                <Truck className="h-5 w-5 text-gray-400 mr-2" />
                                <span>Free shipping on orders over $50</span>
                            </div>
                            <div className="flex items-center">
                                <RotateCcw className="h-5 w-5 text-gray-400 mr-2" />
                                <span>Free returns within 7 days</span>
                            </div>
                        </div>
                    </div>

                    <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{productDetails.description}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                            <div className="mt-4">
                                <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                                    {productDetails.details.map((highlight) => (
                                        <li key={highlight} className="text-gray-400">
                                            <span className="text-gray-600">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Customer Reviews Section */}
                        <div id="reviews" className="mt-10 border-t pt-10">
                            <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">JD</div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-sm font-bold text-gray-900">John Doe</h4>
                                        <div className="flex items-center mt-1">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <Star key={rating} className="text-yellow-400 fill-current h-4 w-4" />
                                            ))}
                                        </div>
                                        <p className="mt-2 text-sm text-gray-600">Great quality t-shirt! Fits perfectly and feels very comfortable.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">AS</div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-sm font-bold text-gray-900">Alice Smith</h4>
                                        <div className="flex items-center mt-1">
                                            {[0, 1, 2, 3].map((rating) => (
                                                <Star key={rating} className="text-yellow-400 fill-current h-4 w-4" />
                                            ))}
                                            <Star className="text-gray-300 h-4 w-4" />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-600">Nice fabric, but the size runs a bit small. Order one size up.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
