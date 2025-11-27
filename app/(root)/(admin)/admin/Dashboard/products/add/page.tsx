'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/app/store/reducer/productReducer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        stock: '',
        imageSrc: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct = {
            id: Date.now(), // Simple ID generation
            name: formData.name,
            price: Number(formData.price),
            category: formData.category,
            stock: Number(formData.stock),
            imageSrc: formData.imageSrc || 'https://via.placeholder.com/150',
            description: formData.description,
            color: 'Default'
        };
        dispatch(addProduct(newProduct));
        router.push('/admin/Dashboard/products');
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <Input name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <Input name="price" type="number" value={formData.price} onChange={handleChange} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="T-Shirts">T-Shirts</option>
                        <option value="Hoodies">Hoodies</option>
                        <option value="Jackets">Jackets</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <Input name="stock" type="number" value={formData.stock} onChange={handleChange} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <Input name="imageSrc" value={formData.imageSrc} onChange={handleChange} placeholder="https://..." />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <Input name="description" value={formData.description} onChange={handleChange} />
                </div>
                <Button type="submit" className="w-full">Add Product</Button>
            </form>
        </div>
    );
}
