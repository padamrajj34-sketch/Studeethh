import OpenAI from 'openai'
import { Question } from '@/types/quiz'
import { AIResponse } from '@/types/ai'

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'X-OpenRouter-Title': 'STUDEETH - AI Education Platform',
  },
})

export class OpenRouterService {
  static async generateQuestions(params: {
    subject: string
    topic: string
    questionCount: number
    difficulty: 'easy' | 'medium' | 'hard'
    questionTypes: string[]
    includeExplanations: boolean
  }): Promise<AIResponse<Question[]>> {
    try {
      const prompt = `Generate ${params.questionCount} multiple-choice questions for ${params.subject} - ${params.topic}. 
      Difficulty: ${params.difficulty}. 
      Include explanations for each answer.
      
      Return as JSON array with format:
      [
        {
          "question": "...",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": "A",
          "explanation": "..."
        }
      ]`

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'google/gemini-pro',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      })

      const content = completion.choices[0]?.message?.content || '[]'
      const questionsData = JSON.parse(content)

      const questions: Question[] = questionsData.map((q: any, index: number) => ({
        id: `openrouter_${Date.now()}_${index}`,
        type: 'multiple-choice',
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: params.difficulty,
        subject: params.subject,
        topic: params.topic,
        marks: 1,
      }))

      return {
        success: true,
        data: questions,
        usage: {
          promptTokens: completion.usage?.prompt_tokens || 0,
          completionTokens: completion.usage?.completion_tokens || 0,
          totalTokens: completion.usage?.total_tokens || 0,
        },
      }
    } catch (error) {
      console.error('OpenRouter question generation error:', error)
      return {
        success: false,
        error: 'Failed to generate questions',
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      }
    }
  }

  static async explainConcept(params: {
    question: string
    answer?: string
    subject: string
    topic: string
    difficulty: 'easy' | 'medium' | 'hard'
  }): Promise<AIResponse<string>> {
    try {
      console.log('OpenRouterService.explainConcept called with:', params)
      
      const prompt = `Explain this ${params.subject} concept for a ${params.difficulty} level student:
      
      Question: ${params.question}
      ${params.answer ? `Student's answer: ${params.answer}` : ''}
      Topic: ${params.topic}
      
      Provide a clear, educational explanation with examples.`

      console.log('Sending prompt to OpenRouter:', prompt)
      console.log('Using model:', process.env.OPENAI_MODEL || 'google/gemini-pro')
      console.log('API Key exists:', !!process.env.OPENAI_API_KEY)

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'google/gemini-pro',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      })

      console.log('OpenRouter response:', completion)

      return {
        success: true,
        data: completion.choices[0]?.message?.content || 'Explanation not available.',
        usage: {
          promptTokens: completion.usage?.prompt_tokens || 0,
          completionTokens: completion.usage?.completion_tokens || 0,
          totalTokens: completion.usage?.total_tokens || 0,
        },
      }
    } catch (error) {
      console.error('OpenRouter explanation error:', error)
      return {
        success: false,
        error: 'Failed to generate explanation',
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      }
    }
  }

  static async processContentForRAG(params: {
    content: string
    contentType: 'url' | 'text' | 'pdf'
    questionCount: number
    questionType: string
    difficulty: 'easy' | 'medium' | 'hard'
    subject: string
  }): Promise<AIResponse<{ summary: string; questions: Question[] }>> {
    try {
      const prompt = `Analyze this ${params.subject} study material and:
      1. Provide a concise summary
      2. Generate ${params.questionCount} ${params.questionType} questions (${params.difficulty} difficulty)
      
      Content: ${params.content.substring(0, 4000)}...
      
      Return as JSON:
      {
        "summary": "...",
        "questions": [
          {
            "question": "...",
            "options": ["A", "B", "C", "D"],
            "correctAnswer": "A",
            "explanation": "..."
          }
        ]
      }`

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'google/gemini-pro',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      })

      const content = completion.choices[0]?.message?.content || '{"summary": "","questions": []}'
      const result = JSON.parse(content)

      const questions: Question[] = result.questions.map((q: any, index: number) => ({
        id: `openrouter_rag_${Date.now()}_${index}`,
        type: params.questionType as 'multiple-choice',
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: params.difficulty,
        subject: params.subject,
        topic: 'Extracted from content',
        marks: 1,
      }))

      return {
        success: true,
        data: {
          summary: result.summary,
          questions,
        },
        usage: {
          promptTokens: completion.usage?.prompt_tokens || 0,
          completionTokens: completion.usage?.completion_tokens || 0,
          totalTokens: completion.usage?.total_tokens || 0,
        },
      }
    } catch (error) {
      console.error('OpenRouter RAG error:', error)
      return {
        success: false,
        error: 'Failed to process content',
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      }
    }
  }
}
