import { Question, AIResponse } from '@/types'

export class MockAIService {
  static async generateQuestions(params: {
    subject: string
    topic: string
    questionCount: number
    difficulty: 'easy' | 'medium' | 'hard'
    questionTypes: string[]
    includeExplanations: boolean
  }): Promise<AIResponse<Question[]>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const mockQuestions = this.generateMockQuestions(params)
    
    return {
      success: true,
      data: mockQuestions,
      usage: {
        promptTokens: 100,
        completionTokens: 200,
        totalTokens: 300,
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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const explanation = this.generateMockExplanation(params)
    
    return {
      success: true,
      data: explanation,
      usage: {
        promptTokens: 50,
        completionTokens: 150,
        totalTokens: 200,
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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    const summary = this.generateMockSummary(params.content, params.subject)
    const questions = this.generateMockQuestions({
      subject: params.subject,
      topic: 'Extracted from content',
      questionCount: params.questionCount,
      difficulty: params.difficulty,
      questionTypes: [params.questionType],
      includeExplanations: true
    })
    
    return {
      success: true,
      data: {
        summary,
        questions
      },
      usage: {
        promptTokens: 200,
        completionTokens: 300,
        totalTokens: 500,
      }
    }
  }

  private static generateMockQuestions(params: {
    subject: string
    topic: string
    questionCount: number
    difficulty: 'easy' | 'medium' | 'hard'
    questionTypes: string[]
    includeExplanations: boolean
  }): Question[] {
    const questions: Question[] = []
    
    const questionTemplates = {
      'Physics': {
        'Newton\'s Laws': [
          {
            question: "According to Newton's first law of motion, an object at rest will remain at rest unless acted upon by?",
            options: ["Gravity", "Friction", "An external force", "Magnetic field"],
            correctAnswer: "An external force",
            explanation: "Newton's first law states that an object will remain at rest or in uniform motion unless acted upon by an external force."
          },
          {
            question: "What is the SI unit of force?",
            options: ["Joule", "Newton", "Watt", "Pascal"],
            correctAnswer: "Newton",
            explanation: "The SI unit of force is Newton (N), named after Sir Isaac Newton."
          }
        ],
        'Thermodynamics': [
          {
            question: "What is the first law of thermodynamics also known as?",
            options: ["Law of conservation of energy", "Law of entropy", "Zeroth law", "Second law"],
            correctAnswer: "Law of conservation of energy",
            explanation: "The first law of thermodynamics is essentially the law of conservation of energy applied to thermodynamic systems."
          }
        ]
      },
      'Chemistry': {
        'Organic Chemistry': [
          {
            question: "What is the general formula for alkanes?",
            options: ["CnH2n", "CnH2n+2", "CnH2n-2", "CnH2n+1"],
            correctAnswer: "CnH2n+2",
            explanation: "Alkanes are saturated hydrocarbons with the general formula CnH2n+2."
          }
        ],
        'Chemical Bonding': [
          {
            question: "Which type of bond involves the sharing of electron pairs?",
            options: ["Ionic bond", "Covalent bond", "Metallic bond", "Hydrogen bond"],
            correctAnswer: "Covalent bond",
            explanation: "Covalent bonds involve the sharing of electron pairs between atoms."
          }
        ]
      },
      'Mathematics': {
        'Calculus': [
          {
            question: "What is the derivative of x²?",
            options: ["2x", "x", "x²", "2"],
            correctAnswer: "2x",
            explanation: "Using the power rule, the derivative of x² is 2x."
          }
        ],
        'Algebra': [
          {
            question: "What is the solution to 2x + 5 = 13?",
            options: ["4", "8", "6", "3"],
            correctAnswer: "4",
            explanation: "2x + 5 = 13, so 2x = 8, therefore x = 4."
          }
        ]
      },
      'Biology': {
        'Cell Biology': [
          {
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
            correctAnswer: "Mitochondria",
            explanation: "Mitochondria are often called the powerhouse of the cell because they generate most of the cell's ATP."
          }
        ],
        'Genetics': [
          {
            question: "How many chromosomes do humans normally have?",
            options: ["23", "46", "48", "44"],
            correctAnswer: "46",
            explanation: "Humans normally have 46 chromosomes, arranged in 23 pairs."
          }
        ]
      }
    }

    const subjectQuestions = questionTemplates[params.subject as keyof typeof questionTemplates] || {}
    const topicQuestions = subjectQuestions[params.topic as keyof typeof subjectQuestions] || subjectQuestions['Newton\'s Laws'] || []

    for (let i = 0; i < Math.min(params.questionCount, topicQuestions.length); i++) {
      const template = topicQuestions[i] || topicQuestions[0]
      questions.push({
        id: `mock_question_${Date.now()}_${i}`,
        type: 'multiple-choice',
        question: template.question,
        options: template.options,
        correctAnswer: template.correctAnswer,
        explanation: template.explanation,
        difficulty: params.difficulty,
        subject: params.subject,
        topic: params.topic,
        marks: 1,
      })
    }

    return questions
  }

  private static generateMockExplanation(params: {
    question: string
    answer?: string
    subject: string
    topic: string
    difficulty: 'easy' | 'medium' | 'hard'
  }): string {
    const explanations = {
      'Physics': `This is a fundamental concept in physics. ${params.question} relates to the basic principles of motion and forces. In physics, we study how objects behave under various conditions. The key here is to understand the underlying physical laws that govern this phenomenon.`,
      'Chemistry': `This chemical concept is essential for understanding molecular interactions. ${params.question} involves the way atoms and molecules interact. Chemistry helps us understand the composition, structure, and properties of matter, and the changes it undergoes during chemical reactions.`,
      'Mathematics': `This mathematical concept builds on fundamental principles. ${params.question} requires understanding of basic mathematical operations and logical reasoning. Mathematics provides the language and tools for describing patterns and relationships in the world around us.`,
      'Biology': `This biological concept is crucial for understanding living systems. ${params.question} relates to how living organisms function and interact with their environment. Biology helps us understand the complexity of life at all levels, from molecules to ecosystems.`
    }

    return explanations[params.subject as keyof typeof explanations] || 
           `This is an important concept in ${params.subject}. ${params.question} requires careful analysis and understanding of the fundamental principles involved. Let me break this down for you in simple terms that are appropriate for ${params.difficulty} level students.`
  }

  private static generateMockSummary(content: string, subject: string): string {
    return `This ${subject.toLowerCase()} content covers key concepts and principles that are essential for +2 level students. The material discusses fundamental theories and provides examples that help in understanding the subject better. Key points include important definitions, formulas, and applications that students should focus on for their studies.`
  }
}
