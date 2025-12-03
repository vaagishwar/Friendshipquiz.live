import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import { ArrowRight, ArrowLeft, Plus, Trash2, Copy, Share2, CheckCircle, Trophy } from 'lucide-react'

function CreateQuiz() {
  const navigate = useNavigate()
  const { createQuiz } = useQuiz()
  const [currentStep, setCurrentStep] = useState(1)
  const [creatorName, setCreatorName] = useState('')
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [quizId, setQuizId] = useState(null)

  const predefinedQuestions = [
    {
      question: "What helps you chill out?",
      options: [
        { text: "Dancing", image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=300&fit=crop&crop=center", color: "bg-purple-500" },
        { text: "Reading", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center", color: "bg-blue-500" },
        { text: "Listening music", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center", color: "bg-green-500" },
        { text: "Sleeping", image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop&crop=center", color: "bg-indigo-500" },
        { text: "Go for a drive", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&crop=center", color: "bg-red-500" }
      ],
      correctAnswer: 0
    },
    {
      question: "What's your ideal weekend activity?",
      options: [
        { text: "Beach day", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&crop=center", color: "bg-cyan-500" },
        { text: "Movie marathon", image: "https://images.unsplash.com/photo-1489599328109-2b0c3e4b6e6b?w=400&h=300&fit=crop&crop=center", color: "bg-purple-500" },
        { text: "Hiking", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&crop=center", color: "bg-green-500" },
        { text: "Shopping", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center", color: "bg-pink-500" }
      ],
      correctAnswer: 0
    },
    {
      question: "What's your favorite type of food?",
      options: [
        { text: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center", color: "bg-orange-500" },
        { text: "Sushi", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&crop=center", color: "bg-teal-500" },
        { text: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center", color: "bg-yellow-500" },
        { text: "Pasta", image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&crop=center", color: "bg-red-500" }
      ],
      correctAnswer: 0
    },
    {
      question: "What's your dream vacation?",
      options: [
        { text: "Beach resort", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center", color: "bg-blue-500" },
        { text: "City exploration", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop&crop=center", color: "bg-gray-500" },
        { text: "Mountain retreat", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center", color: "bg-green-500" },
        { text: "Adventure trip", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop&crop=center", color: "bg-orange-500" }
      ],
      correctAnswer: 0
    },
    {
      question: "What's your favorite season?",
      options: [
        { text: "Spring", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop&crop=center", color: "bg-pink-500" },
        { text: "Summer", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center", color: "bg-yellow-500" },
        { text: "Fall", image: "https://images.unsplash.com/photo-1507371341162-763b5e419618?w=400&h=300&fit=crop&crop=center", color: "bg-orange-500" },
        { text: "Winter", image: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=400&h=300&fit=crop&crop=center", color: "bg-blue-500" }
      ],
      correctAnswer: 0
    },
    {
      question: "What's your go-to drink?",
      options: [
        { text: "Coffee", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center", color: "bg-amber-600" },
        { text: "Tea", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&crop=center", color: "bg-green-600" },
        { text: "Smoothie", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop&crop=center", color: "bg-pink-500" },
        { text: "Water", image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop&crop=center", color: "bg-blue-500" }
      ],
      correctAnswer: 0
    },
    {
      question: "What's your favorite time of day?",
      options: [
        { text: "Morning", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center", color: "bg-orange-500" },
        { text: "Afternoon", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center", color: "bg-yellow-500" },
        { text: "Evening", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center", color: "bg-purple-500" },
        { text: "Night", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center", color: "bg-indigo-500" }
      ],
      correctAnswer: 0
    },
    {
      question: "What's your favorite way to exercise?",
      options: [
        { text: "Running", image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop&crop=center", color: "bg-red-500" },
        { text: "Yoga", image: "https://images.unsplash.com/photo-1506629905607-c52b8d0e3b5e?w=400&h=300&fit=crop&crop=center", color: "bg-purple-500" },
        { text: "Swimming", image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop&crop=center", color: "bg-blue-500" },
        { text: "Dancing", image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=300&fit=crop&crop=center", color: "bg-pink-500" }
      ],
      correctAnswer: 0
    },
    {
      question: "What's your ideal pet?",
      options: [
        { text: "Dog", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=center", color: "bg-amber-500" },
        { text: "Cat", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop&crop=center", color: "bg-gray-500" },
        { text: "Bird", image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400&h=300&fit=crop&crop=center", color: "bg-blue-500" },
        { text: "Fish", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center", color: "bg-cyan-500" }
      ],
      correctAnswer: 0
    },
    {
      question: "What's your favorite social media?",
      options: [
        { text: "Instagram", image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=300&fit=crop&crop=center", color: "bg-pink-500" },
        { text: "TikTok", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=300&fit=crop&crop=center", color: "bg-black" },
        { text: "Twitter", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=300&fit=crop&crop=center", color: "bg-blue-500" },
        { text: "Snapchat", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=300&fit=crop&crop=center", color: "bg-yellow-500" }
      ],
      correctAnswer: 0
    }
  ]

  const handleNameSubmit = (e) => {
    e.preventDefault()
    if (creatorName.trim()) {
      setCurrentStep(2)
    }
  }

  const selectAnswer = (optionIndex) => {
    const currentQuestion = predefinedQuestions[currentQuestionIndex]
    const questionWithAnswer = {
      ...currentQuestion,
      correctAnswer: optionIndex,
      options: currentQuestion.options.map(opt => opt.text) // Convert to simple text array for storage
    }
    
    const newSelectedQuestions = [...selectedQuestions]
    newSelectedQuestions[currentQuestionIndex] = questionWithAnswer
    setSelectedQuestions(newSelectedQuestions)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < predefinedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // All questions completed, create quiz automatically
      finishQuizCreation()
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const skipQuestion = () => {
    nextQuestion()
  }

  const finishQuizCreation = () => {
    const validQuestions = selectedQuestions.filter(q => q && q.correctAnswer !== undefined)
    
    if (validQuestions.length >= 5) {
      const id = createQuiz(creatorName, validQuestions)
      setQuizId(id)
      setCurrentStep(3)
    } else {
      alert('Please answer at least 5 questions to create your quiz.')
    }
  }

  const getQuizUrl = () => {
    return `${window.location.origin}/quiz/${quizId}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getQuizUrl())
    alert('Quiz link copied to clipboard!')
  }

  const shareOnSocial = (platform) => {
    const url = getQuizUrl()
    const text = `Take my friendship quiz and see how well you know me! Created by ${creatorName}`
    
    let shareUrl = ''
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case 'instagram':
        copyToClipboard()
        alert('Link copied! You can now paste it in your Instagram story or bio.')
        return
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">
              {currentStep === 1 ? 'Step 1 of 3' : currentStep === 2 ? `Question ${currentQuestionIndex + 1} of ${predefinedQuestions.length}` : 'Step 3 of 3'}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {currentStep === 1 ? '33% Complete' : currentStep === 2 ? `${Math.round(((currentQuestionIndex + 1) / predefinedQuestions.length) * 100)}% Complete` : '100% Complete'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: currentStep === 1 ? '33%' : 
                       currentStep === 2 ? `${33 + ((currentQuestionIndex + 1) / predefinedQuestions.length) * 34}%` : 
                       '100%' 
              }}
            ></div>
          </div>
        </div>

        {/* Step 1: Enter Name */}
        {currentStep === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">What's Your Name?</h1>
              <p className="text-lg text-gray-600">
                Let your friends know whose quiz they're taking
              </p>
            </div>

            <form onSubmit={handleNameSubmit} className="max-w-md mx-auto">
              <div className="mb-6">
                <input
                  type="text"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  placeholder="Enter your name"
                  className="input-field text-center text-xl"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center"
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Answer Questions */}
        {currentStep === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {predefinedQuestions[currentQuestionIndex].question}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Choose the option that best describes you
              </p>
              <div className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {predefinedQuestions.length}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / predefinedQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {predefinedQuestions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    selectAnswer(index)
                    setTimeout(() => nextQuestion(), 500) // Auto advance after selection
                  }}
                  className={`relative overflow-hidden rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
                    selectedQuestions[currentQuestionIndex]?.correctAnswer === index 
                      ? 'ring-4 ring-blue-500 scale-105' 
                      : ''
                  }`}
                >
                  <div className="aspect-square relative">
                    <img 
                      src={option.image} 
                      alt={option.text}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x300/6366f1/ffffff?text=${encodeURIComponent(option.text)}`
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                      <div className="w-full p-4">
                        <div className="text-white font-semibold text-lg text-center">
                          {option.text}
                        </div>
                      </div>
                    </div>
                    {selectedQuestions[currentQuestionIndex]?.correctAnswer === index && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="h-8 w-8 text-white bg-blue-500 rounded-full" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentStep(1)}
                className="btn-secondary flex items-center"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back
              </button>

              <div className="flex gap-4">
                <button
                  onClick={skipQuestion}
                  className="btn-secondary"
                >
                  Skip
                </button>

                {currentQuestionIndex > 0 && (
                  <button
                    onClick={previousQuestion}
                    className="btn-secondary flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Previous
                  </button>
                )}

                {selectedQuestions.filter(q => q).length >= 5 && (
                  <button
                    onClick={finishQuizCreation}
                    className="btn-primary flex items-center"
                  >
                    Create Quiz
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Progress Info */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Answered: {selectedQuestions.filter(q => q).length} questions</p>
              <p>Minimum required: 5 questions</p>
            </div>
          </div>
        )}

        {/* Step 3: Share Quiz */}
        {currentStep === 3 && quizId && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Your Quiz is Ready!
              </h1>
              <p className="text-lg text-gray-600">
                Share your quiz link and see who knows you best
              </p>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Quiz Link:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={getQuizUrl()}
                  readOnly
                  className="input-field flex-1"
                />
                <button
                  onClick={copyToClipboard}
                  className="btn-secondary flex items-center"
                >
                  <Copy className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share on Social Media:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => shareOnSocial('whatsapp')}
                  className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => shareOnSocial('facebook')}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Facebook
                </button>
                <button
                  onClick={() => shareOnSocial('twitter')}
                  className="bg-blue-400 hover:bg-blue-500 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Twitter
                </button>
                <button
                  onClick={() => shareOnSocial('instagram')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Instagram
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate(`/results/${quizId}`)}
                className="btn-primary flex items-center justify-center"
              >
                <Trophy className="mr-2 h-5 w-5" />
                View Results
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn-secondary"
              >
                Create Another Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateQuiz
