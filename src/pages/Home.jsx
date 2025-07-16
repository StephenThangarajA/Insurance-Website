import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import {
  ChartBarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

function Home() {
  const { user } = useSelector((state) => state.auth);

  const features = [
    {
      icon: <ChartBarIcon className="h-10 w-10 text-grey-900" />,
      title: "Real-Time Market Data",
      description: "Access up-to-the-second stock prices, charts, and analytics to make informed investment decisions."
    },
    {
      icon: <UserGroupIcon className="h-10 w-10 text-grey-900" />,
      title: "Portfolio Management",
      description: "Easily track, manage, and diversify your investment portfolio in one place."
    },
    {
      icon: <ShieldCheckIcon className="h-10 w-10 text-grey-900" />,
      title: "Secure Transactions",
      description: "Trade with confidence using bank-level security and encrypted transactions."
    },
  ];

  const howItWorks = [
    {
      icon: <SparklesIcon className="h-8 w-8 text-gray-900" />,
      title: "Choose Strategy",
      description: "Select from our proven investment strategies"
    },
    {
      icon: <ChartBarIcon className="h-8 w-8 text-gray-900" />,
      title: "Start Trading",
      description: "Begin trading with real-time market data"
    },
    {
      icon: <ArrowTrendingUpIcon className="h-8 w-8 text-gray-900" />,
      title: "Track Progress",
      description: "Monitor your portfolio's performance"
    },
    {
      icon: <UserGroupIcon className="h-8 w-8 text-gray-900" />,
      title: "Grow Community",
      description: "Join investor groups and share insights"
    }
  ];

  const testimonials = [
    {
      content: "This platform has transformed how I invest. The real-time analytics and user-friendly interface make trading a breeze.",
      author: "Sarah Johnson",
      role: "Professional Trader",
      company: "Goldman Sachs"
    },
    {
      content: "The security features give me peace of mind. I can focus on my investment strategy without worrying about my portfolio.",
      author: "Michael Chen",
      role: "Investment Advisor",
      company: "Morgan Stanley"
    },
    {
      content: "As a beginner, I found the platform incredibly intuitive. The educational resources helped me make informed decisions.",
      author: "Emma Davis",
      role: "Beginner Investor",
      company: "Independent Trader"
    }
  ];

  return (
    <div className="flex flex-col pt-16">
      {/* ───── Hero ───── */}
      <section className="pb-12 space-y-10 md:space-y-15 px-5">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <Badge variant="outline" className="bg-gray-100 text-gray-900">
            Invest smarter. Grow faster.
          </Badge>
          <h1 className="gradient-title mx-auto max-w-6xl text-4xl font-bold md:text-8xl">
            The Smartest way to Manage your Investments
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Track real-time market data, optimize your portfolio, and invest with confidence using our powerful platform.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row justify-center">
            <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800 text-white">
              <Link to="/register">
                Get Started
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gray-900 text-gray-900 hover:bg-gray-100"
            >
              <Link to="/about">See How It Works</Link>
            </Button>
          </div>
        </div>

        <div className="container mx-auto max-w-5xl overflow-hidden rounded-xl shadow-xl">
          <div className="gradient p-1 aspect-[16/9]">
            <img
              src="/hero.jpg"
              width={1280}
              height={600}
              alt="Banner"
              className="rounded-lg mx-auto"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* ───── Features ───── */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge variant="outline" className="bg-gray-100 text-gray-900">
            Features
          </Badge>
          <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
            Everything you need to invest with confidence
          </h2>
          <p className="mx-auto mt-3 max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Our platform offers powerful tools for beginners and pros to manage their portfolios with ease.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon, title, description }) => (
              <Card key={title} className="flex flex-col items-center space-y-4 p-6 text-center">
                <div className="rounded-full p-3 bg-gray-100">{icon}</div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-gray-500">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Investment Facts ───── */}
      <section className="bg-gray-900 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge variant="outline" className="bg-gray-100 text-gray-900">
            About Us
          </Badge>
          <h2 className="gradient-title mt-2 text-3xl md:text-4xl text-white">
            Our Investment Platform
          </h2>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-4">
            <div className="flex flex-col items-center">
              <h3 className="text-4xl font-bold text-white">50+</h3>
              <p className="text-gray-500">Investment Companies</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-4xl font-bold text-white">1000+</h3>
              <p className="text-gray-500">New Investors</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-4xl font-bold text-white">75%</h3>
              <p className="text-gray-500">Success Rate</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-4xl font-bold text-white">24/7</h3>
              <p className="text-gray-500">AI Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── How it works ───── */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge variant="outline" className="bg-gray-100 text-gray-900">
            How It Works
          </Badge>
          <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
            Investing made simple
          </h2>
          <p className="mx-auto mt-3 max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Follow a few easy steps to take control of your financial future.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-4">
            {howItWorks.map(({ icon, title, description }, idx) => (
              <div key={title} className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl font-bold text-gray-900">
                  {icon ? icon : idx + 1}
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-gray-500 text-center">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Testimonials ───── */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge variant="outline" className="bg-gray-100 text-gray-900">
            Testimonials
          </Badge>
          <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
            What our users are saying
          </h2>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map(({ content, author, role, company }) => (
              <Card key={author} className="flex flex-col justify-between">
                <CardContent className="space-y-4 p-6 border: bg-gray-900 rounded-lg">
                  <p className="text-gray-300">{content}</p>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="uppercase">
                        {author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-medium text-white">{author}</p>
                      <p className="text-sm text-gray-400">
                        {role} at {company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;