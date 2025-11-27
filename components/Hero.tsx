'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        title: "New Arrivals",
        subtitle: "Summer Collection",
        description: "Discover the latest trends in fashion. Shop our exclusive collection of clothing and accessories designed for your unique style.",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        cta: "Shop Now",
        link: "/shop"
    },
    {
        id: 2,
        title: "Exclusive Deals",
        subtitle: "Up to 50% Off",
        description: "Grab your favorites at unbeatable prices. Limited time offer on selected items.",
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        cta: "View Deals",
        link: "/shop"
    },
    {
        id: 3,
        title: "Premium Quality",
        subtitle: "Crafted for Comfort",
        description: "Experience the best materials and craftsmanship in every piece we offer.",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        cta: "Explore More",
        link: "/shop"
    }
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 8000); // Slowed down to 8 seconds

        return () => clearInterval(timer);
    }, [isAutoPlaying]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div
            className="relative h-[700px] w-full overflow-hidden bg-gray-900 group"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }} // Smoother transition
                    className="absolute inset-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[10000ms]"
                        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                    </div>

                    <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                <span className="inline-block py-1 px-3 rounded-full bg-indigo-600/20 text-indigo-400 text-sm font-semibold mb-4 border border-indigo-500/30 backdrop-blur-sm">
                                    {slides[currentSlide].subtitle}
                                </span>
                                <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-tight">
                                    {slides[currentSlide].title}
                                </h1>
                                <p className="mt-6 text-xl text-gray-300 max-w-lg leading-relaxed">
                                    {slides[currentSlide].description}
                                </p>
                                <div className="mt-10 flex gap-4">
                                    <Link href={slides[currentSlide].link}>
                                        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-indigo-600/30 transition-all hover:scale-105">
                                            {slides[currentSlide].cta}
                                        </Button>
                                    </Link>
                                    <Link href="/shop">
                                        <Button size="lg" variant="outline" className="bg-white/5 text-white border-white/30 hover:bg-white/10 px-8 py-6 text-lg rounded-full backdrop-blur-sm transition-all hover:scale-105">
                                            View Catalog
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons - Visible on Hover */}
            <button
                onClick={prevSlide}
                className="absolute left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 z-20 border border-white/10"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 z-20 border border-white/10"
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* Progress Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? 'bg-indigo-500 w-12' : 'bg-white/30 w-6 hover:bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
