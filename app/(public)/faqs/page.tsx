import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQsPage() {
    const faqs = [
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. We also offer cash on delivery in select locations."
        },
        {
            question: "How long does shipping take?",
            answer: "Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business day delivery. International shipping times vary by location."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for all unused items in their original packaging. Simply contact our support team to initiate a return."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times will be calculated at checkout based on your location."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order ships, you will receive a confirmation email with a tracking number. You can also track your order status in your account dashboard."
        },
        {
            question: "Are my personal details safe?",
            answer: "Yes, we take data security very seriously. We use industry-standard encryption to protect your personal and financial information. Read our Privacy Policy for more details."
        },
        {
            question: "Can I change or cancel my order?",
            answer: "You can request changes or cancellations within 1 hour of placing your order. After that, the order may have already been processed for shipping."
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Frequently Asked Questions
                    </h1>
                    <p className="mt-4 text-xl text-gray-500">
                        Find answers to common questions about our products, shipping, and returns.
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="px-6 border-b last:border-b-0">
                                <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-indigo-600 py-6">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-500 pb-6 text-base leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-500">
                        Can't find what you're looking for?{' '}
                        <a href="/customer-care" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Contact our support team
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
