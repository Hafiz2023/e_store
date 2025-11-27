import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Contact Us</h1>
                    <p className="mt-4 text-xl text-gray-500">
                        We'd love to hear from you. Send us a message or visit our store.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <MapPin className="h-6 w-6 text-indigo-600 mt-1" />
                                    <div className="ml-4">
                                        <p className="text-lg font-medium text-gray-900">Our Location</p>
                                        <p className="text-gray-500">123 Fashion Street, Design District, NY 10001</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Phone className="h-6 w-6 text-indigo-600 mt-1" />
                                    <div className="ml-4">
                                        <p className="text-lg font-medium text-gray-900">Phone Number</p>
                                        <p className="text-gray-500">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Mail className="h-6 w-6 text-indigo-600 mt-1" />
                                    <div className="ml-4">
                                        <p className="text-lg font-medium text-gray-900">Email Address</p>
                                        <p className="text-gray-500">support@estore.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Changed background from indigo-700 to indigo-500 for a lighter look */}
                        <div className="bg-indigo-500 p-8 rounded-lg shadow-md text-white">
                            <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                            <ul className="space-y-2">
                                <li className="flex justify-between">
                                    <span>Monday - Friday</span>
                                    <span>9:00 AM - 8:00 PM</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Saturday</span>
                                    <span>10:00 AM - 6:00 PM</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Sunday</span>
                                    <span>Closed</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <ContactForm />
                    </div>
                </div>

                {/* Google Map */}
                <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1623345678901!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
