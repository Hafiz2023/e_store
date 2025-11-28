'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* E-store Info */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">E-store</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Your premium destination for fashion. We bring you the latest trends with uncompromising quality and style.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-indigo-600 hover:text-white transition-all duration-300"><Facebook className="h-5 w-5" /></Link>
                            <Link href="#" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-sky-500 hover:text-white transition-all duration-300"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300"><Instagram className="h-5 w-5" /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center group"><ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />Home</Link></li>
                            <li><Link href="/shop" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center group"><ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />Shop</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center group"><ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center group"><ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />Contact</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Customer Care</h3>
                        <ul className="space-y-3">
                            <li><Link href="/customer-care" className="text-gray-400 hover:text-indigo-400 transition-colors">Help Center</Link></li>
                            <li><Link href="/MyAccount" className="text-gray-400 hover:text-indigo-400 transition-colors">My Account</Link></li>
                            <li><Link href="/cart" className="text-gray-400 hover:text-indigo-400 transition-colors">Shopping Cart</Link></li>
                            <li><Link href="/terms-conditions" className="text-gray-400 hover:text-indigo-400 transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/privacy-policy" className="text-gray-400 hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/faqs" className="text-gray-400 hover:text-indigo-400 transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Stay Updated</h3>
                        <p className="text-gray-400 mb-4 text-sm">Subscribe to our newsletter for the latest updates and exclusive offers.</p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-indigo-500"
                            />
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>&copy; 2025 E-store. All Rights Reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>New York, NY</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <span>support@estore.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
