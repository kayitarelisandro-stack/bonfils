import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Globe, ArrowRight, Users, Heart, MapPin, Shield, Star,
  MessageCircle, Compass, Sparkles, Check, Zap, Globe2,
  HeartHandshake, Languages, Calendar, Lock, ChevronRight,
  Play
} from 'lucide-react';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">ROAD.NET</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn-primary">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="btn-ghost">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-primary">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-indigo-400 rounded-full opacity-20 animate-float"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
          <div className="absolute top-1/3 right-1/4 w-64 h-64 border border-indigo-100 rounded-full animate-spin-slow opacity-30" />
          <div className="absolute top-1/2 right-1/3 w-40 h-40 border border-purple-100 rounded-full animate-spin-slow opacity-20" style={{ animationDirection: 'reverse' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 badge bg-indigo-100 text-indigo-700 mb-6">
                <Sparkles className="w-4 h-4" />
                Human Connection Beyond Borders
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
                Where
                <span className="text-gradient"> Souls</span>
                <br />
                Connect
                <br />
                <span className="text-4xl md:text-5xl text-slate-500 font-bold">
                  Across Borders
                </span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                ROAD.NET bridges cultures and hearts. Discover meaningful connections with people
                from around the world through shared intentions, compatible interests, and authentic interactions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="btn-primary text-lg !px-8 !py-4 flex items-center justify-center gap-2 group"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="btn-secondary text-lg !px-8 !py-4 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Story
                </button>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm text-slate-600">Verified Profiles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm text-slate-600">Privacy First</span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative w-full h-[500px]">
                <div className="absolute top-10 left-10 w-48 bg-white rounded-2xl shadow-lg p-4 animate-float" style={{ animationDelay: '0s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">New Match!</p>
                      <p className="text-[10px] text-slate-500">89% Compatible</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-20 right-0 w-44 bg-white rounded-2xl shadow-lg p-4 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Globe2 className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">Tokyo, Japan</p>
                      <p className="text-[10px] text-slate-500">Language Exchange</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-20 left-20 w-52 bg-white rounded-2xl shadow-lg p-4 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">Introduction Sent</p>
                      <p className="text-[10px] text-slate-500">Awaiting response</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl rotate-12 shadow-2xl flex items-center justify-center">
                    <Globe className="w-20 h-20 text-white/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Active Users', icon: Users },
              { value: '120+', label: 'Countries', icon: Globe },
              { value: '25K+', label: 'Connections Made', icon: HeartHandshake },
              { value: '4.8', label: 'Average Rating', icon: Star },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <p className="text-3xl md:text-4xl font-extrabold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge bg-indigo-100 text-indigo-700 mb-4">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Connection Made Simple
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              From discovery to meaningful connection in four easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                icon: Compass,
                title: 'Discover',
                description: 'Browse profiles of people who share your intentions and interests across the globe.',
              },
              {
                step: '02',
                icon: HeartHandshake,
                title: 'Introduce',
                description: 'Send a personalized introduction to people you feel a connection with.',
              },
              {
                step: '03',
                icon: MessageCircle,
                title: 'Connect',
                description: 'Build your relationship through shared experiences and meaningful conversations.',
              },
              {
                step: '04',
                icon: Sparkles,
                title: 'Experience',
                description: 'Share unique experiences, from cultural exchanges to travel adventures.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative group">
                  <div className="card h-full text-center group-hover:shadow-lg transition-all">
                    <div className="text-5xl font-extrabold text-slate-100 mb-4">{item.step}</div>
                    <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-600 transition-all">
                      <Icon className="w-7 h-7 text-indigo-600 group-hover:text-white transition-all" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge bg-purple-100 text-purple-700 mb-4">Features</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Why ROAD.NET?
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              More than a social network — a bridge between cultures
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Smart Compatibility',
                description: 'Our algorithm matches you based on intentions, interests, geography, lifestyle, and language preferences.',
                color: 'bg-amber-100 text-amber-600',
              },
              {
                icon: Shield,
                title: 'Safety First',
                description: 'Verified profiles, privacy controls, and a dedicated Safety Center to ensure secure connections.',
                color: 'bg-emerald-100 text-emerald-600',
              },
              {
                icon: Globe2,
                title: 'Global Reach',
                description: 'Connect with people from 120+ countries. Break language barriers and cultural boundaries.',
                color: 'bg-indigo-100 text-indigo-600',
              },
              {
                icon: HeartHandshake,
                title: 'Meaningful Introductions',
                description: 'No random swiping. Send thoughtful introductions and build connections that matter.',
                color: 'bg-rose-100 text-rose-600',
              },
              {
                icon: Languages,
                title: 'Cultural Exchange',
                description: 'Share and learn about different cultures through authentic human interactions.',
                color: 'bg-cyan-100 text-cyan-600',
              },
              {
                icon: Sparkles,
                title: 'Shared Experiences',
                description: 'Book and share unique experiences — from wellness sessions to cultural activities.',
                color: 'bg-purple-100 text-purple-600',
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="card group hover:shadow-lg transition-all">
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Intentions Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge bg-indigo-100 text-indigo-700 mb-4">Intentions</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Connect With Purpose
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Whether you're traveling, learning, or seeking friendship — find like-minded people
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { emoji: '✈️', label: 'Travel Companion' },
              { emoji: '💬', label: 'Language Exchange' },
              { emoji: '🤝', label: 'Friendship' },
              { emoji: '🌍', label: 'Cultural Exchange' },
              { emoji: '💼', label: 'Networking' },
              { emoji: '❤️', label: 'Romance' },
              { emoji: '📖', label: 'Mentorship' },
              { emoji: '🎉', label: 'Social Events' },
              { emoji: '🧘', label: 'Wellness' },
              { emoji: '🎨', label: 'Creative' },
              { emoji: '🏃', label: 'Sports' },
              { emoji: '🍲', label: 'Food & Culture' },
            ].map((item) => (
              <div
                key={item.label}
                className="card text-center hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
              >
                <span className="text-3xl mb-2 block">{item.emoji}</span>
                <p className="text-sm font-semibold text-slate-700">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge bg-white/20 text-white mb-4">Experiences</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Share Unique Experiences
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              From wellness sessions to cultural immersions — book and share experiences with your connections
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'Wellness', desc: 'Meditation & healing sessions', icon: '🧘' },
              { title: 'Cultural', desc: 'Language & culture immersion', icon: '🎭' },
              { title: 'Travel', desc: 'Local guides & adventures', icon: '🗺️' },
              { title: 'Social', desc: 'Virtual meetups & events', icon: '🎉' },
            ].map((exp) => (
              <div key={exp.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all cursor-pointer">
                <span className="text-4xl block mb-3">{exp.icon}</span>
                <h3 className="text-lg font-bold mb-1">{exp.title}</h3>
                <p className="text-sm text-white/70">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge bg-emerald-100 text-emerald-700 mb-4">Safety</span>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6">
                Your Safety Is Our Priority
              </h2>
              <p className="text-lg text-slate-500 mb-8">
                We've built ROAD.NET with safety at its core. Every feature is designed to protect you
                while enabling genuine connections.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Shield, text: 'Verified profiles with identity checks' },
                  { icon: Lock, text: 'Granular privacy controls' },
                  { icon: Users, text: 'Report and block functionality' },
                  { icon: Globe, text: 'Dedicated Safety Center' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-slate-700 font-medium">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8">
                <Shield className="w-24 h-24 text-emerald-200 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge bg-amber-100 text-amber-700 mb-4">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Stories of Connection
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                location: 'San Francisco → Tokyo',
                text: 'ROAD.NET helped me find a language exchange partner who became my closest friend. The compatibility system is incredibly accurate!',
                rating: 5,
              },
              {
                name: 'Marcus Weber',
                location: 'Berlin → Cape Town',
                text: 'I used ROAD.NET while traveling and met amazing locals who showed me the real culture. The introduction system makes it so personal.',
                rating: 5,
              },
              {
                name: 'Aisha Patel',
                location: 'London → Mumbai',
                text: 'The safety features gave me confidence to connect with people globally. I\'ve made friendships that span continents.',
                rating: 5,
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="card hover:shadow-lg transition-all">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                Ready to Connect?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of people who are building meaningful connections across borders.
                Your next great friendship is just a click away.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition-all group"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ROAD.NET</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Human Connection Beyond Borders.
                Bridging cultures and hearts worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>Discover</p>
                <p>Connections</p>
                <p>Moments</p>
                <p>Experiences</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Safety</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>Safety Center</p>
                <p>Community Guidelines</p>
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>Help Center</p>
                <p>Contact Us</p>
                <p>Feedback</p>
                <p>FAQ</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © 2026 ROAD.NET. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
