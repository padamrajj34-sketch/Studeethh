'use client'

import { useState, useEffect, useRef } from 'react'
import { Brain, Send, Loader2, BookOpen, Lightbulb, Target, Award, Clock, CheckCircle, MessageCircle, Sparkles, TrendingUp, User, Bot } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

export default function AITutorPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your AI tutor. I'm here to help you learn Physics, Chemistry, Mathematics, and Biology. What would you like to study today?",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [showQuickActions, setShowQuickActions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const subjects = [
    { id: 'all', name: 'All Subjects', icon: Brain, color: 'bg-blue-500' },
    { id: 'physics', name: 'Physics', icon: Target, color: 'bg-purple-500' },
    { id: 'chemistry', name: 'Chemistry', icon: Sparkles, color: 'bg-green-500' },
    { id: 'mathematics', name: 'Mathematics', icon: TrendingUp, color: 'bg-orange-500' },
    { id: 'biology', name: 'Biology', icon: Award, color: 'bg-red-500' }
  ]

  const quickActions = [
    { 
      id: 1, 
      title: 'Explain Concept', 
      description: 'Get detailed explanations of difficult topics',
      icon: Lightbulb,
      prompt: 'Can you explain Newton\'s laws of motion in simple terms?',
      subject: 'physics'
    },
    { 
      id: 2, 
      title: 'Practice Problems', 
      description: 'Generate practice questions with solutions',
      icon: Target,
      prompt: 'Give me 5 practice problems on chemical bonding with step-by-step solutions',
      subject: 'chemistry'
    },
    { 
      id: 3, 
      title: 'Study Tips', 
      description: 'Get personalized study strategies',
      icon: BookOpen,
      prompt: 'What are the best ways to study calculus effectively?',
      subject: 'mathematics'
    },
    { 
      id: 4, 
      title: 'Exam Preparation', 
      description: 'Prepare for upcoming exams and tests',
      icon: Award,
      prompt: 'Help me prepare for my biology final exam on cell biology',
      subject: 'biology'
    }
  ]

  const commonQuestions = [
    'What is photosynthesis?',
    'Explain the Pythagorean theorem',
    'How do chemical bonds form?',
    'What are Newton\'s three laws?',
    'Solve this equation: 2x + 5 = 15',
    'What is the structure of an atom?'
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setShowQuickActions(false)
    setIsLoading(true)

    try {
      console.log('Making API call to /api/ai-tutor with:', {
        question: message,
        subject: selectedSubject === 'all' ? 'General' : selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1),
        topic: 'General Question',
        difficulty: 'medium'
      })
      
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: message,
          subject: selectedSubject === 'all' ? 'General' : selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1),
          topic: 'General Question',
          difficulty: 'medium'
        })
      })

      console.log('API response status:', response.status)
      
      const data = await response.json()
      console.log('API response data:', data)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response')
      }

      const botResponse = {
        id: Date.now() + 1,
        type: 'bot' as const,
        content: data.explanation,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Error getting AI response:', error)
      
      // Fallback to local response
      console.log('Falling back to local response')
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot' as const,
        content: generateAIResponse(message),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "That's a great question! Let me explain this concept step by step. First, we need to understand the fundamental principles involved...",
      "I'd be happy to help you with that. This topic can be broken down into several key components. Let me walk you through each one...",
      "Excellent question! Many students find this topic challenging. Here's a simple way to understand it...",
      "Let me provide you with a clear explanation and some examples to help you grasp this concept better..."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleQuickAction = (action: typeof quickActions[0]) => {
    handleSendMessage(action.prompt)
  }

  const handleSubjectFilter = (subjectId: string) => {
    setSelectedSubject(subjectId)
    const filteredActions = subjectId === 'all' 
      ? quickActions 
      : quickActions.filter(action => action.subject === subjectId)
    
    if (filteredActions.length > 0) {
      setShowQuickActions(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Learning Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized help with your +2 science subjects. Ask questions, get explanations, and improve your understanding.
          </p>
        </div>

        {/* Subject Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 flex space-x-1">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => handleSubjectFilter(subject.id)}
                className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-colors ${
                  selectedSubject === subject.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <subject.icon className="w-4 h-4" />
                <span className="font-medium">{subject.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.type === 'bot' && (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-blue-600" />
                      </div>
                    )}
                    <div
                      className={`max-w-md px-4 py-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white ml-auto'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                    placeholder="Ask your question here..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={() => handleSendMessage(inputMessage)}
                    disabled={!inputMessage.trim() || isLoading}
                    variant="primary"
                    size="sm"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            {showQuickActions && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {quickActions
                    .filter(action => selectedSubject === 'all' || action.subject === selectedSubject)
                    .map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleQuickAction(action)}
                      className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <action.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{action.title}</h4>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Common Questions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Questions</h3>
              <div className="space-y-2">
                {commonQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 hover:text-gray-900"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Study Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Study Tip</h3>
              </div>
              <p className="text-sm text-gray-700">
                Take breaks every 25 minutes using the Pomodoro Technique. It helps maintain focus and improves retention!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}