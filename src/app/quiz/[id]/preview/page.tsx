'use client'

import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Target, Eye } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

// Sample quiz data (same as main quiz page)
const quizzes = [
  {
    id: '1',
    title: 'Newton\'s Laws of Motion',
    description: 'Test your understanding of the three fundamental laws of motion.',
    subject: 'Physics',
    topic: 'Mechanics',
    questions: [
      {
        id: 1,
        question: 'What is Newton\'s First Law of Motion?',
        options: [
          'An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force',
          'Force equals mass times acceleration',
          'For every action, there is an equal and opposite reaction',
          'Energy cannot be created or destroyed'
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: 'What is the unit of force?',
        options: ['Joule', 'Newton', 'Watt', 'Pascal'],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'Which law explains why a rocket moves forward?',
        options: [
          'Newton\'s First Law',
          'Newton\'s Second Law', 
          'Newton\'s Third Law',
          'Law of Conservation of Energy'
        ],
        correctAnswer: 2
      }
    ],
    totalMarks: 30,
    duration: 15,
    difficulty: 'medium'
  }
]

interface QuizPreviewPageProps {
  params: {
    id: string
  }
}

export default function QuizPreviewPage({ params }: QuizPreviewPageProps) {
  const quiz = quizzes.find(q => q.id === params.id)

  if (!quiz) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <Link href={`/quiz/${quiz.id}`} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Quiz</span>
          </Link>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Preview</h1>
            <p className="text-lg text-gray-600">{quiz.title}</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{quiz.questions.length}</div>
              <div className="text-gray-600">Questions</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{quiz.duration}</div>
              <div className="text-gray-600">Minutes</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{quiz.totalMarks}</div>
              <div className="text-gray-600">Total Marks</div>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900">Sample Questions</h2>
            {quiz.questions.slice(0, 2).map((question, index) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                  </div>
                  <h3 className="font-medium text-gray-900">{question.question}</h3>
                </div>
                <div className="ml-11 space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2 text-gray-600">
                      <div className="w-4 h-4 border border-gray-300 rounded" />
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {quiz.questions.length > 2 && (
              <div className="text-center text-gray-500">
                <p>... and {quiz.questions.length - 2} more questions</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link href={`/quiz/${quiz.id}`}>
              <Button variant="primary" size="lg">
                Start Quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
