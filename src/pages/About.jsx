import React from "react";

const features = [
    {
        title: "Teamwork",
        desc: "We believe in the power of collaboration to achieve incredible results.",
        icon: (
            <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 10-8 0 4 4 0 008 0zm6 4v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2a6 6 0 0112 0zM6 8V6a6 6 0 1112 0v2" /></svg>
        )
    },
    {
        title: "Open & Honest",
        desc: "Transparency and integrity are at the heart of everything we do.",
        icon: (
            <svg className="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        )
    },
    {
        title: "Passionate & Committed",
        desc: "Our dedication drives us to deliver the best for our users.",
        icon: (
            <svg className="w-8 h-8 text-pink-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.682l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
        )
    },
    {
        title: "Real-Time Market Data",
        desc: "Access up-to-the-minute stock prices, trends, and analytics to make informed investment decisions.",
        icon: (
            <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21H3V3" /></svg>
        )
    },
    {
        title: "Expert Insights",
        desc: "Benefit from curated analysis and tips from seasoned financial professionals and market strategists.",
        icon: (
            <svg className="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2 4-4" /></svg>
        )
    },
    {
        title: "Portfolio Tracking",
        desc: "Monitor your investments in one place with intuitive dashboards and performance metrics.",
        icon: (
            <svg className="w-8 h-8 text-purple-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="10" x="3" y="7" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 17V7m5 10V7m5 10V7" /></svg>
        )
    },
    {
        title: "Secure Transactions",
        desc: "Your data and trades are protected with industry-leading security and encryption.",
        icon: (
            <svg className="w-8 h-8 text-yellow-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4" /></svg>
        )
    },
    {
        title: "Community Support",
        desc: "Join a vibrant community of investors to share knowledge, strategies, and success stories.",
        icon: (
            <svg className="w-8 h-8 text-pink-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" /><path strokeLinecap="round" strokeLinejoin="round" d="M5.5 21a7.5 7.5 0 0113 0" /></svg>
        )
    },
    {
        title: "Learning Resources",
        desc: "Expand your financial knowledge with articles, tutorials, and webinars for all experience levels.",
        icon: (
            <svg className="w-8 h-8 text-orange-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12V4" /></svg>
        )
    }
];

export default function About() {
    return (
        <div className="min-h-screen w-full">
            {/* Hero Section */}
            <div className="relative w-full m-0 p-0 ">
                <img src="/hero.jpg" alt="Investment team working" className="min-w-full h-[450px] md:h-[600px] object-cover object-center opacity-90 m-0 p-0" />
                <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-24 bg-gradient-to-r from-white/90 to-transparent">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 mt-8">Join the Future of <span className="text-blue-600">Investing</span></h1>
                    <p className="text-lg md:text-2xl text-gray-700 max-w-2xl mt-4">Empowering individuals to grow wealth with real-time analytics, expert insights, and a supportive community. InvestmentHub is your gateway to smarter, more confident investing.</p>
                </div>
            </div>

            {/* Work With Us Section */}
            <div className="max-w-5xl mx-auto py-12 px-4">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Why Choose InvestmentHub?</h2>
                <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">At InvestmentHub, we believe everyone deserves access to powerful investment tools and a transparent, user-first platform. Discover what sets us apart.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
                            {feature.icon}
                            <h3 className="font-semibold text-lg text-gray-800 mb-1">{feature.title}</h3>
                            <p className="text-gray-500 text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}