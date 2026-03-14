'use client'

import Link from 'next/link'
import { ArrowRight, Brain, BookOpen, Target, Users, Star, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CourseCard } from '@/components/course/CourseCard'
import { QuizCard } from '@/components/quiz/QuizCard'

export default function HomePage() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Get personalized explanations and answers from our advanced AI tutor.',
    },
    {
      icon: Target,
      title: 'Smart Question Generation',
      description: 'Dynamically generated questions tailored to your learning pace and topics.',
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Content',
      description: 'Access +2 science materials for Physics, Chemistry, Math, and Biology.',
    },
    {
      icon: Users,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics and insights.',
    },
  ]

  const stats = [
    { label: 'Active Students', value: '10,000+' },
    { label: 'Questions Generated', value: '50,000+' },
    { label: 'Success Rate', value: '95%' },
    { label: 'Subjects Covered', value: '4' },
  ]

  // Sample data for demonstration
  const sampleSubjects = [
    {
      id: 'physics',
      name: 'Physics',
      code: 'PHY',
      description: 'Master the fundamentals of physics from mechanics to modern physics.',
      color: '#3b82f6',
      icon: '⚛️',
      topics: [
        { id: '1', name: 'Mechanics', description: 'Newton\'s laws and motion', subjectId: 'physics', difficulty: 'medium' as const, estimatedHours: 20 },
        { id: '2', name: 'Thermodynamics', description: 'Heat and energy', subjectId: 'physics', difficulty: 'hard' as const, estimatedHours: 15 },
      ]
    },
    {
      id: 'chemistry',
      name: 'Chemistry', 
      code: 'CHE',
      description: 'Explore the world of atoms, molecules, and chemical reactions.',
      color: '#10b981',
      icon: '🧪',
      topics: [
        { id: '3', name: 'Organic Chemistry', description: 'Carbon compounds', subjectId: 'chemistry', difficulty: 'medium' as const, estimatedHours: 25 },
        { id: '4', name: 'Physical Chemistry', description: 'Chemical principles', subjectId: 'chemistry', difficulty: 'hard' as const, estimatedHours: 20 },
      ]
    }
  ]

  const sampleQuizzes = [
    {
      id: '1',
      title: 'Newton\'s Laws of Motion',
      description: 'Test your understanding of the three fundamental laws of motion.',
      subject: 'Physics',
      topic: 'Mechanics',
      questions: [],
      totalMarks: 20,
      duration: 15,
      difficulty: 'medium' as const,
      createdAt: new Date(),
      tags: ['mechanics', 'forces', 'motion']
    },
    {
      id: '2',
      title: 'Chemical Bonding Basics',
      description: 'Explore different types of chemical bonds and their properties.',
      subject: 'Chemistry',
      topic: 'Chemical Bonding',
      questions: [],
      totalMarks: 25,
      duration: 20,
      difficulty: 'easy' as const,
      createdAt: new Date(),
      tags: ['bonding', 'molecules', 'chemistry']
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Revolutionize Your
              <span className="gradient-text"> +2 Science</span> Learning
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience the future of education with AI-powered tutoring, smart question generation, 
              and personalized learning paths designed specifically for +2 science students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ai-tutor">
                <Button variant="primary" size="lg" className="text-lg px-8 py-3">
                  Start Learning Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
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
              Our AI-powered platform transforms how +2 science students learn and succeed.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover-lift">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Subjects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive coverage of all +2 science subjects with AI-enhanced learning.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleSubjects.map((subject) => (
              <CourseCard key={subject.id} subject={subject} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/courses">
              <Button variant="outline" size="lg">
                View All Subjects
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sample Quizzes Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Practice with AI-Generated Quizzes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Test your knowledge with dynamically generated questions tailored to your level.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/ai-tutor">
              <Button variant="primary" size="lg">
                Generate Custom Quiz
                <Zap className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students who are already learning smarter with STUDEETH.
          </p>
          <Link href="/ai-tutor">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-3 bg-white text-primary-600 hover:bg-gray-100">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
