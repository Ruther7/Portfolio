function About() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">About Me</h1>
          
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
          Hi, I'm Ruther Lee Laspina, a student who likes making simple projects and figuring things out as I go.
          </p>
          
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Outside of coding, I enjoy outdoor activities, exploring new places, and spending time with my family.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <span className="px-3 sm:px-4 py-2 bg-pink-50 text-pink-600 rounded-full text-xs sm:text-sm border border-pink-200">
              Team player
            </span>
            <span className="px-3 sm:px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs sm:text-sm border border-blue-200">
              Fast learner
            </span>
            <span className="px-3 sm:px-4 py-2 bg-green-50 text-green-600 rounded-full text-xs sm:text-sm border border-green-200">
              Detail oriented
            </span>
          </div>
        </div>
        
          <div className="flex justify-center mt-8 md:mt-0">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-gray-200">
            <img 
              src="/mypic.jpg" 
              alt="Ruther Lee Laspina"
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-lg object-cover mx-auto shadow-md"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg mx-auto flex items-center justify-center text-5xl sm:text-6xl hidden">
              👨‍🎓
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

