import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MessageCircle, FileText, Shield, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CustomerCarePage() {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Customer Care
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                        We're here to help. Find answers to your questions or get in touch with our support team.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Contact Options */}
                    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Phone className="h-8 w-8 text-indigo-600" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <h3 className="text-lg font-medium text-gray-900">Phone Support</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Call us directly for immediate assistance.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-4">
                            <div className="text-sm">
                                <a href="tel:+1234567890" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    +1 (234) 567-890
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Mail className="h-8 w-8 text-indigo-600" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <h3 className="text-lg font-medium text-gray-900">Email Support</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Send us an email and we'll get back to you within 24 hours.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-4">
                            <div className="text-sm">
                                <a href="mailto:support@estore.com" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    support@estore.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <MessageCircle className="h-8 w-8 text-indigo-600" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <h3 className="text-lg font-medium text-gray-900">Live Chat</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Chat with our support agents in real-time.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-4">
                            <div className="text-sm">
                                <Button variant="link" className="font-medium text-indigo-600 hover:text-indigo-500 p-0 h-auto">
                                    Start Chat
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Helpful Links</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <Link href="/terms-conditions" className="group block bg-white shadow rounded-lg p-6 hover:bg-indigo-50 transition-colors duration-300">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <FileText className="h-6 w-6 text-indigo-600 mr-3 group-hover:scale-110 transition-transform" />
                                    <span className="text-lg font-medium text-gray-900">Terms & Conditions</span>
                                </div>
                                <span className="text-gray-400 group-hover:text-indigo-600">→</span>
                            </div>
                        </Link>

                        <Link href="/privacy-policy" className="group block bg-white shadow rounded-lg p-6 hover:bg-indigo-50 transition-colors duration-300">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Shield className="h-6 w-6 text-indigo-600 mr-3 group-hover:scale-110 transition-transform" />
                                    <span className="text-lg font-medium text-gray-900">Privacy Policy</span>
                                </div>
                                <span className="text-gray-400 group-hover:text-indigo-600">→</span>
                            </div>
                        </Link>

                        <Link href="/faqs" className="group block bg-white shadow rounded-lg p-6 hover:bg-indigo-50 transition-colors duration-300">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <HelpCircle className="h-6 w-6 text-indigo-600 mr-3 group-hover:scale-110 transition-transform" />
                                    <span className="text-lg font-medium text-gray-900">FAQs</span>
                                </div>
                                <span className="text-gray-400 group-hover:text-indigo-600">→</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
