"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

interface Props {
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export default function ProductCard({ name, price, image, description }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-white shadow rounded-xl hover:shadow-lg transition w-full"
    >
      <div className="rounded-xl w-full h-48 overflow-hidden">
        <Image
          src={image || 'https://via.placeholder.com/600x400'}
          alt={name}
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="mt-3 font-bold text-lg">{name}</h2>
      <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
      <p className="font-semibold mt-2">Rs. {price}</p>
    </motion.div>
  );
}
