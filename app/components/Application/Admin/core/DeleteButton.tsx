"use client";

import { useState } from 'react';

export default function DeleteButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  async function remove() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setLoading(true);
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      // reload the page
      location.reload();
    } catch (err) {
      console.error('Delete error', err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <button disabled={loading} onClick={remove} className="px-3 py-1 bg-red-500 text-white rounded">
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
}
