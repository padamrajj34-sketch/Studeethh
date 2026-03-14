'use client'

import { CourseCard } from '@/components/course/CourseCard'
import { BookOpen, Users, Clock } from 'lucide-react'

// Sample course data
const subjects = [
  {
    id: 'physics',
    name: 'Physics',
    code: 'PHY',
    description: 'Master the fundamentals of physics from classical mechanics to modern quantum theory.',
    color: '#3b82f6',
    icon: '⚛️',
    topics: [
      { id: '1', name: 'Mechanics', description: 'Newton\'s laws, forces, and motion', subjectId: 'physics', difficulty: 'medium' as const, estimatedHours: 20 },
      { id: '2', name: 'Thermodynamics', description: 'Heat, energy, and entropy', subjectId: 'physics', difficulty: 'hard' as const, estimatedHours: 15 },
      { id: '3', name: 'Waves', description: 'Wave properties, sound, and optics', subjectId: 'physics', difficulty: 'medium' as const, estimatedHours: 18 },
      { id: '4', name: 'Optics', description: 'Light, reflection, and lenses', subjectId: 'physics', difficulty: 'medium' as const, estimatedHours: 16 }
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
      { id: '5', name: 'Organic Chemistry', description: 'Carbon compounds and their reactions', subjectId: 'chemistry', difficulty: 'medium' as const, estimatedHours: 25 },
      { id: '6', name: 'Inorganic Chemistry', description: 'Elements and inorganic compounds', subjectId: 'chemistry', difficulty: 'hard' as const, estimatedHours: 20 },
      { id: '7', name: 'Physical Chemistry', description: 'Chemical principles and thermodynamics', subjectId: 'chemistry', difficulty: 'hard' as const, estimatedHours: 22 },
      { id: '8', name: 'Chemical Bonding', description: 'Atomic and molecular bonds', subjectId: 'chemistry', difficulty: 'medium' as const, estimatedHours: 18 }
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    code: 'MAT',
    description: 'Develop problem-solving skills from algebra to calculus.',
    color: '#8b5cf6',
    icon: '📐',
    topics: [
      { id: '9', name: 'Algebra', description: 'Equations, inequalities, and functions', subjectId: 'mathematics', difficulty: 'easy' as const, estimatedHours: 15 },
      { id: '10', name: 'Calculus', description: 'Derivatives, integrals, and limits', subjectId: 'mathematics', difficulty: 'hard' as const, estimatedHours: 30 },
      { id: '11', name: 'Geometry', description: 'Shapes, angles, and proofs', subjectId: 'mathematics', difficulty: 'medium' as const, estimatedHours: 20 },
      { id: '12', name: 'Statistics', description: 'Data analysis and probability', subjectId: 'mathematics', difficulty: 'medium' as const, estimatedHours: 18 }
    ]
  },
  {
    id: 'biology',
    name: 'Biology',
    code: 'BIO',
    description: 'Understand living organisms and life processes.',
    color: '#22c55e',
    icon: '🧬',
    topics: [
      { id: '13', name: 'Cell Biology', description: 'Cell structure and function', subjectId: 'biology', difficulty: 'medium' as const, estimatedHours: 22 },
      { id: '14', name: 'Genetics', description: 'Heredity and DNA', subjectId: 'biology', difficulty: 'hard' as const, estimatedHours: 25 },
      { id: '15', name: 'Ecology', description: 'Ecosystems and environment', subjectId: 'biology', difficulty: 'easy' as const, estimatedHours: 15 },
      { id: '16', name: 'Human Physiology', description: 'Human body systems', subjectId: 'biology', difficulty: 'medium' as const, estimatedHours: 20 }
    ]
  }
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="gradient-text">+2 Science</span> Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive courses for Physics, Chemistry, Mathematics, and Biology with AI-powered learning
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary-600" />
            <div className="text-2xl font-bold text-gray-900">4</div>
            <div className="text-sm text-gray-600">Subjects</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <Users className="w-8 h-8 mx-auto mb-2 text-secondary-600" />
            <div className="text-2xl font-bold text-gray-900">50+</div>
            <div className="text-sm text-gray-600">Topics</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <Clock className="w-8 h-8 mx-auto mb-2 text-accent-600" />
            <div className="text-2xl font-bold text-gray-900">150+</div>
            <div className="text-sm text-gray-600">Hours</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-primary-600">10K+</div>
            <div className="text-sm text-gray-600">Students</div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {subjects.map((subject) => (
            <CourseCard 
              key={subject.id} 
              subject={subject}
              showProgress={false}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of students using AI-powered education to excel in your +2 science exams
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition-colors duration-200">
                Browse All Courses
              </button>
              <button className="bg-white/20 hover:bg-white/30 font-bold py-3 px-6 rounded-lg transition-colors duration-200">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
