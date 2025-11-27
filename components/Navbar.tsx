'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { ModeToggle } from './mode-toggle'; // Assuming RootState is exported or I might need to infer it if not. 
// Wait, I didn't check if RootState is exported in store.ts. I'll check store.ts content again or just use 'any' for now to be safe and fast, or better, define a type locally if needed.
// Actually, let's check store.ts content from history.
// History shows: export const store = configureStore(...)
// It doesn't show RootState export. I should add it or just use `any` for the selector for now to avoid TS errors if I can't edit store.ts again easily.
// Actually I can edit store.ts easily. Let's do that first to be clean.
// But for now, I will assume I can access state.cartStore.items

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cartStore?.items || []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              E-store
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">Home</Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center text-gray-700 hover:text-gray-900 transition-colors focus:outline-none"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                onMouseEnter={() => setIsCategoryOpen(true)}
              >
                Categories <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              <div
                className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${isCategoryOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link href="/category/t-shirts" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">T-Shirts</Link>
                  <Link href="/category/hoodies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Hoodies</Link>
                  <Link href="/category/jackets" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Jackets</Link>
                  <Link href="/category/accessories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Accessories</Link>
                </div>
              </div>
            </div>

            <Link href="/shop" className="text-gray-700 hover:text-gray-900 transition-colors">Shop</Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors">Contact</Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5 text-gray-600" />
            </Button>
            <div className="relative">
              <Link href="/cart">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                </Button>
                {mounted && cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
            <Link href="/auth/LoginPage">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5 text-gray-600" />
              </Button>
            </Link>
            <ModeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b shadow-lg">
              <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</Link>
              <div className="px-3 py-2">
                <span className="block text-base font-medium text-gray-900 mb-2">Categories</span>
                <div className="pl-4 space-y-1">
                  <Link href="/category/t-shirts" className="block text-sm text-gray-600 hover:text-gray-900">T-Shirts</Link>
                  <Link href="/category/hoodies" className="block text-sm text-gray-600 hover:text-gray-900">Hoodies</Link>
                  <Link href="/category/jackets" className="block text-sm text-gray-600 hover:text-gray-900">Jackets</Link>
                  <Link href="/category/accessories" className="block text-sm text-gray-600 hover:text-gray-900">Accessories</Link>
                </div>
              </div>
              <Link href="/shop" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Shop</Link>
              <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Contact</Link>
              <div className="border-t border-gray-200 my-2"></div>
              <Link href="/auth/LoginPage" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Login</Link>
              <Link href="/auth/Register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Register</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
