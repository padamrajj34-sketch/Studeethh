'use client'

import { Brain, Target, Users, Award, BookOpen, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function AboutPage() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Advanced AI technology provides personalized learning experiences tailored to each student\'s needs and learning pace.'
    },
    {
      icon: Target,
      title: 'Smart Goal Setting',
      description: 'Set and track learning goals with intelligent recommendations based on your performance and progress.'
    },
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from experienced educators who understand the +2 science curriculum and exam patterns.'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Join thousands of successful students who have improved their grades and exam performance with STUDEETH.'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Active Students' },
    { number: '95%', label: 'Success Rate' },
    { number: '50,000+', label: 'Questions Generated' },
    { number: '4', label: 'Subjects Covered' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="gradient-text">STUDEETH</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We're on a mission to revolutionize +2 science education in Nepal through 
              AI-powered learning tools and personalized tutoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button variant="primary" size="lg">
                  Explore Our Platform
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To make quality +2 science education accessible to every student in Nepal through 
                innovative technology and personalized learning experiences.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We believe that every student deserves the opportunity to excel in their studies, 
                regardless of their background or learning style. Our AI-powered platform adapts to 
                each student's unique needs, providing targeted support and guidance.
              </p>
              <div className="flex items-center space-x-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Comprehensive Curriculum</h3>
                  <p className="text-gray-600">Physics, Chemistry, Mathematics, and Biology</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                  <p className="text-gray-600">AI Tutor Available</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">Unlimited</div>
                  <p className="text-gray-600">Question Generation</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">Personalized</div>
                  <p className="text-gray-600">Learning Paths</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">Real-time</div>
                  <p className="text-gray-600">Progress Tracking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose STUDEETH?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with proven teaching methods 
              to deliver the best learning experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover-lift">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students who are already learning smarter with STUDEETH.
          </p>
          <Link href="/ai-tutor">
            <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
