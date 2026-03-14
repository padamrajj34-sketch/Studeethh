'use client'

import { Quiz } from '@/types/quiz'
import { Clock, Users, FileText, Target } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface QuizCardProps {
  quiz: Quiz
  onStart?: (quizId: string) => void
  showProgress?: boolean
  completed?: boolean
  score?: number
}

export function QuizCard({ 
  quiz, 
  onStart, 
  showProgress = false, 
  completed = false, 
  score 
}: QuizCardProps) {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  }

  const handleStart = () => {
    if (onStart) {
      onStart(quiz.id)
    }
  }

  return (
    <div className="card hover-lift group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
            {quiz.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{quiz.description}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyColors[quiz.difficulty]}`}>
          {quiz.difficulty}
        </span>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <FileText className="w-4 h-4" />
          <span>{quiz.questions.length} Questions</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{quiz.duration} min</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Target className="w-4 h-4" />
          <span>{quiz.totalMarks} marks</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>1.2k attempts</span>
        </div>
      </div>

      {/* Subject and Topic */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-medium text-gray-700">Subject:</span>
          <span className="text-gray-600">{quiz.subject}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-medium text-gray-700">Topic:</span>
          <span className="text-gray-600">{quiz.topic}</span>
        </div>
      </div>

      {/* Tags */}
      {quiz.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {quiz.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Progress/Score Display */}
      {showProgress && completed && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Your Score</span>
            <span className={`text-sm font-bold ${
              score && score >= 80 ? 'text-green-600' : 
              score && score >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {score}% 
              {score && score >= 80 && ' 🎉'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                score && score >= 80 ? 'bg-green-500' : 
                score && score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${score || 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        {completed ? (
          <>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleStart}
            >
              Retake Quiz
            </Button>
            <Link href={`/quiz/${quiz.id}/review`}>
              <Button variant="ghost" size="sm">
                Review
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Button 
              variant="primary" 
              size="sm" 
              className="flex-1"
              onClick={handleStart}
            >
              Start Quiz
            </Button>
            <Link href={`/quiz/${quiz.id}/preview`}>
              <Button variant="outline" size="sm">
                Preview
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
