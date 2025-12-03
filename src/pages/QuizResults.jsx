import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import { Trophy, Medal, Award, Share2, Copy, RefreshCw, Home, Users } from 'lucide-react'

function QuizResults() {
  const { quizId } = useParams()
  const [searchParams] = useSearchParams()
  const { loadQuiz, currentQuiz } = useQuiz()
  const [currentParticipant, setCurrentParticipant] = useState(null)

  useEffect(() => {
    loadQuiz(quizId)
  }, [quizId, loadQuiz])

  useEffect(() => {
    const participantName = searchParams.get('participant')
    const score = searchParams.get('score')
    
    if (participantName && score && currentQuiz) {
      setCurrentParticipant({
        name: participantName,
        score: parseInt(score)
      })
    }
  }, [searchParams, currentQuiz])

  const getQuizUrl = () => {
    return `${window.location.origin}/quiz/${quizId}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getQuizUrl())
    alert('Quiz link copied to clipboard!')
  }

  const shareResult = () => {
    if (currentParticipant && currentQuiz) {
      const text = `I scored ${currentParticipant.score}/${currentQuiz.questions.length} on ${currentQuiz.creatorName}'s friendship quiz! Can you beat my score?`
      const url = getQuizUrl()
      
      if (navigator.share) {
        navigator.share({
          title: `${currentQuiz.creatorName}'s Friendship Quiz`,
          text: text,
          url: url
        })
      } else {
        const shareText = `${text} ${url}`
        navigator.clipboard.writeText(shareText)
        alert('Result copied to clipboard!')
      }
    }
  }

  const getScoreMessage = (score, total) => {
    const percentage = (score / total) * 100
    
    if (percentage === 100) {
      return { message: "Perfect! You're definitely best friends! 🎉", color: "text-green-600", bg: "bg-green-50" }
    } else if (percentage >= 80) {
      return { message: "Excellent! You know them really well! 🌟", color: "text-blue-600", bg: "bg-blue-50" }
    } else if (percentage >= 60) {
      return { message: "Good job! You're a great friend! 👏", color: "text-yellow-600", bg: "bg-yellow-50" }
    } else if (percentage >= 40) {
      return { message: "Not bad! You could get to know them better! 🤔", color: "text-orange-600", bg: "bg-orange-50" }
    } else {
      return { message: "Looks like you need to spend more time together! 😅", color: "text-red-600", bg: "bg-red-50" }
    }
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-orange-500" />
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</div>
    }
  }

  if (!currentQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    )
  }

  // Sort participants by score (descending)
  const sortedParticipants = [...currentQuiz.participants].sort((a, b) => b.score - a.score)
  
  // Add rank to participants
  const rankedParticipants = sortedParticipants.map((participant, index) => ({
    ...participant,
    rank: index + 1
  }))

  const currentParticipantRank = currentParticipant 
    ? rankedParticipants.find(p => p.name === currentParticipant.name)?.rank || null
    : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentQuiz.creatorName}'s Friendship Quiz Results
          </h1>
          <p className="text-gray-600">
            See how well everyone knows {currentQuiz.creatorName}!
          </p>
        </div>

        {/* Current Participant Result */}
        {currentParticipant && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center">
              <div className="mb-6">
                {currentParticipantRank && getRankIcon(currentParticipantRank)}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Great job, {currentParticipant.name}!
              </h2>
              
              <div className="text-4xl font-bold text-blue-600 mb-4">
                {currentParticipant.score}/{currentQuiz.questions.length}
              </div>
              
              <div className={`inline-block px-6 py-3 rounded-lg ${getScoreMessage(currentParticipant.score, currentQuiz.questions.length).bg}`}>
                <p className={`font-semibold ${getScoreMessage(currentParticipant.score, currentQuiz.questions.length).color}`}>
                  {getScoreMessage(currentParticipant.score, currentQuiz.questions.length).message}
                </p>
              </div>

              {currentParticipantRank && (
                <p className="text-gray-600 mt-4">
                  You ranked #{currentParticipantRank} out of {rankedParticipants.length} participants
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={shareResult}
                className="btn-primary flex items-center justify-center"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share Result
              </button>
              <Link
                to={`/quiz/${quizId}`}
                className="btn-secondary flex items-center justify-center"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Retake Quiz
              </Link>
            </div>
          </div>
        )}

        {/* Leaderboard */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Leaderboard</h3>
            <div className="flex items-center text-gray-600">
              <Users className="h-5 w-5 mr-2" />
              <span>{rankedParticipants.length} participants</span>
            </div>
          </div>

          {rankedParticipants.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No one has taken the quiz yet!</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={copyToClipboard}
                  className="btn-secondary flex items-center"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Quiz Link
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {rankedParticipants.map((participant, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                    currentParticipant && participant.name === currentParticipant.name
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getRankIcon(participant.rank)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {participant.name}
                        {currentParticipant && participant.name === currentParticipant.name && (
                          <span className="text-blue-600 ml-2">(You)</span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(participant.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">
                      {participant.score}/{currentQuiz.questions.length}
                    </div>
                    <div className="text-sm text-gray-500">
                      {Math.round((participant.score / currentQuiz.questions.length) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Share Quiz */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Challenge More Friends!
            </h3>
            <p className="text-gray-600 mb-6">
              Share this quiz with more friends and see who knows {currentQuiz.creatorName} best
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex gap-2 flex-1 max-w-md">
                <input
                  type="text"
                  value={getQuizUrl()}
                  readOnly
                  className="input-field flex-1 text-sm"
                />
                <button
                  onClick={copyToClipboard}
                  className="btn-secondary flex items-center px-4"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/"
                className="btn-secondary flex items-center justify-center mx-auto max-w-xs"
              >
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizResults
