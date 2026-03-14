import { NextRequest, NextResponse } from 'next/server'
import { AIService } from '@/lib/ai'
import { Question } from '@/types/quiz'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      subject,
      topic,
      questionCount = 5,
      difficulty = 'medium',
      questionTypes = ['multiple-choice'],
      includeExplanations = true
    } = body

    // Validate required fields
    if (!subject || !topic) {
      return NextResponse.json(
        { error: 'Subject and topic are required' },
        { status: 400 }
      )
    }

    // Validate question count
    if (questionCount < 1 || questionCount > 20) {
      return NextResponse.json(
        { error: 'Question count must be between 1 and 20' },
        { status: 400 }
      )
    }

    // Generate questions
    const result = await AIService.generateQuestions({
      subject,
      topic,
      questionCount,
      difficulty,
      questionTypes,
      includeExplanations
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      questions: result.data,
      usage: result.usage
    })

  } catch (error) {
    console.error('Error in generate-questions API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Question generation API endpoint',
    usage: 'POST /api/generate-questions with body: { subject, topic, questionCount?, difficulty?, questionTypes?, includeExplanations? }'
  })
}
