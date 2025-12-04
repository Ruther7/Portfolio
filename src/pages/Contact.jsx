import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('https://formspree.io/f/xldqlgre', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success("Message sent! I'll get back to you soon 🚀")
        setFormData({ name: '', email: '', message: '' })
      } else {
        toast.error('Oops! Something went wrong. Try again?')
      }
    } catch (err) {
      toast.error('Network hiccup. Check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">  {/* Matches your purple theme */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Contact
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Have a question or want to collaborate? Send me a message.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm sm:text-base"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm sm:text-base"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all text-sm sm:text-base"
                    placeholder="Tell me about your project or question..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 rounded-md font-medium text-white transition-all flex items-center justify-center gap-3 text-sm sm:text-base ${
                    isLoading
                      ? 'bg-gray-600 cursor-not-allowed opacity-75'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact