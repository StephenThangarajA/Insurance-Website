import React from 'react';
import { Link } from 'react-router-dom';

function Blog() {
    // Mock blog post data
    const blogPosts = [
        {
            id: 1,
            title: 'Top Investment Trends for 2025',
            excerpt: 'Explore the most promising investment trends for 2025, including small-cap stocks, energy, and crypto ETFs.',
            date: 'January 10, 2025',
            author: 'Forbes Advisor',
            category: 'Investment Trends',
            image: '/hero.jpg'
        },
        {
            id: 2,
            title: 'Cryptocurrency ETFs: What to Expect in 2025',
            excerpt: 'With the launch of spot Bitcoin ETFs and potential for more crypto ETFs, 2025 could be a pivotal year for digital assets.',
            date: 'February 5, 2025',
            author: 'Bankrate',
            category: 'Cryptocurrency',
            image: '/hero.jpg'
        },
        {
            id: 3,
            title: 'Small-Cap Stocks: The Underdogs of 2025',
            excerpt: 'Small-cap stocks are gaining attention for their growth potential and attractive valuations in 2025.',
            date: 'March 12, 2025',
            author: 'JPMorgan Insights',
            category: 'Stocks',
            image: '/hero.jpg'
        },
        {
            id: 4,
            title: 'REITs and Real Estate: Poised for a Comeback',
            excerpt: 'Falling interest rates in 2025 may boost REITs and real estate investments, offering high yields and diversification.',
            date: 'April 20, 2025',
            author: 'Forbes Finance Council',
            category: 'Real Estate',
            image: '/hero.jpg'
        },
        {
            id: 5,
            title: 'Dividend Stocks: Reliable Income in 2025',
            excerpt: 'As interest rates shift, dividend-paying stocks remain a popular choice for steady income and lower volatility.',
            date: 'May 8, 2025',
            author: 'Bankrate',
            category: 'Dividend Investing',
            image: '/hero.jpg'
        },
        {
            id: 6,
            title: 'Clean Energy and ESG: Investing with Impact',
            excerpt: 'Investors are increasingly seeking opportunities in clean energy and ESG-focused companies for 2025.',
            date: 'May 11, 2025',
            author: 'Forbes Advisor',
            category: 'Sustainable Investing',
            image: '/hero.jpg'
        },
        {
            id: 7,
            title: 'Live Market Data: S&P 500 and Crypto Prices',
            excerpt: 'Stay updated with the latest S&P 500 index and Bitcoin prices for 2025, updated in real-time below.',
            date: 'May 15, 2025',
            author: 'InvestmentHub',
            category: 'Live Market',
            image: '/hero.jpg',
            live: true
        }
    ];

    // Featured post is the first one
    const featuredPost = blogPosts[0];
    // Regular posts are the rest
    const regularPosts = blogPosts.slice(1);

    // Live data state and fetch logic
    const [sp500, setSp500] = React.useState(null);
    const [btc, setBtc] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        // Only fetch if there's a live post
        const hasLive = blogPosts.some(post => post.live);
        if (!hasLive) return;
        setLoading(true);
        async function fetchLiveData() {
            try {
                // Example APIs (replace with your preferred providers if needed)
                const sp500Res = await fetch('https://financialmodelingprep.com/api/v3/quote/%5EGSPC?apikey=demo');
                const btcRes = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
                const sp500Data = await sp500Res.json();
                const btcData = await btcRes.json();
                setSp500(sp500Data[0]?.price || null);
                setBtc(btcData.bpi?.USD?.rate || null);
                setError(null);
            } catch (err) {
                setError('Failed to fetch live data.');
            } finally {
                setLoading(false);
            }
        }
        fetchLiveData();
        // Optionally refresh every 60 seconds
        const interval = setInterval(fetchLiveData, 60000);
        return () => clearInterval(interval);
    }, [blogPosts]);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="mb-12 text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    InvestmentHub Blog
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    Stay updated with the latest investment insights, market analysis, and financial strategies.
                </p>
            </div>

            {/* Featured Post */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Post</h2>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2">
                            <img
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                className="w-full h-64 md:h-full object-cover"
                            />
                        </div>
                        <div className="p-6 md:w-1/2">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                                <span>{featuredPost.date}</span>
                                <span className="mx-2">•</span>
                                <span>{featuredPost.category}</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                {featuredPost.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {featuredPost.excerpt}
                            </p>
                            <div className="flex items-center mb-4">
                                <div className="text-sm">
                                    <p className="text-gray-900 dark:text-white font-semibold">By {featuredPost.author}</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition">
                                Read More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Regular Posts Grid */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Latest Articles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map((post) => (
                        <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                                    <span>{post.date}</span>
                                    <span className="mx-2">•</span>
                                    <span>{post.category}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-900 dark:text-white font-semibold">By {post.author}</p>
                                    <button className="px-3 py-1 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition">
                                        Read More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-16 bg-gray-100 dark:bg-gray-700 rounded-lg p-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Subscribe to Our Newsletter
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Get the latest investment insights and market analysis delivered to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                        <button className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;