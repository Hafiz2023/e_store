import ProductForm from '@/app/components/Application/Admin/core/ProductForm';

async function getProduct(id: string) {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/products/${id}`, { cache: 'no-store' });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EditProductPage({ params }: any) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div className="p-6 text-red-500 font-bold">❌ Product not found!</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
      <ProductForm initial={product} mode="edit" />
    </div>
  );
}
