'use client'

import { useState } from 'react'
import { BookOpen, Download, Search, Filter, Clock, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const subjects = [
    { id: 'physics', name: 'Physics', icon: '⚛️', color: 'blue' },
    { id: 'chemistry', name: 'Chemistry', icon: '🧪', color: 'green' },
    { id: 'mathematics', name: 'Mathematics', icon: '📐', color: 'purple' },
    { id: 'biology', name: 'Biology', icon: '🧬', color: 'red' }
  ]

  const notes = [
    {
      id: '1',
      title: 'Newton\'s Laws of Motion',
      subject: 'physics',
      difficulty: 'medium',
      description: 'Comprehensive notes on Newton\'s three laws with examples and practice problems.',
      downloadUrl: '#',
      rating: 4.8,
      downloads: 1250,
      lastUpdated: '2024-03-15'
    },
    {
      id: '2',
      title: 'Organic Chemistry Basics',
      subject: 'chemistry',
      difficulty: 'easy',
      description: 'Introduction to organic compounds, naming conventions, and basic reactions.',
      downloadUrl: '#',
      rating: 4.6,
      downloads: 980,
      lastUpdated: '2024-03-14'
    },
    {
      id: '3',
      title: 'Calculus: Derivatives',
      subject: 'mathematics',
      difficulty: 'hard',
      description: 'Complete guide to differentiation with rules, examples, and practice exercises.',
      downloadUrl: '#',
      rating: 4.9,
      downloads: 1100,
      lastUpdated: '2024-03-16'
    },
    {
      id: '4',
      title: 'Cell Structure and Function',
      subject: 'biology',
      difficulty: 'medium',
      description: 'Detailed notes on cell organelles, processes, and functions.',
      downloadUrl: '#',
      rating: 4.7,
      downloads: 890,
      lastUpdated: '2024-03-13'
    }
  ]

  const filteredNotes = notes.filter(note => {
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject
    const matchesDifficulty = selectedDifficulty === 'all' || note.difficulty === selectedDifficulty
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSubject && matchesDifficulty && matchesSearch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'physics': return 'text-blue-600 bg-blue-100'
      case 'chemistry': return 'text-green-600 bg-green-100'
      case 'mathematics': return 'text-purple-600 bg-purple-100'
      case 'biology': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Study <span className="gradient-text">Notes</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive study materials for +2 science students with downloadable notes
          </p>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="input-field"
              >
                <option value="all">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.icon} {subject.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="input-field"
              >
                <option value="all">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary-600" />
            <div className="text-2xl font-bold text-gray-900">150+</div>
            <div className="text-sm text-gray-600">Study Notes</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <Download className="w-8 h-8 mx-auto mb-2 text-secondary-600" />
            <div className="text-2xl font-bold text-gray-900">10K+</div>
            <div className="text-sm text-gray-600">Downloads</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <Star className="w-8 h-8 mx-auto mb-2 text-accent-600" />
            <div className="text-2xl font-bold text-gray-900">4.8</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <Clock className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-gray-900">24/7</div>
            <div className="text-sm text-gray-600">Access</div>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div key={note.id} className="card hover-lift">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {note.title}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubjectColor(note.subject)}`}>
                      {note.subject}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(note.difficulty)}`}>
                      {note.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{note.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {note.downloads} downloads
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {note.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Updated {note.lastUpdated}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(note.downloadUrl, '_blank')}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No notes found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search terms to find the study materials you need.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Use our AI tutor to generate personalized study materials for any topic
            </p>
            <Button
              variant="secondary"
              onClick={() => window.open('/ai-tutor', '_self')}
              className="bg-white text-primary-600 hover:bg-gray-100 font-bold"
            >
              Try AI Tutor
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
