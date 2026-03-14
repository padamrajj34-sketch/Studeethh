import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Log the contact request (you could save to database here)
    console.log('Contact request received:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    })

    // For now, just return success (in production, you'd send email here)
    return NextResponse.json(
      { 
        success: true,
        message: 'Contact form submitted successfully',
        data: {
          name,
          email,
          subject,
          message,
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Contact API endpoint',
    usage: 'POST /api/contact with body: { name, email, subject, message }'
  })
}
