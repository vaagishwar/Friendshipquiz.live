import React, { createContext, useContext, useReducer, useEffect } from 'react'

const QuizContext = createContext()

const initialState = {
  quizzes: {},
  currentQuiz: null,
  quizResults: {}
}

function quizReducer(state, action) {
  switch (action.type) {
    case 'CREATE_QUIZ':
      const newQuiz = {
        id: action.payload.id,
        creatorName: action.payload.creatorName,
        questions: action.payload.questions,
        createdAt: new Date().toISOString(),
        participants: []
      }
      return {
        ...state,
        quizzes: {
          ...state.quizzes,
          [action.payload.id]: newQuiz
        },
        currentQuiz: newQuiz
      }
    
    case 'LOAD_QUIZ':
      const existingQuiz = state.quizzes[action.payload.id]
      
      if (existingQuiz) {
        return {
          ...state,
          currentQuiz: existingQuiz
        }
      }
      
      // If quiz doesn't exist, create a demo quiz for shared links
      const demoQuiz = {
        id: action.payload.id,
        creatorName: "Demo User",
        questions: [
          {
            question: "What helps you chill out?",
            options: [
              { text: "Dancing", image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=300&fit=crop&crop=center" },
              { text: "Reading", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center" },
              { text: "Listening music", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center" },
              { text: "Sleeping", image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop&crop=center" }
            ],
            correctAnswer: 0
          },
          {
            question: "What's your ideal weekend activity?",
            options: [
              { text: "Beach day", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&crop=center" },
              { text: "Movie marathon", image: "https://images.unsplash.com/photo-1489599328109-2b0c3e4b6e6b?w=400&h=300&fit=crop&crop=center" },
              { text: "Hiking", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&crop=center" },
              { text: "Shopping", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center" }
            ],
            correctAnswer: 1
          },
          {
            question: "What's your favorite type of food?",
            options: [
              { text: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center" },
              { text: "Sushi", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&crop=center" },
              { text: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center" },
              { text: "Pasta", image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&crop=center" }
            ],
            correctAnswer: 0
          },
          {
            question: "What's your dream vacation?",
            options: [
              { text: "Beach resort", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center" },
              { text: "City exploration", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop&crop=center" },
              { text: "Mountain retreat", image: "https://images.unsplash.com/photo-1464822759844-d150baec93c5?w=400&h=300&fit=crop&crop=center" },
              { text: "Adventure trip", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop&crop=center" }
            ],
            correctAnswer: 2
          },
          {
            question: "What's your favorite season?",
            options: [
              { text: "Spring", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop&crop=center" },
              { text: "Summer", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center" },
              { text: "Fall", image: "https://images.unsplash.com/photo-1507371341162-763b5e419618?w=400&h=300&fit=crop&crop=center" },
              { text: "Winter", image: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=400&h=300&fit=crop&crop=center" }
            ],
            correctAnswer: 1
          },
          {
            question: "What's your go-to drink?",
            options: [
              { text: "Coffee", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center" },
              { text: "Tea", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&crop=center" },
              { text: "Smoothie", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop&crop=center" },
              { text: "Water", image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop&crop=center" }
            ],
            correctAnswer: 0
          },
          {
            question: "What's your favorite time of day?",
            options: [
              { text: "Morning", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center" },
              { text: "Afternoon", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop&crop=center" },
              { text: "Evening", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center" },
              { text: "Night", image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop&crop=center" }
            ],
            correctAnswer: 0
          },
          {
            question: "What's your favorite way to exercise?",
            options: [
              { text: "Running", image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop&crop=center" },
              { text: "Yoga", image: "https://images.unsplash.com/photo-1506629905607-c52b8d0e3b5e?w=400&h=300&fit=crop&crop=center" },
              { text: "Swimming", image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop&crop=center" },
              { text: "Dancing", image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=300&fit=crop&crop=center" }
            ],
            correctAnswer: 0
          },
          {
            question: "What's your ideal pet?",
            options: [
              { text: "Dog", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=center" },
              { text: "Cat", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop&crop=center" },
              { text: "Bird", image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400&h=300&fit=crop&crop=center" },
              { text: "Fish", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center" }
            ],
            correctAnswer: 0
          },
          {
            question: "What's your favorite social media?",
            options: [
              { text: "Instagram", image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=300&fit=crop&crop=center" },
              { text: "TikTok", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=300&fit=crop&crop=center" },
              { text: "Twitter", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=300&fit=crop&crop=center" },
              { text: "Snapchat", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=300&fit=crop&crop=center" }
            ],
            correctAnswer: 0
          }
        ],
        createdAt: new Date().toISOString(),
        participants: []
      }
      
      return {
        ...state,
        quizzes: {
          ...state.quizzes,
          [action.payload.id]: demoQuiz
        },
        currentQuiz: demoQuiz
      }
    
    case 'SUBMIT_QUIZ_ANSWERS':
      const quiz = state.quizzes[action.payload.quizId]
      if (!quiz) return state
      
      const participant = {
        name: action.payload.participantName,
        answers: action.payload.answers,
        score: action.payload.score,
        submittedAt: new Date().toISOString()
      }
      
      const updatedQuiz = {
        ...quiz,
        participants: [...quiz.participants, participant]
      }
      
      return {
        ...state,
        quizzes: {
          ...state.quizzes,
          [action.payload.quizId]: updatedQuiz
        },
        currentQuiz: updatedQuiz
      }
    
    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        quizzes: action.payload.quizzes || {},
        quizResults: action.payload.quizResults || {}
      }
    
    default:
      return state
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState)
  
  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('friendshipQuizzes')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedData })
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }, [])
  
  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('friendshipQuizzes', JSON.stringify({
      quizzes: state.quizzes,
      quizResults: state.quizResults
    }))
  }, [state.quizzes, state.quizResults])
  
  const createQuiz = (creatorName, questions) => {
    const id = Math.random().toString(36).substr(2, 9)
    dispatch({
      type: 'CREATE_QUIZ',
      payload: { id, creatorName, questions }
    })
    return id
  }
  
  const loadQuiz = (id) => {
    dispatch({ type: 'LOAD_QUIZ', payload: { id } })
  }
  
  const submitQuizAnswers = (quizId, participantName, answers) => {
    const quiz = state.quizzes[quizId]
    if (!quiz) return null
    
    // Calculate score
    let score = 0
    answers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        score++
      }
    })
    
    dispatch({
      type: 'SUBMIT_QUIZ_ANSWERS',
      payload: { quizId, participantName, answers, score }
    })
    
    return score
  }
  
  const value = {
    ...state,
    createQuiz,
    loadQuiz,
    submitQuizAnswers
  }
  
  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}
