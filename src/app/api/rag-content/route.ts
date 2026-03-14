import { NextRequest, NextResponse } from 'next/server'
import { AIService } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      content,
      contentType = 'text',
      questionCount = 5,
      questionType = 'multiple-choice',
      difficulty = 'medium',
      subject
    } = body

    // Validate required fields
    if (!content || !subject) {
      return NextResponse.json(
        { error: 'Content and subject are required' },
        { status: 400 }
      )
    }

    // Validate content length
    if (content.length > 10000) {
      return NextResponse.json(
        { error: 'Content is too long. Maximum 10,000 characters allowed.' },
        { status: 400 }
      )
    }

    // Process content with RAG
    const result = await AIService.processContentForRAG({
      content,
      contentType,
      questionCount,
      questionType,
      difficulty,
      subject
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      summary: result.data?.summary,
      questions: result.data?.questions,
      usage: result.usage
    })

  } catch (error) {
    console.error('Error in rag-content API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'RAG Content Processing API endpoint',
    usage: 'POST /api/rag-content with body: { content, contentType?, questionCount?, questionType?, difficulty?, subject }'
  })
}
