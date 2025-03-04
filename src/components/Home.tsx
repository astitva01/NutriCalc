import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="py-16 space-y-20">
      {/* Hero Section */}
      <section className="text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Transform Your Nutrition with AI-Powered Insights
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get personalized macronutrient calculations, weight loss projections, and meal planning strategies 
            tailored to your unique body composition and fitness goals.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/calculator"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl 
                shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] text-lg"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Why Choose NutriCalc?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '📊',
              title: "Precision Tracking",
              desc: "AI-powered algorithms calculate your exact macronutrient needs based on body composition"
            },
            {
              icon: '⚡',
              title: "Smart Projections",
              desc: "Get detailed weight loss timelines and body fat percentage predictions"
            },
            {
              icon: '🍎',
              title: "Nutrition Planning",
              desc: "Personalized meal recommendations and macro tracking system"
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-blue-200 transition-all">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                text: "NutriCalc transformed how I approach nutrition. The macro calculations helped me break through a 2-year plateau!",
                author: "Sarah Johnson",
                role: "Fitness Coach"
              },
              {
                text: "Finally a tool that accounts for body fat percentage! The projections helped me lose 12% body fat in 5 months.",
                author: "Mike Chen",
                role: "Marathon Runner"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm">
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={`https://randomuser.me/api/portraits/men/${idx+40}.jpg`} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center px-4">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-600 to-cyan-600 text-white p-12 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Start Your Transformation Today</h2>
          <p className="mb-8 text-blue-100">Join thousands of users achieving their fitness goals</p>
          <Link 
            to="/?auth=signup"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl 
              shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] text-lg font-semibold"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}; 