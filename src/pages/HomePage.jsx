import React from 'react'
import { Link } from 'react-router-dom'
import { Users, Share2, Trophy, Heart, ArrowRight, Star, CheckCircle } from 'lucide-react'

function HomePage() {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Create Personal Quizzes",
      description: "Build custom quizzes with 15 personalized questions about yourself"
    },
    {
      icon: <Share2 className="h-8 w-8 text-green-500" />,
      title: "Share Instantly",
      description: "Get a shareable link and post it on any social media platform"
    },
    {
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      title: "Real-time Leaderboard",
      description: "See who knows you best with live scoring and rankings"
    }
  ]

  const steps = [
    {
      number: "1",
      title: "Enter Your Name",
      description: "So friends know whose challenge they're taking"
    },
    {
      number: "2", 
      title: "Add 15 Personalised Questions",
      description: "Choose prompts about favourite foods, inside jokes, bucket-list dreams—anything that screams you"
    },
    {
      number: "3",
      title: "Share the Link & Track Scores",
      description: "Post it on WhatsApp, Instagram, Snapchat, or any social media platform and watch your leaderboard update in real-time"
    }
  ]

  const benefits = [
    "No sign-up required - just click and create",
    "Mobile optimized for speed and fun", 
    "Real-time score tracking",
    "Unlimited quiz creation",
    "Social media ready sharing"
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Create Your Best Friend Quiz & See Who Knows You Best
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Ever wished you could bundle every inside joke, late-night confession, and legendary road-trip moment into one playful challenge?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center space-x-2 text-lg">
              <span className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">1</span>
              <span>Make your own quiz</span>
            </div>
            <ArrowRight className="h-6 w-6 rotate-90 sm:rotate-0" />
            <div className="flex items-center space-x-2 text-lg">
              <span className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">2</span>
              <span>Share it to your friends</span>
            </div>
            <ArrowRight className="h-6 w-6 rotate-90 sm:rotate-0" />
            <div className="flex items-center space-x-2 text-lg">
              <span className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">3</span>
              <span>Discover real best friends</span>
            </div>
          </div>

          <Link 
            to="/create" 
            className="inline-flex items-center bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          
          <p className="mt-6 text-blue-100">
            Join the <strong>2.3 million+</strong> creators already laughing at their results
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Friendship Quiz Maker?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The easiest way to create engaging quizzes that reveal who truly knows you best
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Create Your Friends Quiz in 3 Easy Steps
            </h2>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {step.number}
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-lg text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Makes Our Quiz Different?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/create" 
              className="inline-flex items-center bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105"
            >
              Create Your Quiz Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Join the Fun – Over 2.3M Quizzes Created!
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">2.3M+</div>
              <div className="text-xl text-gray-300">Quizzes Created</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">15M+</div>
              <div className="text-xl text-gray-300">Quiz Attempts</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">98%</div>
              <div className="text-xl text-gray-300">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 text-pink-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Friend Quiz?
          </h2>
          <p className="text-xl mb-8 text-pink-100">
            Your turn starts now. Create a quiz in less than a minute and discover who your real best friends are!
          </p>
          <Link 
            to="/create" 
            className="inline-flex items-center bg-white text-purple-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Start Creating
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
