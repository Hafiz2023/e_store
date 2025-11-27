'use client';

// Mock data
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', joinDate: '2024-01-15' },
    { id: 2, name: 'Admin User', email: 'admin@estore.com', role: 'Admin', joinDate: '2023-11-01' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer', joinDate: '2024-02-20' },
];

export default function UsersPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>

            <div className="bg-white shadow-sm rounded-lg border">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Join Date</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{user.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.role}</td>
                                    <td className="px-6 py-4">{user.joinDate}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                        <button className="text-red-600 hover:text-red-900">Ban</button>
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
