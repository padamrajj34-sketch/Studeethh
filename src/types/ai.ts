export interface AIMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: {
    tokens?: number
    model?: string
    processingTime?: number
  }
}

export interface AIConversation {
  id: string
  messages: AIMessage[]
  subject?: string
  topic?: string
  createdAt: Date
  updatedAt: Date
}

export interface AIQuestionRequest {
  subject: string
  topic: string
  questionType: 'multiple-choice' | 'short-answer' | 'true-false' | 'fill-blank'
  difficulty: 'easy' | 'medium' | 'hard'
  count: number
  includeExplanations: boolean
}

export interface AIExplanationRequest {
  question: string
  answer?: string
  subject: string
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface RAGRequest {
  content: string
  contentType: 'url' | 'text' | 'pdf'
  questionCount: number
  questionType: string
  difficulty: 'easy' | 'medium' | 'hard'
  subject: string
}

export interface AIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

export interface ContentSummary {
  summary: string
  keyPoints: string[]
  questions: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedStudyTime: number
}
