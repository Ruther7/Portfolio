import { Link } from 'react-router-dom'

function Projects() {
  const projects = [
    {
      title: "FCFS CPU Scheduler",
      description: "Interactive First-Come First-Served CPU scheduling algorithm simulator with Gantt chart visualization.",
      tags: ["React", "Algorithm", "Scheduling"],
      link: "/projects/fcfs-simulator",
      isInternal: true
    }
    // Add more projects here
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Projects</h1>
        <p className="text-pink-600 text-sm sm:text-base">Want to collaborate?</p>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center py-12 sm:py-20">
          <p className="text-gray-500 text-base sm:text-lg px-4">
            No projects yet. Add your projects by editing the projects array in src/pages/Projects.jsx
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-5 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-600 rounded text-xs sm:text-sm border border-blue-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {project.link && (
                project.isInternal ? (
                  <Link
                    to={project.link}
                    className="text-pink-600 hover:text-pink-700 font-medium text-sm sm:text-base"
                  >
                    View details →
                  </Link>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-700 font-medium text-sm sm:text-base"
                  >
                    View details →
                  </a>
                )
              )}
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  )
}

export default Projects

