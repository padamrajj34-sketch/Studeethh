'use client'

import Link from 'next/link'
import { Subject } from '@/types/course'
import { Clock, BookOpen, Star, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface CourseCardProps {
  subject: Subject
  showProgress?: boolean
  progress?: number
}

export function CourseCard({ subject, showProgress = false, progress = 0 }: CourseCardProps) {
  const totalTopics = subject.topics.length
  const estimatedHours = subject.topics.reduce((total, topic) => total + topic.estimatedHours, 0)

  return (
    <div className="card hover-lift group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: subject.color }}
          >
            {subject.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {subject.name}
            </h3>
            <p className="text-sm text-gray-500">{subject.code}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600">4.8</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {subject.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-gray-500">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm">{totalTopics}</span>
          </div>
          <p className="text-xs text-gray-400">Topics</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{estimatedHours}h</span>
          </div>
          <p className="text-xs text-gray-400">Duration</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-gray-500">
            <Users className="w-4 h-4" />
            <span className="text-sm">2.5k</span>
          </div>
          <p className="text-xs text-gray-400">Students</p>
        </div>
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-900">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Topics Preview */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Key Topics:</p>
        <div className="flex flex-wrap gap-1">
          {subject.topics.slice(0, 3).map((topic) => (
            <span
              key={topic.id}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
            >
              {topic.name}
            </span>
          ))}
          {subject.topics.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
              +{subject.topics.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Action Button */}
      <Link href={`/courses/${subject.id}`}>
        <Button variant="primary" size="sm" className="w-full">
          {showProgress ? 'Continue Learning' : 'Start Learning'}
        </Button>
      </Link>
    </div>
  )
}
