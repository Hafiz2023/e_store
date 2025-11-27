'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/app/store/store';
import { addOrder } from '@/app/store/reducer/orderReducer';
import { clearCart } from '@/app/store/reducer/cartReducer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function CheckoutPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const cartItems = useSelector((state: RootState) => state.cartStore.items);

    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cnic: '',
        address: '',
        city: '',
        postalCode: '',
        paymentMethod: 'cod'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            paymentMethod: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newOrder = {
            id: `ORD-${Date.now()}`,
            customer: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                address: `${formData.address}, ${formData.city}, ${formData.postalCode}`
            },
            items: cartItems,
            total: subtotal,
            status: 'Pending' as const,
            date: new Date().toISOString().split('T')[0],
            paymentMethod: formData.paymentMethod
        };

        dispatch(addOrder(newOrder));
        dispatch(clearCart());
        alert('Order placed successfully!');
        router.push('/');
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
                    <Button className="mt-4" onClick={() => router.push('/')}>
                        Continue Shopping
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
                <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">

                    {/* Customer Details */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Personal Info */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-medium text-gray-900 mb-6">Contact Information</h2>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                                    <Input type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="mt-1" />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                                    <Input type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="mt-1" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                                    <Input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} className="mt-1" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <Input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} className="mt-1" placeholder="0300-1234567" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="cnic" className="block text-sm font-medium text-gray-700">CNIC (ID Card)</label>
                                    <Input type="text" id="cnic" name="cnic" required value={formData.cnic} onChange={handleInputChange} className="mt-1" placeholder="35202-1234567-1" />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-medium text-gray-900 mb-6">Shipping Address</h2>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                    <Input type="text" id="address" name="address" required value={formData.address} onChange={handleInputChange} className="mt-1" />
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                    <Input type="text" id="city" name="city" required value={formData.city} onChange={handleInputChange} className="mt-1" />
                                </div>
                                <div>
                                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal code</label>
                                    <Input type="text" id="postalCode" name="postalCode" required value={formData.postalCode} onChange={handleInputChange} className="mt-1" />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-medium text-gray-900 mb-6">Payment Method</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input
                                        id="cod"
                                        name="paymentMethod"
                                        type="radio"
                                        value="cod"
                                        checked={formData.paymentMethod === 'cod'}
                                        onChange={handlePaymentChange}
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    />
                                    <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                                        Cash on Delivery (COD)
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="easypaisa"
                                        name="paymentMethod"
                                        type="radio"
                                        value="easypaisa"
                                        checked={formData.paymentMethod === 'easypaisa'}
                                        onChange={handlePaymentChange}
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    />
                                    <label htmlFor="easypaisa" className="ml-3 block text-sm font-medium text-gray-700">
                                        Easypaisa
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="jazzcash"
                                        name="paymentMethod"
                                        type="radio"
                                        value="jazzcash"
                                        checked={formData.paymentMethod === 'jazzcash'}
                                        onChange={handlePaymentChange}
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    />
                                    <label htmlFor="jazzcash" className="ml-3 block text-sm font-medium text-gray-700">
                                        JazzCash
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-5 mt-8 lg:mt-0">
                        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
                            <ul role="list" className="divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <li key={`${item.id}-${item.size}-${item.color}`} className="flex py-4">
                                        <div className="flex-shrink-0">
                                            <img src={item.imageSrc} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>{item.name}</h3>
                                                <p>${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{item.color} - {item.size}</p>
                                            <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Total</p>
                                    <p>${subtotal.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3">
                                    Place Order
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
