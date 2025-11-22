"use client";

import ProductCard from './ProductCard';
import DeleteButton from './DeleteButton';
import { useState, useEffect } from 'react';

export default function ProductList() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  async function fetchProducts() {
    try {
      const res = await fetch(`/api/products/?search=${encodeURIComponent(search)}&page=${page}`);
      const data = await res.json();
      setProducts(data.items || data);
      if (data.totalPages) setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Fetch products error', err);
    }
  }

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input
          className="p-2 border rounded"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="relative">
            <a href={`/admin/dashboard/products/edit/${p._id}`}>
              <ProductCard
                name={p.name}
                price={p.price}
                image={p.images?.[0] || p.image}
                description={p.description}
                category={p.category}
              />
            </a>
            <div className="mt-2 flex gap-2">
              <a className="px-2 py-1 bg-yellow-500 text-white rounded" href={`/admin/dashboard/products/edit/${p._id}`}>Edit</a>
              <DeleteButton id={p._id} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          disabled={page <= 1}
          onClick={() => setPage((s) => s - 1)}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((s) => s + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
