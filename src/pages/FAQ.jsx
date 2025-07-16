import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
    {
        question: "What is InvestmentHub?",
        answer: "InvestmentHub is a platform that helps users track, analyze, and manage their investments with real-time market data and portfolio tools."
    },
    {
        question: "How do I create an account?",
        answer: "Click the Register button on the top right, fill in your details, and follow the instructions to verify your email."
    },
    {
        question: "Is my data secure?",
        answer: "Yes, we use industry-standard encryption and security practices to protect your data."
    },
    {
        question: "Can I connect multiple brokerage accounts?",
        answer: "Currently, you can manually add and manage multiple portfolios. Automatic brokerage integration is coming soon."
    },
    {
        question: "How do I contact support?",
        answer: "Visit the Contact page or email us at support@investmenthub.com."
    }
];

const terms = `By using InvestmentHub, you agree to our terms and conditions. InvestmentHub provides information for educational purposes only and does not constitute financial advice. Please consult a professional advisor before making investment decisions. Your use of this platform is at your own risk. We are not liable for any losses or damages resulting from the use of our services.`;

function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Frequently Asked Questions</h1>
            <div className="space-y-6">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white rounded-lg shadow p-6">
                        <button
                            className="flex items-center justify-between w-full text-left focus:outline-none"
                            onClick={() => toggleFAQ(idx)}
                        >
                            <span className="text-xl font-semibold text-gray-800">{faq.question}</span>
                            {openIndex === idx ? (
                                <ChevronUp className="w-6 h-6 text-gray-500" />
                            ) : (
                                <ChevronDown className="w-6 h-6 text-gray-500" />
                            )}
                        </button>
                        {openIndex === idx && (
                            <p className="mt-4 text-gray-600">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-12 bg-gray-50 rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Terms and Conditions</h2>
                <p className="text-gray-700 whitespace-pre-line">{terms}</p>
            </div>
        </div>
    );
}

export default FAQ;