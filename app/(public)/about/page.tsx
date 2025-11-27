import AboutSection from '@/components/AboutSection';
import FeatureSection from '@/components/FeatureSection';

export default function AboutPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-indigo-700 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl">About Us</h1>
                    <p className="mt-4 text-xl text-indigo-100 max-w-3xl mx-auto">
                        Learn more about our story, our mission, and the team behind E-store.
                    </p>
                </div>
            </div>

            <AboutSection />
            <FeatureSection />
        </div>
    );
}
