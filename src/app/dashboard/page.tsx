'use client'

import { useState } from 'react'
import { 
  BookOpen, 
  Brain, 
  Target, 
  TrendingUp, 
  Calendar, 
  Clock,
  Award,
  BarChart3,
  Users,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { 
      label: 'Study Streak', 
      value: '7 days', 
      icon: Calendar, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    { 
      label: 'Questions Solved', 
      value: '234', 
      icon: Target, 
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    { 
      label: 'Study Hours', 
      value: '45.5', 
      icon: Clock, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    { 
      label: 'Accuracy Rate', 
      value: '87%', 
      icon: TrendingUp, 
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  const recentActivity = [
    { 
      type: 'quiz', 
      title: 'Physics: Newton\'s Laws', 
      score: '85%',
      time: '2 hours ago',
      icon: Target
    },
    { 
      type: 'study', 
      title: 'Chemistry: Organic Compounds', 
      duration: '45 min',
      time: '5 hours ago',
      icon: BookOpen
    },
    { 
      type: 'ai-tutor', 
      title: 'Math: Calculus Help', 
      questions: '12',
      time: '1 day ago',
      icon: Brain
    }
  ]

  const subjects = [
    { name: 'Physics', progress: 75, color: 'bg-blue-600' },
    { name: 'Chemistry', progress: 60, color: 'bg-green-600' },
    { name: 'Mathematics', progress: 82, color: 'bg-purple-600' },
    { name: 'Biology', progress: 45, color: 'bg-orange-600' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Student!</h1>
          <p className="text-gray-600">Track your learning progress and continue your educational journey.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {['overview', 'progress', 'achievements'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Subject Progress */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Progress</h3>
                  <div className="space-y-3">
                    {subjects.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color.replace('bg-', '#').replace('600', '600') }} />
                          <span className="font-medium text-gray-900">{subject.name}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`${subject.color} h-2 rounded-full transition-all duration-300`}
                              style={{ width: `${subject.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{subject.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <activity.icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-600">{activity.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {activity.score && <p className="font-medium text-green-600">{activity.score}</p>}
                          {activity.duration && <p className="text-sm text-gray-600">{activity.duration}</p>}
                          {activity.questions && <p className="text-sm text-gray-600">{activity.questions} questions</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Analytics</h3>
                <p className="text-gray-600 mb-6">Comprehensive progress tracking coming soon!</p>
                <Link href="/courses">
                  <Button variant="primary">Continue Learning</Button>
                </Link>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Achievements & Badges</h3>
                <p className="text-gray-600 mb-6">Earn badges and track your accomplishments!</p>
                <Link href="/courses">
                  <Button variant="primary">Start Earning</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/ai-tutor">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <Brain className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">AI Tutor</h3>
              <p className="text-gray-600 text-sm">Get help from our AI assistant</p>
            </div>
          </Link>
          
          <Link href="/courses">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <BookOpen className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Browse Courses</h3>
              <p className="text-gray-600 text-sm">Explore subjects and topics</p>
            </div>
          </Link>
          
          <Link href="/notes">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <Target className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Practice Quiz</h3>
              <p className="text-gray-600 text-sm">Test your knowledge</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
