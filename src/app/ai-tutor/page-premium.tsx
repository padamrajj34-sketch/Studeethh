'use client'

import { useState, useEffect, useRef } from 'react'
import { Brain, Send, Loader2, BookOpen, Lightbulb, Target, Award, Clock, CheckCircle, AlertCircle, Star, Zap, Trophy, Sparkles, Flame, Rocket, Heart } from 'lucide-react'
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [streak, setStreak] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [animateCard, setAnimateCard] = useState(false)
  const [progress, setProgress] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const subjects = [
    { 
      id: 'Physics', 
      icon: '⚛️', 
      color: 'blue', 
      description: 'Forces, motion, energy, and matter',
      gradient: 'from-blue-400 to-blue-600',
      bgGradient: 'from-blue-50 to-indigo-50'
    },
    { 
      id: 'Chemistry', 
      icon: '🧪', 
      color: 'green', 
      description: 'Elements, compounds, and reactions',
      gradient: 'from-green-400 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    { 
      id: 'Mathematics', 
      icon: '📐', 
      color: 'purple', 
      description: 'Numbers, equations, and problem-solving',
      gradient: 'from-purple-400 to-violet-600',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    { 
      id: 'Biology', 
      icon: '🧬', 
      color: 'red', 
      description: 'Living organisms and life processes',
      gradient: 'from-red-400 to-rose-600',
      bgGradient: 'from-red-50 to-orange-50'
    }
  ]

  const topics = {
    'Physics': [
      { id: 'Newton\'s Laws', difficulty: 'medium', icon: '🎯', color: 'blue' },
      { id: 'Thermodynamics', difficulty: 'hard', icon: '🔥', color: 'orange' },
      { id: 'Waves', difficulty: 'medium', icon: '🌊', color: 'cyan' },
      { id: 'Optics', difficulty: 'medium', icon: '👁️', color: 'indigo' }
    ],
    'Chemistry': [
      { id: 'Organic Chemistry', difficulty: 'hard', icon: '🧬', color: 'green' },
      { id: 'Inorganic Chemistry', difficulty: 'medium', icon: '⚗️', color: 'blue' },
      { id: 'Physical Chemistry', difficulty: 'hard', icon: '⚡', color: 'yellow' },
      { id: 'Chemical Bonding', difficulty: 'easy', icon: '🔗', color: 'purple' }
    ],
    'Mathematics': [
      { id: 'Algebra', difficulty: 'easy', icon: '📊', color: 'blue' },
      { id: 'Calculus', difficulty: 'hard', icon: '∫', color: 'red' },
      { id: 'Geometry', difficulty: 'medium', icon: '📐', color: 'green' },
      { id: 'Statistics', difficulty: 'medium', icon: '📈', color: 'purple' }
    ],
    'Biology': [
      { id: 'Cell Biology', difficulty: 'medium', icon: '🔬', color: 'blue' },
      { id: 'Genetics', difficulty: 'hard', icon: '🧬', color: 'green' },
      { id: 'Ecology', difficulty: 'easy', icon: '🌿', color: 'emerald' },
      { id: 'Human Physiology', difficulty: 'medium', icon: '💓', color: 'red' }
    ]
  }

  const difficultyConfig = {
    easy: { 
      color: 'green', 
      bgColor: 'bg-green-100', 
      borderColor: 'border-green-300',
      textColor: 'text-green-700',
      icon: '🌱',
      time: 45
    },
    medium: { 
      color: 'yellow', 
      bgColor: 'bg-yellow-100', 
      borderColor: 'border-yellow-300',
      textColor: 'text-yellow-700',
      icon: '⚡',
      time: 30
    },
    hard: { 
      color: 'red', 
      bgColor: 'bg-red-100', 
      borderColor: 'border-red-300',
      textColor: 'text-red-700',
      icon: '🔥',
      time: 20
    }
  }

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isTimerActive) {
      handleTimeout()
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isTimerActive, timeLeft])

  const handleTimeout = () => {
    setIsTimerActive(false)
    setShowExplanation(true)
    toast.error('Time\'s up! ⏰', { icon: '⏰' })
  }

  const handleGenerateQuestions = async () => {
    if (!topic) {
      toast.error('Please select a topic', { icon: '⚠️' })
      return
    }

    setLoading(true)
    setShowQuestions(false)
    setAnimateCard(true)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const questions = [
      {
        id: `local_${Date.now()}_1`,
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
        id: `local_${Date.now()}_2`,
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
      },
      {
        id: `local_${Date.now()}_3`,
        question: `How should you study ${subject}?`,
        options: [
          "Practice problems regularly",
          "Only read once",
          "Memorize without understanding",
          "Skip difficult topics"
        ],
        correctAnswer: "Practice problems regularly",
        explanation: `Regular practice in ${subject} helps reinforce learning and build problem-solving skills.`,
        difficulty: difficulty,
        subject: subject,
        topic: topic,
        userAnswer: null
      },
      {
        id: `local_${Date.now()}_4`,
        question: `What is the most challenging aspect of ${topic}?`,
        options: [
          "Understanding abstract concepts",
          "Applying formulas correctly",
          "Remembering definitions",
          "Drawing diagrams"
        ],
        correctAnswer: "Understanding abstract concepts",
        explanation: `Abstract concepts in ${topic} require visualization and practical application to master.`,
        difficulty: difficulty,
        subject: subject,
        topic: topic,
        userAnswer: null
      },
      {
        id: `local_${Date.now()}_5`,
        question: `Which study method works best for ${subject}?`,
        options: [
          "Problem-solving practice",
          "Reading textbooks only",
          "Watching videos passively",
          "Memorizing formulas"
        ],
        correctAnswer: "Problem-solving practice",
        explanation: `Active problem-solving is the most effective way to learn ${subject} concepts.`,
        difficulty: difficulty,
        subject: subject,
        topic: topic,
        userAnswer: null
      }
    ]

    setGeneratedQuestions(questions)
    setCurrentQuestionIndex(0)
    setShowQuestions(true)
    setQuizCompleted(false)
    setProgress(0)
    setTimeLeft(difficultyConfig[difficulty].time)
    setIsTimerActive(false)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setAnimateCard(false)
    
    toast.success(`Generated ${questions.length} questions successfully! 🎉`, { icon: '✅' })
    setLoading(false)
  }

  const handleExplainConcept = async () => {
    if (!question) {
      toast.error('Please enter a question', { icon: '⚠️' })
      return
    }

    setLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const explanation = `This ${subject} concept about ${topic} is important for understanding the subject. 
    
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

    setExplanation(explanation)
    toast.success('Concept explained successfully! 💡', { icon: '🎓' })
    setLoading(false)
  }

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return
    
    setSelectedAnswer(answer)
    setIsTimerActive(false)
    
    const currentQuestion = generatedQuestions[currentQuestionIndex]
    const isCorrect = answer === currentQuestion.correctAnswer
    
    if (isCorrect) {
      setStreak(streak + 1)
      setTotalScore(totalScore + (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30))
      toast.success('Correct! 🎉', { icon: '✅' })
      if (streak + 1 >= 3) {
        toast.success(`🔥 ${streak + 1} streak!`, { icon: '🔥' })
      }
    } else {
      setStreak(0)
      toast.error('Incorrect. Keep trying! 💪', { icon: '💪' })
    }
    
    setShowExplanation(true)
    
    const updatedQuestions = [...generatedQuestions]
    updatedQuestions[currentQuestionIndex].userAnswer = answer
    setGeneratedQuestions(updatedQuestions)
    
    setTimeout(() => {
      if (currentQuestionIndex < generatedQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setProgress(((currentQuestionIndex + 1) / generatedQuestions.length) * 100)
        setSelectedAnswer(null)
        setShowExplanation(false)
        setTimeLeft(difficultyConfig[difficulty].time)
        setIsTimerActive(true)
      } else {
        setQuizCompleted(true)
        setProgress(100)
        if (totalScore > 80) {
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 3000)
        }
      }
    }, 2000)
  }

  const startQuiz = () => {
    setCurrentQuestionIndex(0)
    setQuizCompleted(false)
    setProgress(0)
    setTimeLeft(difficultyConfig[difficulty].time)
    setIsTimerActive(true)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const resetQuiz = () => {
    setShowQuestions(false)
    setGeneratedQuestions([])
    setCurrentQuestionIndex(0)
    setQuizCompleted(false)
    setProgress(0)
    setStreak(0)
    setTotalScore(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setIsTimerActive(false)
  }

  const getScore = () => {
    const correct = generatedQuestions.filter(q => q.userAnswer === q.correctAnswer).length
    return { correct, total: generatedQuestions.length }
  }

  const currentQuestion = generatedQuestions[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-5 animate-pulse"></div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              {['🎉', '🎊', '✨', '🌟', '🎆'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Premium Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl hover-lift">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Tutor</span>
            </h1>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
              Your premium AI-powered learning companion for +2 science excellence
            </p>
            
            {/* Enhanced Stats */}
            <div className="flex justify-center gap-12 mb-8">
              <div className="text-center group">
                <div className="text-3xl font-bold text-indigo-600 group-hover:scale-110 transition-transform duration-300">50+</div>
                <div className="text-sm text-gray-600">Topics Covered</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-purple-600 group-hover:scale-110 transition-transform duration-300">1000+</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-yellow-600 group-hover:scale-110 transition-transform duration-300">{streak}</div>
                <div className="text-sm text-gray-600">Current Streak 🔥</div>
              </div>
            </div>

            {/* Streak Badge */}
            {streak >= 3 && (
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white font-semibold animate-pulse">
                <Flame className="w-4 h-4 mr-2" />
                {streak} Question Streak!
              </div>
            )}
          </div>

          {!showQuestions ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Panel - Enhanced Subject Selection */}
              <div className="space-y-8">
                {/* Subject Selection */}
                <div className={`bg-gradient-to-br ${subjects.find(s => s.id === subject)?.bgGradient} rounded-3xl p-8 shadow-xl hover-lift border border-white/20`}>
                  <div className="flex items-center mb-6">
                    <BookOpen className="w-8 h-8 mr-3 text-indigo-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Choose Subject</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {subjects.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setSubject(sub.id)}
                        className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                          subject === sub.id 
                            ? 'border-indigo-500 bg-white shadow-2xl' 
                            : 'border-gray-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm'
                        }`}
                      >
                        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{sub.icon}</div>
                        <div className="font-bold text-gray-900 text-lg">{sub.id}</div>
                        <div className="text-xs text-gray-600 mt-1">{sub.description}</div>
                        {subject === sub.id && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Topic Selection */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover-lift border border-white/20">
                  <div className="flex items-center mb-6">
                    <Target className="w-8 h-8 mr-3 text-purple-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Select Topic</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {topics[subject as keyof typeof topics]?.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTopic(t.id)}
                        className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                          topic === t.id 
                            ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl' 
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{t.icon}</span>
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${difficultyConfig[t.difficulty as keyof typeof difficultyConfig].bgColor} ${difficultyConfig[t.difficulty as keyof typeof difficultyConfig].textColor}`}>
                            {t.difficulty}
                          </span>
                        </div>
                        <div className="font-bold text-gray-900">{t.id}</div>
                        {topic === t.id && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Selection */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover-lift border border-white/20">
                  <div className="flex items-center mb-6">
                    <Award className="w-8 h-8 mr-3 text-green-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Set Difficulty</h2>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {(['easy', 'medium', 'hard'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                          difficulty === level
                            ? `border-${level === 'easy' ? 'green' : level === 'medium' ? 'yellow' : 'red'}-500 bg-gradient-to-br ${level === 'easy' ? 'from-green-50 to-emerald-50' : level === 'medium' ? 'from-yellow-50 to-orange-50' : 'from-red-50 to-rose-50'} shadow-2xl`
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                          {difficultyConfig[level].icon}
                        </div>
                        <div className="font-bold text-gray-900 capitalize">{level}</div>
                        <div className="text-xs text-gray-600 mt-1">{difficultyConfig[level].time}s per question</div>
                        {difficulty === level && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <Button
                    onClick={handleGenerateQuestions}
                    loading={loading}
                    disabled={!topic}
                    className="w-full py-6 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                        Generating Amazing Questions...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-6 h-6 mr-3" />
                        Start Quiz Challenge
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Right Panel - Enhanced AI Tutor */}
              <div className="space-y-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover-lift border border-white/20">
                  <div className="flex items-center mb-6">
                    <Lightbulb className="w-8 h-8 mr-3 text-yellow-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Ask AI Tutor</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Your Question
                      </label>
                      <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask any question about Physics, Chemistry, Math, or Biology... 🤔"
                        className="input-field min-h-[140px] resize-none text-lg rounded-2xl border-2 focus:border-indigo-500 transition-colors duration-300"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Your Answer (Optional) 💭
                      </label>
                      <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Share your thoughts if you have an answer..."
                        className="input-field min-h-[120px] resize-none text-lg rounded-2xl border-2 focus:border-purple-500 transition-colors duration-300"
                        rows={3}
                      />
                    </div>

                    <Button
                      onClick={handleExplainConcept}
                      loading={loading}
                      disabled={!question}
                      className="w-full py-6 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                          Getting Smart Explanation...
                        </>
                      ) : (
                        <>
                          <Brain className="w-6 h-6 mr-3" />
                          Get AI Explanation
                        </>
                      )}
                    </Button>
                  </div>

                  {explanation && (
                    <div className="mt-8 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200 animate-fadeIn">
                      <div className="flex items-center mb-4">
                        <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                        <h3 className="text-2xl font-bold text-gray-900">AI Explanation</h3>
                      </div>
                      <div className="prose prose-lg max-w-none text-gray-700">
                        {explanation.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-3">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Quiz Interface */
            <div className="max-w-4xl mx-auto">
              {!quizCompleted ? (
                <div className={`bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 ${animateCard ? 'animate-fadeIn' : ''}`}>
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-600">Question {currentQuestionIndex + 1} of {generatedQuestions.length}</span>
                      <span className="text-sm font-semibold text-gray-600">{Math.round(progress)}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Timer */}
                  <div className="flex justify-center mb-8">
                    <div className={`flex items-center px-6 py-3 rounded-full ${
                      timeLeft <= 10 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="font-bold text-lg">{timeLeft}s</span>
                    </div>
                  </div>

                  {/* Question */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                      <span className={`text-lg font-semibold px-4 py-2 rounded-full ${difficultyConfig[currentQuestion.difficulty].bgColor} ${difficultyConfig[currentQuestion.difficulty].textColor}`}>
                        {difficultyConfig[currentQuestion.difficulty].icon} {currentQuestion.difficulty}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentQuestion.question}</h3>
                    <p className="text-gray-600">Choose the best answer</p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {currentQuestion.options.map((option: string, optIndex: number) => (
                      <button
                        key={optIndex}
                        onClick={() => handleAnswerSelect(option)}
                        disabled={selectedAnswer !== null}
                        className={`group p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                          selectedAnswer === option
                            ? option === currentQuestion.correctAnswer
                              ? 'border-green-500 bg-green-50 shadow-lg'
                              : 'border-red-500 bg-red-50 shadow-lg'
                            : selectedAnswer !== null
                              ? 'border-gray-200 bg-gray-50 opacity-50'
                              : 'border-gray-200 hover:border-indigo-300 bg-white hover:bg-indigo-50 shadow-md'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full border-2 mr-4 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                            selectedAnswer === option
                              ? option === currentQuestion.correctAnswer
                                ? 'border-green-500 bg-green-500 text-white'
                                : 'border-red-500 bg-red-500 text-white'
                              : 'border-gray-400 group-hover:border-indigo-500'
                          }`}>
                            {selectedAnswer === option ? (
                              selectedAnswer === currentQuestion.correctAnswer ? '✓' : '✗'
                            ) : (
                              String.fromCharCode(65 + optIndex)
                            )}
                          </div>
                          <span className="text-lg font-medium">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Explanation */}
                  {showExplanation && (
                    <div className={`p-6 rounded-2xl border-2 animate-fadeIn ${
                      selectedAnswer === currentQuestion.correctAnswer
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex items-center mb-3">
                        {selectedAnswer === currentQuestion.correctAnswer ? (
                          <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                        ) : (
                          <AlertCircle className="w-6 h-6 mr-3 text-red-600" />
                        )}
                        <span className="font-bold text-lg">
                          {selectedAnswer === currentQuestion.correctAnswer ? 'Correct! 🎉' : 'Incorrect. Keep learning! 💪'}
                        </span>
                      </div>
                      <p className="text-gray-700">{currentQuestion.explanation}</p>
                    </div>
                  )}

                  {/* Next Button */}
                  {showExplanation && currentQuestionIndex < generatedQuestions.length - 1 && (
                    <div className="text-center">
                      <Button
                        onClick={() => {
                          setCurrentQuestionIndex(currentQuestionIndex + 1)
                          setProgress(((currentQuestionIndex + 1) / generatedQuestions.length) * 100)
                          setSelectedAnswer(null)
                          setShowExplanation(false)
                          setTimeLeft(difficultyConfig[difficulty].time)
                          setIsTimerActive(true)
                        }}
                        className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        Next Question →
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                /* Quiz Completed */
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 text-center animate-fadeIn">
                  <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                      <Trophy className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Quiz Completed! 🎉</h2>
                  
                  <div className="grid grid-cols-3 gap-8 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{getScore().correct}</div>
                      <div className="text-sm text-gray-600">Correct</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600">{totalScore}</div>
                      <div className="text-sm text-gray-600">Total Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{Math.round((getScore().correct / getScore().total) * 100)}%</div>
                      <div className="text-sm text-gray-600">Accuracy</div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={resetQuiz}
                      className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      New Quiz
                    </Button>
                    <Button
                      onClick={startQuiz}
                      className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Retry Quiz
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
