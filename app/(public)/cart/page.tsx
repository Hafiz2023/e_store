'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/store';
import { Button } from '@/components/ui/button';
import { removeFromCart, clearCart } from '@/app/store/reducer/cartReducer';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
    const cartItems = useSelector((state: RootState) => state.cartStore.items);
    const dispatch = useDispatch();

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900">Your cart is empty</h2>
                <p className="mt-2 text-gray-600">Looks like you haven't added anything to your cart yet.</p>
                <Link href="/shop" className="mt-6">
                    <Button>Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    <section className="lg:col-span-7">
                        <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                            {cartItems.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex py-6 sm:py-10">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={item.imageSrc}
                                            alt={item.name}
                                            className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                                        />
                                    </div>

                                    <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm">
                                                        <Link href={`/product/${item.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                                                            {item.name}
                                                        </Link>
                                                    </h3>
                                                </div>
                                                <div className="mt-1 flex text-sm">
                                                    <p className="text-gray-500">{item.color}</p>
                                                    {item.size && (
                                                        <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">{item.size}</p>
                                                    )}
                                                </div>
                                                <p className="mt-1 text-sm font-medium text-gray-900">${item.price}</p>
                                            </div>

                                            <div className="mt-4 sm:mt-0 sm:pr-9">
                                                <label htmlFor={`quantity-${itemIdx}`} className="sr-only">
                                                    Quantity, {item.name}
                                                </label>
                                                <p className="text-gray-500">Qty {item.quantity}</p>

                                                <div className="absolute top-0 right-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size, color: item.color }))}
                                                        className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                                                    >
                                                        <span className="sr-only">Remove</span>
                                                        <Trash2 className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Order summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
                    >
                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                            Order summary
                        </h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="text-base font-medium text-gray-900">Order total</dt>
                                <dd className="text-base font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <Link href="/checkout">
                                <Button className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                                    Checkout
                                </Button>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
