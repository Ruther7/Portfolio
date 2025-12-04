import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Form Submitted')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Contact</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Have a question or want to collaborate? Send me a message.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="mb-5 sm:mb-6">
              <label htmlFor="name" className="block text-gray-700 mb-2 text-sm sm:text-base">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
              />
            </div>
            
            <div className="mb-5 sm:mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2 text-sm sm:text-base">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
              />
            </div>
            
            <div className="mb-5 sm:mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-2 text-sm sm:text-base">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none text-sm sm:text-base"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors text-sm sm:text-base"
            >
              Send
            </button>
          </form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

