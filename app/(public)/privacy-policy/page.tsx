import React from 'react';

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Privacy Policy</h1>
                <div className="prose prose-indigo max-w-none text-gray-500">
                    <p className="lead text-xl mb-6">
                        Last updated: November 28, 2025
                    </p>
                    <p className="mb-4">
                        This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Collecting and Using Your Personal Data</h2>
                    <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">Types of Data Collected</h3>

                    <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">Personal Data</h4>
                    <p className="mb-4">
                        While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                    </p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Email address</li>
                        <li>First name and last name</li>
                        <li>Phone number</li>
                        <li>Address, State, Province, ZIP/Postal code, City</li>
                        <li>Usage Data</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Use of Your Personal Data</h2>
                    <p className="mb-4">The Company may use Personal Data for the following purposes:</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li className="mb-2"><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
                        <li className="mb-2"><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service.</li>
                        <li className="mb-2"><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
                        <li className="mb-2"><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Security of Your Personal Data</h2>
                    <p className="mb-4">
                        The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Children's Privacy</h2>
                    <p className="mb-4">
                        Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to this Privacy Policy</h2>
                    <p className="mb-4">
                        We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
                    <p className="mb-4">
                        If you have any questions about this Privacy Policy, You can contact us:
                    </p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>By email: privacy@estore.com</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
