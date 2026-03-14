'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Target, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

// Sample quiz data
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
  },
  {
    id: '2',
    title: 'Chemical Bonding Basics',
    description: 'Explore different types of chemical bonds and their properties.',
    subject: 'Chemistry',
    topic: 'Chemical Bonding',
    questions: [
      {
        id: 1,
        question: 'What type of bond involves the sharing of electrons?',
        options: ['Ionic bond', 'Covalent bond', 'Hydrogen bond', 'Metallic bond'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Which bond is formed between a metal and a non-metal?',
        options: ['Covalent bond', 'Ionic bond', 'Hydrogen bond', 'Van der Waals bond'],
        correctAnswer: 1
      }
    ],
    totalMarks: 20,
    duration: 10,
    difficulty: 'easy'
  }
]

interface QuizPageProps {
  params: {
    id: string
  }
}

export default function QuizPage({ params }: QuizPageProps) {
  const quiz = quizzes.find(q => q.id === params.id)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)

  if (!quiz) {
    notFound()
  }

  const handleStart = () => {
    setQuizStarted(true)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let score = 0
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score += (quiz.totalMarks / quiz.questions.length)
      }
    })
    return Math.round(score)
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <Link href="/courses" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Courses</span>
            </Link>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{quiz.title}</h1>
              <p className="text-lg text-gray-600 mb-8">{quiz.description}</p>
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
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{quiz.totalMarks}</div>
                <div className="text-gray-600">Total Marks</div>
              </div>
            </div>

            <div className="text-center">
              <Button variant="primary" size="lg" onClick={handleStart}>
                Start Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = Math.round((score / quiz.totalMarks) * 100)

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                percentage >= 80 ? 'bg-green-100' : percentage >= 60 ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <CheckCircle className={`w-10 h-10 ${
                  percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Completed!</h1>
              <div className="text-5xl font-bold mb-2">
                <span className={
                  percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                }>
                  {score}
                </span>
                <span className="text-gray-400">/{quiz.totalMarks}</span>
              </div>
              <div className="text-xl text-gray-600 mb-8">{percentage}% Score</div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/courses">
                  <Button variant="outline" size="lg">
                    Back to Courses
                  </Button>
                </Link>
                <Button variant="primary" size="lg" onClick={() => window.location.reload()}>
                  Retake Quiz
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {quiz.questions.length}</span>
              <span className="text-sm text-gray-600">{Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h2>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[currentQuestion] === index && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
            >
              {currentQuestion === quiz.questions.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
