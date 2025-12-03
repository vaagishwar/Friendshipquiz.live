import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import { ArrowRight, ArrowLeft, Clock, User, Heart } from 'lucide-react'

function TakeQuiz() {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const { loadQuiz, currentQuiz, submitQuizAnswers } = useQuiz()
  const [participantName, setParticipantName] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showNameForm, setShowNameForm] = useState(true)
  const [timeStarted, setTimeStarted] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (quizId) {
      loadQuiz(quizId)
      // Set a maximum loading time
      const loadingTimeout = setTimeout(() => {
        setIsLoading(false)
      }, 2000)
      
      return () => clearTimeout(loadingTimeout)
    }
  }, [quizId, loadQuiz])

  useEffect(() => {
    if (currentQuiz) {
      setIsLoading(false)
    }
  }, [currentQuiz])

  useEffect(() => {
    if (currentQuiz && currentQuiz.questions) {
      setAnswers(new Array(currentQuiz.questions.length).fill(null))
    }
  }, [currentQuiz])

  const handleNameSubmit = (e) => {
    e.preventDefault()
    if (participantName.trim()) {
      setShowNameForm(false)
      setTimeStarted(new Date())
    }
  }

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = async () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = selectedAnswer
      setAnswers(newAnswers)
      setSelectedAnswer(null)

      if (currentQuestion < currentQuiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // Submit quiz
        try {
          setIsLoading(true)
          const score = await submitQuizAnswers(quizId, participantName, newAnswers)
          navigate(`/results/${quizId}?participant=${encodeURIComponent(participantName)}&score=${score}`)
        } catch (error) {
          console.error('Error submitting quiz:', error)
          alert('Error submitting quiz. Please try again.')
          setIsLoading(false)
        }
      }
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1])
    }
  }

  // Show loading only if we're still loading AND don't have a quiz yet
  if (isLoading && !currentQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
          {!quizId && (
            <p className="text-red-500 mt-2">Invalid quiz link</p>
          )}
        </div>
      </div>
    )
  }

  // If we're not loading but still don't have a quiz, show error
  if (!isLoading && !currentQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Quiz not found</p>
          <p className="text-gray-600">This quiz link may be invalid or expired.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-4 btn-primary"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    )
  }

  if (showNameForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-8">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <Heart className="h-16 w-16 text-pink-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {currentQuiz.creatorName}'s Friendship Quiz
              </h1>
              <p className="text-gray-600">
                Test how well you know {currentQuiz.creatorName}!
              </p>
            </div>

            <form onSubmit={handleNameSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's your name?
                </label>
                <input
                  type="text"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  placeholder="Enter your name"
                  className="input-field"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center"
              >
                Start Quiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              <div className="flex items-center justify-center space-x-4">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {currentQuiz.questions.length} questions
                </span>
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {currentQuiz.participants.length} participants
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / currentQuiz.questions.length) * 100
  const question = currentQuiz.questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {currentQuiz.creatorName}'s Quiz
          </h1>
          <p className="text-gray-600">
            Hi {participantName}! Let's see how well you know {currentQuiz.creatorName}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {currentQuiz.questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            {question.question}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`relative overflow-hidden rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
                  selectedAnswer === index
                    ? 'ring-4 ring-blue-500 scale-105'
                    : ''
                }`}
              >
                <div className="aspect-square relative">
                  {/* Handle both string options (legacy) and object options (new) */}
                  {typeof option === 'string' ? (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-4xl mb-2">📝</div>
                        <div className="font-semibold text-lg text-gray-800">{option}</div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img 
                        src={option.image || `https://via.placeholder.com/400x300/6366f1/ffffff?text=${encodeURIComponent(option.text || option)}`}
                        alt={option.text || option}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/400x300/6366f1/ffffff?text=${encodeURIComponent(option.text || option)}`
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                        <div className="w-full p-4">
                          <div className="text-white font-semibold text-lg text-center">
                            {option.text || option}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {selectedAnswer === index && (
                    <div className="absolute top-2 right-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Previous
          </button>

          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              selectedAnswer === null
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {currentQuestion === currentQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        {/* Quiz Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Created by {currentQuiz.creatorName}</p>
          <p>{currentQuiz.participants.length} people have taken this quiz</p>
        </div>
      </div>
    </div>
  )
}

export default TakeQuiz
