// AI Service Factory - Use mock service when no API key is available
import { MockAIService } from './mock-ai'

// Check if OpenAI API key is available
const hasOpenAIKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here'

// OpenRouter AI Service - Real AI with proper headers
import { OpenRouterService } from './openrouter'

// Always use OpenRouter Service with real API
export const AIService = OpenRouterService

// Export types
export type { Question } from '@/types/quiz'
export type { AIResponse } from '@/types/ai'
export type { AIExplanationRequest, AIQuestionRequest, RAGRequest } from '@/types/ai'

// Export service for direct access
export { OpenRouterService }
