import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Hi, I'm <span className="text-pink-600">Ruther Lee Laspina</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
            I love building simple, clean projects with a focus on usability and smooth interactions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4">
            <Link
              to="/projects"
              className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors text-center"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="bg-white text-gray-900 px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors text-center"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

