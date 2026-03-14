'use client'

import { useState, useEffect, useRef } from 'react'
import { Brain, Send, Loader2, BookOpen, Lightbulb, Target, Award, Clock, CheckCircle, AlertCircle, Star, Zap, Trophy, Sparkles, Flame, Rocket, Heart, Crown, Diamond, Medal, Gem, Infinity } from 'lucide-react'
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
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null)
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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

  const subjects = [
    { 
      id: 'Physics', 
      icon: '⚛️', 
      color: 'blue', 
      description: 'Forces, motion, energy, and matter',
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      bgGradient: 'from-blue-100 via-cyan-50 to-indigo-100',
      shadowColor: 'shadow-blue-500/50',
      glowColor: 'glow-blue'
    },
    { 
      id: 'Chemistry', 
      icon: '🧪', 
      color: 'green', 
      description: 'Elements, compounds, and reactions',
      gradient: 'from-emerald-400 via-green-500 to-teal-600',
      bgGradient: 'from-green-100 via-emerald-50 to-teal-100',
      shadowColor: 'shadow-green-500/50',
      glowColor: 'glow-green'
    },
    { 
      id: 'Mathematics', 
      icon: '📐', 
      color: 'purple', 
      description: 'Numbers, equations, and problem-solving',
      gradient: 'from-purple-400 via-violet-500 to-pink-600',
      bgGradient: 'from-purple-100 via-pink-50 to-violet-100',
      shadowColor: 'shadow-purple-500/50',
      glowColor: 'glow-purple'
    },
    { 
      id: 'Biology', 
      icon: '🧬', 
      color: 'red', 
      description: 'Living organisms and life processes',
      gradient: 'from-rose-400 via-red-500 to-orange-600',
      bgGradient: 'from-red-100 via-rose-50 to-orange-100',
      shadowColor: 'shadow-red-500/50',
      glowColor: 'glow-red'
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
      color: 'emerald', 
      bgColor: 'bg-gradient-to-r from-emerald-100 to-green-100', 
      borderColor: 'border-emerald-300',
      textColor: 'text-emerald-700',
      icon: '🌱',
      time: 45,
      gradient: 'from-emerald-400 to-green-500',
      shadowColor: 'shadow-emerald-500/50'
    },
    medium: { 
      color: 'amber', 
      bgColor: 'bg-gradient-to-r from-amber-100 to-yellow-100', 
      borderColor: 'border-amber-300',
      textColor: 'text-amber-700',
      icon: '⚡',
      time: 30,
      gradient: 'from-amber-400 to-yellow-500',
      shadowColor: 'shadow-amber-500/50'
    },
    hard: { 
      color: 'rose', 
      bgColor: 'bg-gradient-to-r from-rose-100 to-red-100', 
      borderColor: 'border-rose-300',
      textColor: 'text-rose-700',
      icon: '🔥',
      time: 20,
      gradient: 'from-rose-400 to-red-500',
      shadowColor: 'shadow-rose-500/50'
    }
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background with Mouse Follow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20 animate-pulse"></div>
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-400/30 blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
            transition: 'all 0.3s ease-out'
          }}
        ></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full animate-spin"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/30 to-blue-400/30 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full animate-pulse"></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(100)].map((_, i) => (
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
              {['🎉', '🎊', '✨', '🌟', '🎆', '💎', '👑', '🏆', '🎯', '🔥'][Math.floor(Math.random() * 10)]}
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Ultra Premium Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <div className="relative w-32 h-32 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-white/20">
                  <Brain className="w-16 h-16 text-white" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-spin">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                    <Diamond className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            <h1 className="text-7xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              AI <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">TUTOR</span>
            </h1>
            <p className="text-3xl text-white/90 max-w-4xl mx-auto mb-8 font-semibold">
              Elite AI-Powered Learning Experience for Academic Excellence
            </p>
            
            {/* Premium Stats */}
            <div className="flex justify-center gap-12 mb-8">
              <div className="text-center group transform hover:scale-125 transition-all duration-300">
                <div className="text-4xl font-black text-cyan-400 drop-shadow-lg">{50}+</div>
                <div className="text-sm text-white/80 font-semibold">Premium Topics</div>
              </div>
              <div className="text-center group transform hover:scale-125 transition-all duration-300">
                <div className="text-4xl font-black text-purple-400 drop-shadow-lg">{1000}+</div>
                <div className="text-sm text-white/80 font-semibold">Expert Questions</div>
              </div>
              <div className="text-center group transform hover:scale-125 transition-all duration-300">
                <div className="text-4xl font-black text-pink-400 drop-shadow-lg">24/7</div>
                <div className="text-sm text-white/80 font-semibold">Always Available</div>
              </div>
              <div className="text-center group transform hover:scale-125 transition-all duration-300">
                <div className="text-4xl font-black text-yellow-400 drop-shadow-lg">{streak}</div>
                <div className="text-sm text-white/80 font-semibold">Winning Streak 🔥</div>
              </div>
            </div>

            {/* Elite Streak Badge */}
            {streak >= 3 && (
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full text-white font-black text-lg shadow-2xl animate-bounce border-2 border-white/30">
                <Flame className="w-6 h-6 mr-2" />
                {streak} EPIC STREAK!
                <Medal className="w-6 h-6 ml-2" />
              </div>
            )}
          </div>

          {!showQuestions ? (
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Panel - Ultra Premium Subject Selection */}
              <div className="space-y-8">
                {/* Subject Selection */}
                <div className={`bg-gradient-to-br ${subjects.find(s => s.id === subject)?.bgGradient} rounded-3xl p-10 shadow-2xl border-2 border-white/30 backdrop-blur-sm transform hover:scale-105 transition-all duration-300`}>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center mr-4 animate-pulse">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Choose Subject</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {subjects.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setSubject(sub.id)}
                        onMouseEnter={() => setHoveredSubject(sub.id)}
                        onMouseLeave={() => setHoveredSubject(null)}
                        className={`group relative p-8 rounded-3xl border-2 transition-all duration-300 transform hover:scale-110 hover:rotate-3 ${
                          subject === sub.id 
                            ? 'border-white bg-white/90 shadow-2xl rotate-3' 
                            : 'border-white/30 hover:border-white/60 bg-white/20 backdrop-blur-sm'
                        }`}
                      >
                        <div className={`text-6xl mb-3 transition-all duration-300 ${hoveredSubject === sub.id ? 'scale-125 rotate-12' : ''}`}>{sub.icon}</div>
                        <div className="font-black text-gray-900 text-xl mb-2">{sub.id}</div>
                        <div className="text-sm text-gray-700 font-semibold">{sub.description}</div>
                        {subject === sub.id && (
                          <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse border-2 border-white">
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                        )}
                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${sub.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Topic Selection */}
                <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border-2 border-white/30 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center mr-4 animate-pulse">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Select Topic</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {topics[subject as keyof typeof topics]?.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTopic(t.id)}
                        onMouseEnter={() => setHoveredTopic(t.id)}
                        onMouseLeave={() => setHoveredTopic(null)}
                        className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 hover:rotate-2 ${
                          topic === t.id 
                            ? 'border-white bg-white/90 shadow-2xl rotate-2' 
                            : 'border-white/30 hover:border-white/60 bg-white/10 backdrop-blur-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-4xl transition-all duration-300 ${hoveredTopic === t.id ? 'scale-125 rotate-12' : ''}`}>{t.icon}</span>
                          <span className={`text-sm px-4 py-2 rounded-full font-black ${difficultyConfig[t.difficulty as keyof typeof difficultyConfig].bgColor} ${difficultyConfig[t.difficulty as keyof typeof difficultyConfig].textColor} border-2 border-white/50`}>
                            {t.difficulty}
                          </span>
                        </div>
                        <div className="font-black text-gray-900">{t.id}</div>
                        {topic === t.id && (
                          <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center animate-pulse border-2 border-white">
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                        )}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Selection */}
                <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border-2 border-white/30 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center mr-4 animate-pulse">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">Challenge Level</h2>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6 mb-10">
                    {(['easy', 'medium', 'hard'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 hover:rotate-3 ${
                          difficulty === level
                            ? `border-white bg-white/90 shadow-2xl rotate-3`
                            : 'border-white/30 hover:border-white/60 bg-white/10 backdrop-blur-sm'
                        }`}
                      >
                        <div className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300">
                          {difficultyConfig[level].icon}
                        </div>
                        <div className="font-black text-gray-900 text-lg capitalize mb-2">{level}</div>
                        <div className="text-sm text-gray-700 font-semibold">{difficultyConfig[level].time}s per question</div>
                        {difficulty === level && (
                          <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center animate-pulse border-2 border-white">
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                        )}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${difficultyConfig[level].gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                      </button>
                    ))}
                  </div>

                  <Button
                    onClick={handleGenerateQuestions}
                    loading={loading}
                    disabled={!topic}
                    className="w-full py-8 text-2xl font-black bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-800 text-white rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-8 h-8 mr-4 animate-spin" />
                        Generating Elite Questions...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-8 h-8 mr-4" />
                        START EPIC QUIZ
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Right Panel - Ultra Premium AI Tutor */}
              <div className="space-y-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border-2 border-white/30 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center mr-4 animate-pulse">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent">Ask AI Master</h2>
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <label className="block text-xl font-black text-white mb-4">
                        Your Question
                      </label>
                      <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask any question about Physics, Chemistry, Math, or Biology... 🤔"
                        className="w-full min-h-[160px] resize-none text-xl rounded-3xl border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/60 focus:border-cyan-400 focus:bg-white/30 transition-all duration-300 p-6 font-semibold"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-xl font-black text-white mb-4">
                        Your Answer (Optional) 💭
                      </label>
                      <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Share your thoughts if you have an answer..."
                        className="w-full min-h-[140px] resize-none text-xl rounded-3xl border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/60 focus:border-purple-400 focus:bg-white/30 transition-all duration-300 p-6 font-semibold"
                        rows={3}
                      />
                    </div>

                    <Button
                      onClick={handleExplainConcept}
                      loading={loading}
                      disabled={!question}
                      className="w-full py-8 text-2xl font-black bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 hover:from-purple-600 hover:via-pink-700 hover:to-red-700 text-white rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-8 h-8 mr-4 animate-spin" />
                          Generating Wisdom...
                        </>
                      ) : (
                        <>
                          <Brain className="w-8 h-8 mr-4" />
                          GET AI INSIGHTS
                        </>
                      )}
                    </Button>
                  </div>

                  {explanation && (
                    <div className="mt-10 p-10 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 rounded-3xl border-2 border-cyan-300 shadow-2xl animate-fadeIn">
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-4 animate-pulse">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">AI Wisdom</h3>
                      </div>
                      <div className="prose prose-xl max-w-none text-gray-800">
                        {explanation.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-4 font-semibold">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Quiz Interface */
            <div className="max-w-5xl mx-auto">
              {!quizCompleted ? (
                <div className={`bg-white/20 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border-2 border-white/30 ${animateCard ? 'animate-fadeIn' : ''}`}>
                  {/* Progress Bar */}
                  <div className="mb-10">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-black text-white">Question {currentQuestionIndex + 1} of {generatedQuestions.length}</span>
                      <span className="text-xl font-black text-cyan-400">{Math.round(progress)}% Complete</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-4 backdrop-blur-sm">
                      <div 
                        className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500 shadow-lg"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Timer */}
                  <div className="flex justify-center mb-10">
                    <div className={`flex items-center px-8 py-4 rounded-full border-2 border-white/30 backdrop-blur-sm ${
                      timeLeft <= 10 ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white' : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                    } shadow-2xl`}>
                      <Clock className="w-6 h-6 mr-3" />
                      <span className="font-black text-2xl">{timeLeft}s</span>
                    </div>
                  </div>

                  {/* Question */}
                  <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-6">
                      <span className={`text-2xl font-black px-6 py-3 rounded-full ${difficultyConfig[currentQuestion.difficulty].bgColor} ${difficultyConfig[currentQuestion.difficulty].textColor} border-2 border-white/50 shadow-lg`}>
                        {difficultyConfig[currentQuestion.difficulty].icon} {currentQuestion.difficulty.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-4xl font-black text-white mb-4 drop-shadow-lg">{currentQuestion.question}</h3>
                    <p className="text-xl text-white/80 font-semibold">Choose the best answer</p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {currentQuestion.options.map((option: string, optIndex: number) => (
                      <button
                        key={optIndex}
                        onClick={() => handleAnswerSelect(option)}
                        disabled={selectedAnswer !== null}
                        className={`group p-8 text-left rounded-3xl border-2 transition-all duration-300 transform hover:scale-105 hover:rotate-1 backdrop-blur-sm ${
                          selectedAnswer === option
                            ? option === currentQuestion.correctAnswer
                              ? 'border-green-400 bg-gradient-to-br from-green-400/30 to-emerald-400/30 shadow-2xl rotate-1'
                              : 'border-red-400 bg-gradient-to-br from-red-400/30 to-rose-400/30 shadow-2xl rotate-1'
                            : selectedAnswer !== null
                              ? 'border-white/20 bg-white/10 opacity-50'
                              : 'border-white/30 hover:border-white/60 bg-white/20 hover:bg-white/30 shadow-lg'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-12 h-12 rounded-full border-2 mr-6 flex items-center justify-center text-xl font-black transition-all duration-300 ${
                            selectedAnswer === option
                              ? option === currentQuestion.correctAnswer
                                ? 'border-green-400 bg-gradient-to-br from-green-400 to-emerald-500 text-white'
                                : 'border-red-400 bg-gradient-to-br from-red-400 to-rose-500 text-white'
                              : 'border-white/60 group-hover:border-cyan-400 bg-white/20 group-hover:bg-cyan-400/30 text-white'
                          }`}>
                            {selectedAnswer === option ? (
                              selectedAnswer === currentQuestion.correctAnswer ? '✓' : '✗'
                            ) : (
                              String.fromCharCode(65 + optIndex)
                            )}
                          </div>
                          <span className="text-xl font-semibold text-white">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Explanation */}
                  {showExplanation && (
                    <div className={`p-10 rounded-3xl border-2 backdrop-blur-sm animate-fadeIn ${
                      selectedAnswer === currentQuestion.correctAnswer
                        ? 'bg-gradient-to-br from-green-400/30 to-emerald-400/30 border-green-400'
                        : 'bg-gradient-to-br from-red-400/30 to-rose-400/30 border-red-400'
                    }`}>
                      <div className="flex items-center mb-6">
                        {selectedAnswer === currentQuestion.correctAnswer ? (
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-4 animate-pulse">
                            <CheckCircle className="w-8 h-8 text-white" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center mr-4 animate-pulse">
                            <AlertCircle className="w-8 h-8 text-white" />
                          </div>
                        )}
                        <span className="font-black text-2xl text-white">
                          {selectedAnswer === currentQuestion.correctAnswer ? 'BRILLIANT! 🎉' : 'KEEP LEARNING! 💪'}
                        </span>
                      </div>
                      <p className="text-xl text-white font-semibold">{currentQuestion.explanation}</p>
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
                        className="px-12 py-6 text-2xl font-black bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-800 text-white rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30"
                      >
                        NEXT CHALLENGE →
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                /* Quiz Completed */
                <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-16 shadow-2xl border-2 border-white/30 text-center animate-fadeIn">
                  <div className="flex justify-center mb-12">
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse border-4 border-white/30">
                        <Trophy className="w-16 h-16 text-white" />
                      </div>
                      <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center animate-spin">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center animate-bounce">
                        <Gem className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-6xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent mb-8">EPIC VICTORY! 🎉</h2>
                  
                  <div className="grid grid-cols-3 gap-12 mb-12">
                    <div className="text-center">
                      <div className="text-5xl font-black text-green-400 drop-shadow-lg">{getScore().correct}</div>
                      <div className="text-lg text-white font-semibold">Correct</div>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-black text-cyan-400 drop-shadow-lg">{totalScore}</div>
                      <div className="text-lg text-white font-semibold">Total Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-black text-purple-400 drop-shadow-lg">{Math.round((getScore().correct / getScore().total) * 100)}%</div>
                      <div className="text-lg text-white font-semibold">Accuracy</div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-8">
                    <Button
                      onClick={resetQuiz}
                      className="px-12 py-6 text-2xl font-black bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30"
                    >
                      NEW QUIZ
                    </Button>
                    <Button
                      onClick={startQuiz}
                      className="px-12 py-6 text-2xl font-black bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-800 text-white rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30"
                    >
                      RETRY CHALLENGE
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
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .glow-blue {
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
        }

        .glow-green {
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
        }

        .glow-purple {
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
        }

        .glow-red {
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
        }
      `}</style>
    </div>
  )
}
