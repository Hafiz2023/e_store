'use client';

import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/store';
import { updateOrderStatus } from '@/app/store/reducer/orderReducer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer } from 'lucide-react';
import Link from 'next/link';

export default function OrderDetailsPage() {
    const params = useParams();
    const dispatch = useDispatch();
    const orderId = params.id;

    // Find order by ID (handle both string and number types if necessary, though IDs are usually strings here)
    const order = useSelector((state: RootState) =>
        state.orderStore.orders.find(o => o.id === orderId || o.id === String(orderId))
    );

    if (!order) {
        return (
            <div className="p-6">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Order not found</h2>
                    <Link href="/admin/Dashboard/orders">
                        <Button className="mt-4" variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const handleStatusChange = (status: any) => {
        dispatch(updateOrderStatus({ id: order.id, status }));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between print:hidden">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/Dashboard/orders">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Order Details</h1>
                </div>
                <Button variant="outline" onClick={() => window.print()}>
                    <Printer className="mr-2 h-4 w-4" /> Print Invoice
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:hidden">
                {/* Main Order Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Items */}
                    <div className="bg-white shadow-sm rounded-lg border p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                        <div className="divide-y divide-gray-200">
                            {order.items.map((item, index) => (
                                <div key={index} className="py-4 flex items-center">
                                    <img src={item.imageSrc} alt={item.name} className="h-16 w-16 rounded-md object-cover" />
                                    <div className="ml-4 flex-1">
                                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                        <p className="text-sm text-gray-500">{item.color} - {item.size}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-4 mt-4 flex justify-between items-center">
                            <span className="font-medium text-gray-900">Total</span>
                            <span className="text-xl font-bold text-gray-900">${order.total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Transaction Details */}
                    <div className="bg-white shadow-sm rounded-lg border p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Details</h3>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                                <dd className="mt-1 text-sm text-gray-900 capitalize">{order.paymentMethod}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Date</dt>
                                <dd className="mt-1 text-sm text-gray-900">{order.date}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Order ID</dt>
                                <dd className="mt-1 text-sm text-gray-900">{order.id}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white shadow-sm rounded-lg border p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Customer</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Name</p>
                                <p className="text-sm text-gray-900">{order.customer.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Email</p>
                                <p className="text-sm text-gray-900">{order.customer.email}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Phone</p>
                                <p className="text-sm text-gray-900">{order.customer.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="bg-white shadow-sm rounded-lg border p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
                        <p className="text-sm text-gray-900 whitespace-pre-line">{order.customer.address}</p>
                    </div>

                    {/* Status Control */}
                    <div className="bg-white shadow-sm rounded-lg border p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Status</h3>
                        <div className="space-y-2">
                            <div className={`p-2 rounded-md text-center text-sm font-medium mb-4
                                ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                    order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'}`}>
                                {order.status}
                            </div>
                            <Button className="w-full" variant="outline" onClick={() => handleStatusChange('Processing')}>Mark as Processing</Button>
                            <Button className="w-full" variant="outline" onClick={() => handleStatusChange('Completed')}>Mark as Completed</Button>
                            <Button className="w-full text-red-600 hover:text-red-700 hover:bg-red-50" variant="ghost" onClick={() => handleStatusChange('Cancelled')}>Cancel Order</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Printable Invoice Section */}
            <div className="hidden print:block bg-white p-8 max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-start border-b pb-8 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">INVOICE</h1>
                        <p className="text-gray-500">#{order.id}</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-2xl font-bold text-indigo-600 mb-1">E-Store</h2>
                        <p className="text-gray-500 text-sm">123 Commerce St, Business City</p>
                        <p className="text-gray-500 text-sm">support@estore.com</p>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-gray-500 font-medium mb-2 uppercase text-xs tracking-wider">Bill To</h3>
                        <p className="font-bold text-gray-900">{order.customer.name}</p>
                        <p className="text-gray-600">{order.customer.address}</p>
                        <p className="text-gray-600">{order.customer.email}</p>
                        <p className="text-gray-600">{order.customer.phone}</p>
                    </div>
                    <div className="text-right">
                        <div className="mb-4">
                            <h3 className="text-gray-500 font-medium mb-1 uppercase text-xs tracking-wider">Invoice Date</h3>
                            <p className="font-bold text-gray-900">{order.date}</p>
                        </div>
                        <div>
                            <h3 className="text-gray-500 font-medium mb-1 uppercase text-xs tracking-wider">Payment Method</h3>
                            <p className="font-bold text-gray-900 capitalize">{order.paymentMethod}</p>
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <table className="w-full mb-8">
                    <thead>
                        <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-3 font-bold text-gray-600 uppercase text-xs tracking-wider">Item Description</th>
                            <th className="text-center py-3 font-bold text-gray-600 uppercase text-xs tracking-wider">Qty</th>
                            <th className="text-right py-3 font-bold text-gray-600 uppercase text-xs tracking-wider">Price</th>
                            <th className="text-right py-3 font-bold text-gray-600 uppercase text-xs tracking-wider">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item, index) => (
                            <tr key={index} className="border-b border-gray-100">
                                <td className="py-4">
                                    <p className="font-bold text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.color} - {item.size}</p>
                                </td>
                                <td className="text-center py-4 text-gray-600">{item.quantity}</td>
                                <td className="text-right py-4 text-gray-600">${item.price.toFixed(2)}</td>
                                <td className="text-right py-4 font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end border-t pt-8">
                    <div className="w-64 space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${order.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-3 mt-3">
                            <span>Total</span>
                            <span>${order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t text-center text-gray-500 text-sm">
                    <p>Thank you for your business!</p>
                </div>
            </div>
        </div>
    );
}
