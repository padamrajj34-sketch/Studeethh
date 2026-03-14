export interface Topic {
  id: string
  name: string
  description: string
  subjectId: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedHours: number
}

export interface Subject {
  id: string
  name: string
  code: string
  description: string
  color: string
  icon: string
  topics: Topic[]
}

export interface Course {
  id: string
  subjectId: string
  title: string
  description: string
  topicIds: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedHours: number
  createdAt: Date
  updatedAt: Date
}
