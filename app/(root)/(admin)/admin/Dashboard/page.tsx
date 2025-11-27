'use client';

import AdminChart from '@/components/AdminChart';
import { Users, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center">
                    <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                        <DollarSign className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                        <p className="text-2xl font-bold text-gray-900">$45,231.89</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                        <ShoppingBag className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">+573</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                        <Users className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Active Users</p>
                        <p className="text-2xl font-bold text-gray-900">2,345</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                        <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Growth</p>
                        <p className="text-2xl font-bold text-gray-900">+12.5%</p>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AdminChart />

                {/* Recent Activity Mockup */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">Recent Activity</h3>
                    <ul className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <li key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                        U{i}
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">New order placed</p>
                                        <p className="text-xs text-gray-500">2 minutes ago</p>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-green-600">+$120.00</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}