'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/store';
import { updateOrderStatus } from '@/app/store/reducer/orderReducer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function OrdersPage() {
    const orders = useSelector((state: RootState) => state.orderStore.orders);
    const dispatch = useDispatch();

    const handleStatusChange = (id: string, status: any) => {
        dispatch(updateOrderStatus({ id, status }));
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>

            <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                    <td className="px-6 py-4">
                                        <div>{order.customer.name}</div>
                                        <div className="text-xs text-gray-500">{order.customer.email}</div>
                                    </td>
                                    <td className="px-6 py-4">{order.date}</td>
                                    <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <Link href={`/admin/Dashboard/orders/${order.id}`}>
                                                <Button size="sm" variant="secondary">View</Button>
                                            </Link>
                                            <Button size="sm" variant="outline" onClick={() => handleStatusChange(order.id, 'Processing')}>Process</Button>
                                            <Button size="sm" variant="outline" onClick={() => handleStatusChange(order.id, 'Completed')}>Complete</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
