import { NextRequest, NextResponse } from 'next/server'
import { AIService } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    console.log('AI Tutor API called')
    const body = await request.json()
    console.log('Request body:', body)
    
    const {
      question,
      answer,
      subject,
      topic,
      difficulty = 'medium'
    } = body

    console.log('Extracted params:', { question, answer, subject, topic, difficulty })

    // Validate required fields
    if (!question || !subject || !topic) {
      console.log('Validation failed: missing required fields')
      return NextResponse.json(
        { error: 'Question, subject, and topic are required' },
        { status: 400 }
      )
    }

    console.log('Calling AIService.explainConcept...')
    // Generate explanation
    const result = await AIService.explainConcept({
      question,
      answer,
      subject,
      topic,
      difficulty
    })

    console.log('AI Service result:', result)

    if (!result.success) {
      console.log('AI Service failed:', result.error)
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    console.log('Returning successful response')
    return NextResponse.json({
      success: true,
      explanation: result.data,
      usage: result.usage
    })

  } catch (error) {
    console.error('Error in ai-tutor API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Tutor API endpoint',
    usage: 'POST /api/ai-tutor with body: { question, answer?, subject, topic, difficulty? }'
  })
}
