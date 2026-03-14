'use client'

import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, BookOpen, Users, Target, Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

// Sample data - in a real app, this would come from an API
const subjects = [
  {
    id: 'physics',
    name: 'Physics',
    code: 'PHY',
    description: 'Master the fundamentals of physics from classical mechanics to modern quantum theory.',
    color: '#3b82f6',
    icon: '⚛️',
    topics: [
      { id: '1', name: 'Mechanics', description: 'Newton\'s laws, forces, and motion', difficulty: 'medium' as const, estimatedHours: 20, completed: true },
      { id: '2', name: 'Thermodynamics', description: 'Heat, energy, and entropy', difficulty: 'hard' as const, estimatedHours: 15, completed: false },
      { id: '3', name: 'Waves', description: 'Wave properties, sound, and optics', difficulty: 'medium' as const, estimatedHours: 18, completed: false },
      { id: '4', name: 'Optics', description: 'Light, reflection, and lenses', difficulty: 'medium' as const, estimatedHours: 16, completed: false },
      { id: '5', name: 'Electricity', description: 'Electric circuits and fields', difficulty: 'hard' as const, estimatedHours: 22, completed: false },
      { id: '6', name: 'Magnetism', description: 'Magnetic fields and electromagnetic induction', difficulty: 'hard' as const, estimatedHours: 20, completed: false }
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
      { id: '5', name: 'Organic Chemistry', description: 'Carbon compounds and their reactions', difficulty: 'medium' as const, estimatedHours: 25, completed: true },
      { id: '6', name: 'Inorganic Chemistry', description: 'Elements and inorganic compounds', difficulty: 'hard' as const, estimatedHours: 20, completed: false },
      { id: '7', name: 'Physical Chemistry', description: 'Chemical principles and thermodynamics', difficulty: 'hard' as const, estimatedHours: 22, completed: false },
      { id: '8', name: 'Chemical Bonding', description: 'Atomic and molecular bonds', difficulty: 'medium' as const, estimatedHours: 18, completed: false }
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
      { id: '9', name: 'Algebra', description: 'Equations, inequalities, and functions', difficulty: 'easy' as const, estimatedHours: 15, completed: true },
      { id: '10', name: 'Calculus', description: 'Derivatives, integrals, and limits', difficulty: 'hard' as const, estimatedHours: 30, completed: false },
      { id: '11', name: 'Geometry', description: 'Shapes, angles, and proofs', difficulty: 'medium' as const, estimatedHours: 20, completed: false },
      { id: '12', name: 'Statistics', description: 'Data analysis and probability', difficulty: 'medium' as const, estimatedHours: 18, completed: false }
    ]
  },
  {
    id: 'biology',
    name: 'Biology',
    code: 'BIO',
    description: 'Discover the fascinating world of living organisms and life processes.',
    color: '#ef4444',
    icon: '🧬',
    topics: [
      { id: '13', name: 'Cell Biology', description: 'Structure and function of cells', difficulty: 'medium' as const, estimatedHours: 18, completed: false },
      { id: '14', name: 'Genetics', description: 'Heredity and variation', difficulty: 'hard' as const, estimatedHours: 22, completed: false },
      { id: '15', name: 'Ecology', description: 'Organisms and their environment', difficulty: 'easy' as const, estimatedHours: 15, completed: false },
      { id: '16', name: 'Human Physiology', description: 'Human body systems', difficulty: 'medium' as const, estimatedHours: 25, completed: false }
    ]
  }
]

interface CoursePageProps {
  params: {
    id: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  const subject = subjects.find(s => s.id === params.id)
  
  if (!subject) {
    notFound()
  }

  const completedTopics = subject.topics.filter(topic => topic.completed).length
  const totalTopics = subject.topics.length
  const progressPercentage = Math.round((completedTopics / totalTopics) * 100)
  const totalHours = subject.topics.reduce((total, topic) => total + topic.estimatedHours, 0)

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <Link href="/courses" className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Courses</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-white/80">Progress</div>
                <div className="text-xl font-bold">{progressPercentage}%</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div 
              className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
              style={{ backgroundColor: subject.color }}
            >
              {subject.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{subject.name}</h1>
              <p className="text-white/90 text-lg">{subject.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{totalTopics}</div>
            <div className="text-gray-600">Topics</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{totalHours}h</div>
            <div className="text-gray-600">Duration</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{completedTopics}</div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">2.5k</div>
            <div className="text-gray-600">Students</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-900">Overall Progress</h3>
            <span className="text-sm text-gray-600">{completedTopics}/{totalTopics} topics completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Topics List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Topics</h2>
          <div className="space-y-4">
            {subject.topics.map((topic, index) => (
              <div key={topic.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                        <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{topic.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyColors[topic.difficulty]}`}>
                        {topic.difficulty}
                      </span>
                      {topic.completed && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 ml-11">{topic.description}</p>
                    <div className="flex items-center space-x-4 mt-3 ml-11 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{topic.estimatedHours} hours</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {topic.completed ? (
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    ) : (
                      <Button variant="primary" size="sm">
                        <Play className="w-4 h-4 mr-1" />
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/ai-tutor">
            <Button variant="primary" size="lg" className="flex-1">
              Get AI Help with {subject.name}
            </Button>
          </Link>
          <Link href="/notes">
            <Button variant="outline" size="lg" className="flex-1">
              Study {subject.name} Notes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
