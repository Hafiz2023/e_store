import ProductForm from '@/app/components/Application/Admin/core/ProductForm';

export default function New() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Add Product</h1>
      <ProductForm mode="create" />
    </div>
  );
}
