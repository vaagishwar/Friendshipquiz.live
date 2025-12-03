import React, { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../config/firebase'
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, query, where, onSnapshot } from 'firebase/firestore'

const QuizContext = createContext()

export function QuizProvider({ children }) {
  const [quizzes, setQuizzes] = useState({})
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [loading, setLoading] = useState(false)

  // Create a new quiz
  const createQuiz = async (creatorName, questions) => {
    try {
      setLoading(true)
      const quizData = {
        creatorName,
        questions,
        createdAt: new Date().toISOString(),
        participants: []
      }
      
      const docRef = await addDoc(collection(db, 'quizzes'), quizData)
      const newQuiz = { id: docRef.id, ...quizData }
      
      setQuizzes(prev => ({
        ...prev,
        [docRef.id]: newQuiz
      }))
      setCurrentQuiz(newQuiz)
      
      return docRef.id
    } catch (error) {
      console.error('Error creating quiz:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Load quiz from Firestore
  const loadQuiz = async (quizId) => {
    try {
      setLoading(true)
      const docRef = doc(db, 'quizzes', quizId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        const quiz = { id: docSnap.id, ...docSnap.data() }
        setQuizzes(prev => ({
          ...prev,
          [quizId]: quiz
        }))
        setCurrentQuiz(quiz)
        
        // Set up real-time listener for updates
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
          if (snapshot.exists()) {
            const updatedQuiz = { id: snapshot.id, ...snapshot.data() }
            setQuizzes(prev => ({
              ...prev,
              [quizId]: updatedQuiz
            }))
            setCurrentQuiz(updatedQuiz)
          }
        })
        
        return unsubscribe
      } else {
        console.error('Quiz not found')
      }
    } catch (error) {
      console.error('Error loading quiz:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Submit quiz answers
  const submitQuizAnswers = async (quizId, participantName, answers) => {
    try {
      setLoading(true)
      const quiz = quizzes[quizId]
      if (!quiz) {
        console.error('Quiz not found')
        return null
      }
      
      // Calculate score
      let score = 0
      answers.forEach((answer, index) => {
        if (answer === quiz.questions[index].correctAnswer) {
          score++
        }
      })
      
      // Add participant to quiz
      const participant = {
        name: participantName,
        answers,
        score,
        submittedAt: new Date().toISOString()
      }
      
      const docRef = doc(db, 'quizzes', quizId)
      const updatedParticipants = [...(quiz.participants || []), participant]
      
      await updateDoc(docRef, {
        participants: updatedParticipants
      })
      
      return score
    } catch (error) {
      console.error('Error submitting quiz:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const value = {
    quizzes,
    currentQuiz,
    loading,
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
