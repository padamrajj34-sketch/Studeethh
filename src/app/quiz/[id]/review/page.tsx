'use client'

import { notFound } from 'next/navigation'
import { ArrowLeft, CheckCircle, XCircle, Target } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

// Sample quiz data with correct answers
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
        correctAnswer: 0,
        explanation: 'Newton\'s First Law states that an object will remain at rest or in uniform motion unless acted upon by an external force.'
      },
      {
        id: 2,
        question: 'What is the unit of force?',
        options: ['Joule', 'Newton', 'Watt', 'Pascal'],
        correctAnswer: 1,
        explanation: 'The Newton (N) is the SI unit of force, named after Sir Isaac Newton.'
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
        correctAnswer: 2,
        explanation: 'Newton\'s Third Law explains that for every action, there is an equal and opposite reaction. The rocket pushes exhaust gases backward, and the gases push the rocket forward.'
      }
    ],
    totalMarks: 30,
    duration: 15,
    difficulty: 'medium'
  }
]

interface QuizReviewPageProps {
  params: {
    id: string
  }
}

export default function QuizReviewPage({ params }: QuizReviewPageProps) {
  const quiz = quizzes.find(q => q.id === params.id)

  if (!quiz) {
    notFound()
  }

  const correctAnswers = quiz.questions.length // Assuming all correct for demo
  const score = quiz.totalMarks
  const percentage = 100

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <Link href={`/quiz/${quiz.id}`} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Quiz</span>
          </Link>

          {/* Results Summary */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Review</h1>
            <div className="text-5xl font-bold mb-2 text-green-600">
              {score}
              <span className="text-gray-400">/{quiz.totalMarks}</span>
            </div>
            <div className="text-xl text-gray-600 mb-2">{percentage}% Score</div>
            <div className="text-gray-600">{correctAnswers}/{quiz.questions.length} questions correct</div>
          </div>

          {/* Question Review */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Question Review</h2>
            {quiz.questions.map((question, index) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Question {index + 1}
                    </h3>
                    <p className="text-gray-700 mb-4">{question.question}</p>
                    
                    {/* Options */}
                    <div className="space-y-2 mb-4">
                      {question.options.map((option, optionIndex) => (
                        <div 
                          key={optionIndex}
                          className={`flex items-center space-x-2 p-3 rounded-lg ${
                            optionIndex === question.correctAnswer
                              ? 'bg-green-50 border border-green-200'
                              : 'bg-gray-50 border border-gray-200'
                          }`}
                        >
                          {optionIndex === question.correctAnswer ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          ) : (
                            <div className="w-5 h-5 border border-gray-300 rounded flex-shrink-0" />
                          )}
                          <span className={`${
                            optionIndex === question.correctAnswer ? 'text-green-900 font-medium' : 'text-gray-600'
                          }`}>
                            {option}
                          </span>
                          {optionIndex === question.correctAnswer && (
                            <span className="text-green-600 text-sm ml-2">(Correct)</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Explanation */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Explanation</h4>
                      <p className="text-blue-800">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href={`/quiz/${quiz.id}`}>
              <Button variant="primary" size="lg">
                Retake Quiz
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" size="lg">
                Back to Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
