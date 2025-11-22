import ProductList from "@/app/components/Application/Admin/core/ProductList";


export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      

      <div className="mb-4">
        <a
          href="/admin/Dashboard/products/new"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add Product
        </a>
      </div>

      <ProductList />
    </div>
  );
}
