import React, { useState } from "react";

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Here you could integrate with a backend or email service
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen">
            <div className="hidden lg:block lg:w-2/3 p-8">
                <img src="/public/hero.jpg" alt="Contact Support" className="rounded-lg shadow-lg w-full h-auto" />
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                        Contact & Support
                    </h2>
                </div>
                <p className="mb-6 text-gray-700 dark:text-gray-300 text-center">
                    Have questions, need help, or want to get in touch? Fill out the form below and our support team will respond as soon as possible.
                </p>
                {submitted ? (
                    <div className="bg-green-100 text-green-800 px-4 py-3 rounded mb-4 text-center">
                        Thank you for reaching out! We have received your message.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-gray-900 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-gray-900 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="7"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-gray-900 dark:bg-gray-700 dark:text-white"
                                ></textarea>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Send Message
                        </button>
                    </form>
                )}
                <div className="mt-10 border-t pt-6 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">Support Information</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-1 text-center">Email: <a href="mailto:support@investmentwebsite.com" className="text-gray-700 dark:text-gray-300 hover:underline">support@investmentwebsite.com</a></p>
                    <p className="text-gray-700 dark:text-gray-300 mb-1 text-center">Phone: <a href="tel:+1234567890" className="text-gray-700 dark:text-gray-300 hover:underline">+91 9955776688</a></p>
                    <p className="text-gray-700 dark:text-gray-300 text-center">Our support team is available Monday to Friday, 9am - 6pm (IST).</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;