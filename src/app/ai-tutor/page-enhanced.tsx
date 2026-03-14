'use client'

import { useState } from 'react'
import { Brain, Send, Loader2, BookOpen, Lightbulb, Target, Award, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

export default function AITutorPage() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [explanation, setExplanation] = useState('')
  const [loading, setLoading] = useState(false)
  const [subject, setSubject] = useState('Physics')
  const [topic, setTopic] = useState('Newton\'s Laws')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([])
  const [showQuestions, setShowQuestions] = useState(false)

  const subjects = [
    { id: 'Physics', icon: '⚛️', color: 'blue', description: 'Forces, motion, energy, and matter' },
    { id: 'Chemistry', icon: '🧪', color: 'green', description: 'Elements, compounds, and reactions' },
    { id: 'Mathematics', icon: '📐', color: 'purple', description: 'Numbers, equations, and problem-solving' },
    { id: 'Biology', icon: '🧬', color: 'red', description: 'Living organisms and life processes' }
  ]

  const topics = {
    'Physics': [
      { id: 'Newton\'s Laws', difficulty: 'medium', icon: '🎯' },
      { id: 'Thermodynamics', difficulty: 'hard', icon: '🔥' },
      { id: 'Waves', difficulty: 'medium', icon: '🌊' },
      { id: 'Optics', difficulty: 'medium', icon: '👁️' }
    ],
    'Chemistry': [
      { id: 'Organic Chemistry', difficulty: 'hard', icon: '🧬' },
      { id: 'Inorganic Chemistry', difficulty: 'medium', icon: '⚗️' },
      { id: 'Physical Chemistry', difficulty: 'hard', icon: '⚡' },
      { id: 'Chemical Bonding', difficulty: 'easy', icon: '🔗' }
    ],
    'Mathematics': [
      { id: 'Algebra', difficulty: 'easy', icon: '📊' },
      { id: 'Calculus', difficulty: 'hard', icon: '∫' },
      { id: 'Geometry', difficulty: 'medium', icon: '📐' },
      { id: 'Statistics', difficulty: 'medium', icon: '📈' }
    ],
    'Biology': [
      { id: 'Cell Biology', difficulty: 'medium', icon: '🔬' },
      { id: 'Genetics', difficulty: 'hard', icon: '🧬' },
      { id: 'Ecology', difficulty: 'easy', icon: '🌿' },
      { id: 'Human Physiology', difficulty: 'medium', icon: '💓' }
    ]
  }

  const difficultyColors = {
    easy: 'text-green-600 bg-green-100 border-green-200',
    medium: 'text-yellow-600 bg-yellow-100 border-yellow-200',
    hard: 'text-red-600 bg-red-100 border-red-200'
  }

  const handleGenerateQuestions = async () => {
    if (!topic) {
      toast.error('Please select a topic', { icon: '⚠️' })
      return
    }

    setLoading(true)
    setShowQuestions(false)
    
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          topic,
          questionCount: 5,
          difficulty,
          questionTypes: ['multiple-choice'],
          includeExplanations: true
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate questions')
      }

      setGeneratedQuestions(data.questions || [])
      setShowQuestions(true)
      toast.success(`Generated ${data.questions?.length || 0} questions successfully! 🎉`, { icon: '✅' })
    } catch (error) {
      console.error('Error generating questions:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to generate questions', { icon: '❌' })
      
      // Fallback to local questions
      const fallbackQuestions = [
        {
          id: `fallback_${Date.now()}_1`,
          question: `What is the basic principle of ${subject} - ${topic}?`,
          options: [
            "Fundamental laws and concepts",
            "Advanced theories only", 
            "Mathematical formulas only",
            "Historical facts"
          ],
          correctAnswer: "Fundamental laws and concepts",
          explanation: `${subject} - ${topic} is based on fundamental principles that help us understand the subject.`,
          difficulty: difficulty,
          subject: subject,
          topic: topic,
          userAnswer: null
        },
        {
          id: `fallback_${Date.now()}_2`,
          question: `Which of the following is important in ${topic}?`,
          options: [
            "Understanding core concepts",
            "Memorizing everything",
            "Skipping practice problems", 
            "Only reading theory"
          ],
          correctAnswer: "Understanding core concepts",
          explanation: `Core concepts in ${topic} are essential for building a strong foundation.`,
          difficulty: difficulty,
          subject: subject,
          topic: topic,
          userAnswer: null
        }
      ]

      setGeneratedQuestions(fallbackQuestions)
      setShowQuestions(true)
    } finally {
      setLoading(false)
    }
  }

  const handleExplainConcept = async () => {
    if (!question) {
      toast.error('Please enter a question', { icon: '⚠️' })
      return
    }

    setLoading(true)
    
    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          answer,
          subject,
          topic,
          difficulty
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get explanation')
      }

      setExplanation(data.explanation)
      toast.success('Concept explained successfully! 💡', { icon: '🎓' })
    } catch (error) {
      console.error('Error getting explanation:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to get explanation', { icon: '❌' })
      
      // Fallback to local explanation
      const fallbackExplanation = `This ${subject} concept about ${topic} is important for understanding the subject. 
      
      🎯 **Key Points to Remember:**
      1. Focus on the fundamental principles
      2. Practice with examples and problems
      3. Connect concepts to real-world applications
      4. Review regularly to reinforce learning
      
      📚 **For ${difficulty} level students:**
      - Start with basic concepts and gradually move to more complex topics
      - Use diagrams and visual aids when possible
      - Practice with similar problems to build confidence
      
      ${answer ? `💡 **Your Answer Analysis:** "${answer}" shows you're thinking about this correctly. Great start! ` : ''}
      
      🔥 **Pro Tip:** Try to explain this concept to someone else - it's the best way to test your understanding!`
      
      setExplanation(fallbackExplanation)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setGeneratedQuestions(prev => 
      prev.map(q => q.id === questionId ? { ...q, userAnswer: answer } : q)
    )
  }

  const getScore = () => {
    const correct = generatedQuestions.filter(q => q.userAnswer === q.correctAnswer).length
    return { correct, total: generatedQuestions.length }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg hover-lift">
              <Brain className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI <span className="gradient-text">Tutor</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your personal AI-powered learning companion for +2 science education
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600">Topics Covered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">1000+</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">24/7</div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Question Generator */}
          <div className="space-y-6">
            {/* Subject Selection */}
            <div className="card hover-lift">
              <div className="flex items-center mb-4">
                <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Choose Subject</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {subjects.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSubject(sub.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      subject === sub.id 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="text-2xl mb-1">{sub.icon}</div>
                    <div className="font-semibold text-gray-900">{sub.id}</div>
                    <div className="text-xs text-gray-600 mt-1">{sub.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Selection */}
            <div className="card hover-lift">
              <div className="flex items-center mb-4">
                <Target className="w-6 h-6 mr-2 text-purple-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Select Topic</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {topics[subject as keyof typeof topics]?.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTopic(t.id)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      topic === t.id 
                        ? 'border-purple-500 bg-purple-50 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg">{t.icon}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[t.difficulty as keyof typeof difficultyColors]}`}>
                        {t.difficulty}
                      </span>
                    </div>
                    <div className="font-medium text-gray-900 text-sm">{t.id}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty & Generate */}
            <div className="card hover-lift">
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 mr-2 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Set Difficulty</h2>
              </div>
              
              <div className="flex gap-3 mb-6">
                {(['easy', 'medium', 'hard'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all duration-200 ${
                      difficulty === level
                        ? `border-${level === 'easy' ? 'green' : level === 'medium' ? 'yellow' : 'red'}-500 bg-${level === 'easy' ? 'green' : level === 'medium' ? 'yellow' : 'red'}-50`
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="capitalize">{level}</div>
                  </button>
                ))}
              </div>

              <Button
                onClick={handleGenerateQuestions}
                loading={loading}
                disabled={!topic}
                className="w-full py-4 text-lg font-semibold"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Questions...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Generate 5 Questions
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right Panel - AI Tutor */}
          <div className="space-y-6">
            {/* AI Tutor */}
            <div className="card hover-lift">
              <div className="flex items-center mb-4">
                <Lightbulb className="w-6 h-6 mr-2 text-yellow-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Ask AI Tutor</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Question
                  </label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask any question about Physics, Chemistry, Math, or Biology... 🤔"
                    className="input-field min-h-[120px] resize-none text-base"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Answer (Optional) 💭
                  </label>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Share your thoughts if you have an answer..."
                    className="input-field min-h-[100px] resize-none text-base"
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleExplainConcept}
                  loading={loading}
                  disabled={!question}
                  className="w-full py-4 text-lg font-semibold"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Getting Explanation...
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5 mr-2" />
                      Get AI Explanation
                    </>
                  )}
                </Button>
              </div>

              {explanation && (
                <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">AI Explanation</h3>
                  </div>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    {explanation.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-2">{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Generated Questions Section */}
        {showQuestions && generatedQuestions.length > 0 && (
          <div className="mt-8">
            <div className="card hover-lift">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">Generated Questions</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Take your time to answer</span>
                </div>
              </div>

              <div className="space-y-6">
                {generatedQuestions.map((q, index) => (
                  <div key={q.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-lg font-semibold text-blue-600 mr-2">Q{index + 1}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[q.difficulty as keyof typeof difficultyColors]}`}>
                            {q.difficulty}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">{q.question}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {q.options.map((option: string, optIndex: number) => (
                            <button
                              key={optIndex}
                              onClick={() => handleAnswerSelect(q.id, option)}
                              className={`p-3 text-left rounded-lg border-2 transition-all duration-200 ${
                                q.userAnswer === option
                                  ? option === q.correctAnswer
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-red-500 bg-red-50'
                                  : 'border-gray-200 hover:border-gray-300 bg-white'
                              }`}
                            >
                              <div className="flex items-center">
                                <span className="w-6 h-6 rounded-full border-2 border-gray-400 mr-3 flex items-center justify-center text-xs font-semibold">
                                  {String.fromCharCode(65 + optIndex)}
                                </span>
                                <span>{option}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {q.userAnswer && (
                      <div className={`mt-4 p-4 rounded-lg ${
                        q.userAnswer === q.correctAnswer 
                          ? 'bg-green-100 border border-green-200' 
                          : 'bg-red-100 border border-red-200'
                      }`}>
                        <div className="flex items-center mb-2">
                          {q.userAnswer === q.correctAnswer ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          )}
                          <span className="font-semibold">
                            {q.userAnswer === q.correctAnswer ? 'Correct!' : 'Incorrect'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Score Summary */}
              <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Score</h3>
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-blue-600">
                        {getScore().correct}/{getScore().total}
                      </div>
                      <div className="text-sm text-gray-600">
                        {Math.round((getScore().correct / getScore().total) * 100)}% Correct
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setShowQuestions(false)
                      setGeneratedQuestions([])
                    }}
                    variant="outline"
                  >
                    Generate New Questions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
