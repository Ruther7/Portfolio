import { useState } from 'react'
import { Link } from 'react-router-dom'

function FcfsSimulator() {
  const [processes, setProcesses] = useState([])
  const [arrivalTime, setArrivalTime] = useState('')
  const [burstTime, setBurstTime] = useState('')
  const [count, setCount] = useState(5)
  const [results, setResults] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const addProcess = () => {
    if (arrivalTime === '' || burstTime === '') {
      alert('Please enter both Arrival Time and Burst Time')
      return
    }

    const newProcess = {
      id: `P${processes.length + 1}`,
      at: parseInt(arrivalTime),
      bt: parseInt(burstTime)
    }

    setProcesses([...processes, newProcess])
    setArrivalTime('')
    setBurstTime('')
  }

  const randomize = () => {
    const newProcesses = []
    for (let i = 0; i < count; i++) {
      newProcesses.push({
        id: `P${i + 1}`,
        at: Math.floor(Math.random() * 10),
        bt: Math.floor(Math.random() * 10) + 1
      })
    }
    setProcesses(newProcesses)
    setResults(null)
  }

  const deleteProcess = (id) => {
    setProcesses(processes.filter(p => p.id !== id))
    setResults(null)
    setShowResults(false)
  }

  const simulate = () => {
    if (processes.length === 0) {
      alert('Please add processes first')
      return
    }

    // Sort by arrival time (FCFS)
    const sorted = [...processes].sort((a, b) => a.at - b.at)
    
    let currentTime = 0
    const ganttChart = []
    const processResults = []

    sorted.forEach((process) => {
      const startTime = Math.max(currentTime, process.at)
      const completionTime = startTime + process.bt
      const turnaroundTime = completionTime - process.at
      const waitingTime = turnaroundTime - process.bt

      ganttChart.push({
        id: process.id,
        start: startTime,
        end: completionTime
      })

      processResults.push({
        ...process,
        ct: completionTime,
        tat: turnaroundTime,
        wt: waitingTime
      })

      currentTime = completionTime
    })

    const avgTAT = (processResults.reduce((sum, p) => sum + p.tat, 0) / processResults.length).toFixed(2)
    const avgWT = (processResults.reduce((sum, p) => sum + p.wt, 0) / processResults.length).toFixed(2)

    setResults({
      ganttChart,
      processResults,
      avgTAT,
      avgWT
    })
    setShowResults(true)
  }

  const reset = () => {
    setProcesses([])
    setResults(null)
    setShowResults(false)
    setArrivalTime('')
    setBurstTime('')
  }

  const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-blue-500', 'bg-cyan-500', 'bg-teal-500']

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link to="/projects" className="inline-flex items-center text-gray-700 hover:text-gray-900 mb-4 font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </Link>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-white/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                CPU
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">FCFS Scheduler</h1>
                <p className="text-sm text-gray-600">First-Come, First-Served Algorithm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Side - Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Add Process Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/50">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white mr-2">+</span>
                Add Process
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Arrival Time</label>
                  <input
                    type="number"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    min="0"
                    placeholder="Enter arrival time"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Burst Time</label>
                  <input
                    type="number"
                    value={burstTime}
                    onChange={(e) => setBurstTime(e.target.value)}
                    min="1"
                    placeholder="Enter burst time"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <button
                  onClick={addProcess}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-medium shadow-md"
                >
                  Add to Queue
                </button>
              </div>
            </div>

            {/* Quick Generate */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-5 shadow-lg text-white">
              <h3 className="font-bold mb-3 flex items-center">
                <span className="mr-2 text-xl">⚡</span>
                Quick Generate
              </h3>
              <p className="text-xs mb-3 text-purple-100">Generate random processes instantly</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Number of Processes</label>
                  <input
                    type="number"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value) || 5)}
                    min="1"
                    max="20"
                    className="w-full px-3 py-2.5 rounded-lg focus:outline-none text-gray-900 font-medium"
                  />
                </div>
                <button
                  onClick={randomize}
                  className="w-full bg-white text-purple-600 py-2.5 rounded-lg hover:bg-purple-50 transition-all font-medium shadow-md"
                >
                  🎲 Randomize
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={simulate}
                disabled={processes.length === 0}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-bold shadow-lg disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed"
              >
                ▶ Run
              </button>
              <button
                onClick={reset}
                className="px-6 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-all font-medium shadow-lg"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Right Side - Queue and Results */}
          <div className="lg:col-span-2 space-y-4">
            {/* Process Queue */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 text-lg">Process Queue</h3>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                  {processes.length} {processes.length === 1 ? 'Process' : 'Processes'}
                </span>
              </div>
              
              {processes.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-3">📋</div>
                  <p className="text-gray-400 font-medium">No processes in queue</p>
                  <p className="text-gray-400 text-sm">Add processes to get started</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {processes.map((process, index) => (
                    <div
                      key={process.id}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border-2 border-gray-200 hover:border-indigo-300 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-10 h-10 ${colors[index % colors.length]} rounded-lg flex items-center justify-center text-white font-bold shadow-md`}>
                          {process.id.replace('P', '')}
                        </div>
                        <div className="flex gap-6">
                          <div>
                            <p className="text-xs text-gray-500 font-semibold">ARRIVAL</p>
                            <p className="font-bold text-gray-900">{process.at}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-semibold">BURST</p>
                            <p className="font-bold text-gray-900">{process.bt}</p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteProcess(process.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Results Section */}
            {showResults && results && (
              <div className="space-y-4">
                {/* Metrics Cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 shadow-lg text-white">
                    <p className="text-sm font-semibold text-blue-100 mb-1">Avg Turnaround Time</p>
                    <p className="text-4xl font-bold">{results.avgTAT}</p>
                    <p className="text-xs text-blue-100 mt-1">time units</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 shadow-lg text-white">
                    <p className="text-sm font-semibold text-green-100 mb-1">Avg Waiting Time</p>
                    <p className="text-4xl font-bold">{results.avgWT}</p>
                    <p className="text-xs text-green-100 mt-1">time units</p>
                  </div>
                </div>

                {/* Gantt Chart */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/50">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Gantt Chart</h3>
                  <div className="overflow-x-auto pb-4">
                    <div className="flex gap-1 min-w-max">
                      {results.ganttChart.map((item, index) => (
                        <div key={index} className="relative">
                          <div
                            className={`${colors[index % colors.length]} text-white px-4 py-6 rounded-lg font-bold text-center shadow-md flex items-center justify-center`}
                            style={{ minWidth: `${Math.max(item.end - item.start, 3) * 40}px` }}
                          >
                            {item.id}
                          </div>
                          <div className="flex justify-between text-xs font-semibold text-gray-600 mt-2 absolute w-full">
                            <span>{item.start}</span>
                            <span>{item.end}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results Table */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/50">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Detailed Results</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100 rounded-lg">
                          <th className="px-4 py-3 text-left font-bold text-gray-700">Process</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-700">AT</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-700">BT</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-700">CT</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-700">TAT</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-700">WT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.processResults.map((process, index) => (
                          <tr key={index} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-3 font-bold text-gray-900">{process.id}</td>
                            <td className="px-4 py-3 text-gray-700">{process.at}</td>
                            <td className="px-4 py-3 text-gray-700">{process.bt}</td>
                            <td className="px-4 py-3 text-gray-700">{process.ct}</td>
                            <td className="px-4 py-3 text-blue-600 font-semibold">{process.tat}</td>
                            <td className="px-4 py-3 text-green-600 font-semibold">{process.wt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FcfsSimulator

