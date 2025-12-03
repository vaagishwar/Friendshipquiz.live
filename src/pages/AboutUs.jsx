import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Users, Share2, Trophy, ArrowRight } from 'lucide-react'

function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 text-pink-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Friendship Quizzes</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We believe that friendship is one of life's greatest treasures, and we've created the perfect way to celebrate and strengthen those bonds.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-6">
                It all started with a simple question: "How well do my friends really know me?" What began as classroom "how well do you know me quiz?" notes has evolved into a social media phenomenon that's bringing friends closer together, one question at a time.
              </p>
              <p className="mb-6">
                We noticed that in our fast-paced digital world, we often lose touch with the little details that make our friendships special. Those inside jokes, favorite memories, and personal quirks that define who we are. That's when we realized we needed a fun, engaging way to help friends reconnect and discover new things about each other.
              </p>
              <p>
                Today, Friendship Quizzes is more than just a quiz maker – it's a platform that celebrates friendship, creates lasting memories, and helps people strengthen their bonds through playful discovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              To strengthen friendships worldwide by creating fun, engaging experiences that help people discover and celebrate what makes their relationships special.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Users className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Bring Friends Together</h3>
              <p className="text-gray-600">
                We create opportunities for friends to connect, laugh, and learn more about each other through interactive quizzes and challenges.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Heart className="h-12 w-12 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Celebrate Friendship</h3>
              <p className="text-gray-600">
                Every quiz is a celebration of the unique bond between friends, highlighting the special memories and inside jokes that make each friendship one-of-a-kind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">
              See how we're bringing friends together around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2.3M+</div>
              <div className="text-lg text-gray-600">Quizzes Created</div>
              <p className="text-sm text-gray-500 mt-2">
                Millions of personalized friendship quizzes bringing people together
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">15M+</div>
              <div className="text-lg text-gray-600">Quiz Attempts</div>
              <p className="text-sm text-gray-500 mt-2">
                Friends testing their knowledge and having fun together
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">190+</div>
              <div className="text-lg text-gray-600">Countries</div>
              <p className="text-sm text-gray-500 mt-2">
                Friendship knows no borders – we're global!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Makes Us Special</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Share2 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Sharing</h3>
                <p className="text-gray-600">
                  No sign-ups, no downloads. Create a quiz and share it instantly across all social media platforms.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Results</h3>
                <p className="text-gray-600">
                  Watch as your friends take the quiz and see the leaderboard update in real-time.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Optimized</h3>
                <p className="text-gray-600">
                  Perfect experience on any device – create and take quizzes seamlessly on mobile or desktop.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-pink-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy Focused</h3>
                <p className="text-gray-600">
                  Your quizzes and data are stored securely. We respect your privacy and never share personal information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Test Your Friendships?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions of users who have already discovered the fun of friendship quizzes. Create your first quiz today!
          </p>
          <Link 
            to="/create" 
            className="inline-flex items-center bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105"
          >
            Create Your Quiz
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
