export interface Question {
  id: string
  type: 'multiple-choice' | 'short-answer' | 'true-false' | 'fill-blank'
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  subject: string
  topic: string
  marks: number
}

export interface Quiz {
  id: string
  title: string
  description: string
  subject: string
  topic: string
  questions: Question[]
  totalMarks: number
  duration: number // in minutes
  difficulty: 'easy' | 'medium' | 'hard'
  createdAt: Date
  tags: string[]
}

export interface QuizResult {
  quizId: string
  score: number
  totalMarks: number
  percentage: number
  timeTaken: number // in seconds
  answers: Record<string, string>
  correctAnswers: number
  incorrectAnswers: number
  attemptedAt: Date
}

export interface QuizGenerationRequest {
  subject: string
  topic: string
  questionCount: number
  difficulty: 'easy' | 'medium' | 'hard'
  questionTypes: Question['type'][]
  includeExplanations: boolean
}
