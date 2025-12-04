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
    if (!arrivalTime || !burstTime) return alert('Fill both fields!')
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
    const newProcesses = Array.from({ length: count }, (_, i) => ({
      id: `P${i + 1}`,
      at: Math.floor(Math.random() * 10),
      bt: Math.floor(Math.random() * 10) + 1
    }))
    setProcesses(newProcesses)
    setResults(null)
    setShowResults(false)
  }

  const deleteProcess = (id) => {
    setProcesses(processes.filter(p => p.id !== id))
    setResults(null)
    setShowResults(false)
  }

  const simulate = () => {
    if (processes.length === 0) return alert('Add processes first!')

    const sorted = [...processes].sort((a, b) => a.at - b.at)
    let currentTime = 0
    const gantt = []
    const resultList = []

    sorted.forEach(p => {
      const start = Math.max(currentTime, p.at)
      const end = start + p.bt
      gantt.push({ id: p.id, start, end })
      resultList.push({
        ...p,
        ct: end,
        tat: end - p.at,
        wt: end - p.at - p.bt
      })
      currentTime = end
    })

    const avgTAT = (resultList.reduce((s, p) => s + p.tat, 0) / resultList.length).toFixed(2)
    const avgWT = (resultList.reduce((s, p) => s + p.wt, 0) / resultList.length).toFixed(2)

    setResults({ ganttChart: gantt, processResults: resultList, avgTAT, avgWT })
    setShowResults(true)
  }

  const reset = () => {
    setProcesses([])
    setResults(null)
    setShowResults(false)
    setArrivalTime('')
    setBurstTime('')
  }

  const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-blue-500', 'bg-cyan-500', 'bg-teal-500', 'bg-rose-500', 'bg-amber-500']

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button & Header */}
        <div className="mb-8">
          <Link to="/projects" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 text-sm font-medium">
            ← Back to Projects
          </Link>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                CPU
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">FCFS Scheduler</h1>
                <p className="text-gray-600">First-Come, First-Served Scheduling Algorithm</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Controls - Left */}
          <div className="space-y-5">
            {/* Add Process */}
            <div className="bg-white rounded-xl p-5 shadow-lg border">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Add Process</h3>
              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="Arrival Time"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                />
                <input
                  type="number"
                  placeholder="Burst Time"
                  value={burstTime}
                  onChange={(e) => setBurstTime(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                />
                <button
                  onClick={addProcess}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium transition"
                >
                  Add Process
                </button>
              </div>
            </div>

            {/* Random Generate */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-5 text-white">
              <h3 className="font-bold mb-3">Quick Generate</h3>
              <input
                type="number"
                min="1"
                max="20"
                value={count}
                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-3 rounded-lg text-gray-900 font-semibold mb-3"
              />
              <button
                onClick={randomize}
                className="w-full bg-white text-purple-600 py-3 rounded-lg hover:bg-purple-50 font-bold transition"
              >
                Randomize Processes
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={simulate}
                disabled={!processes.length}
                className="bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                Run
              </button>
              <button
                onClick={reset}
                className="bg-red-600 text-white py-4 rounded-lg font-bold hover:bg-red-700 transition"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Right Side - Queue & Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Process Queue */}
            <div className="bg-white rounded-xl p-5 shadow-lg border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Process Queue</h3>
                <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-bold">
                  {processes.length} Process{processes.length !== 1 && 'es'}
                </span>
              </div>

              {processes.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <div className="text-6xl mb-4">No processes yet</div>
                  <p>Add or generate processes to begin</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {processes.map((p, i) => (
                    <div key={p.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:border-indigo-300 transition">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${colors[i % colors.length]} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                          {p.id}
                        </div>
                        <div className="grid grid-cols-2 gap-6 text-sm">
                          <div>
                            <p className="text-gray-500 font-medium">Arrival</p>
                            <p className="font-bold text-gray-900">{p.at}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-medium">Burst</p>
                            <p className="font-bold text-gray-900">{p.bt}</p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteProcess(p.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2.375 2.375 0 0115.963 21H8.037a2.375 2.375 0 01-2.17-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3m8 0V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Results */}
            {showResults && results && (
              <>
                {/* Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-xl shadow-lg">
                    <p className="text-blue-100 text-sm font-medium">Average Turnaround Time</p>
                    <p className="text-4xl font-bold mt-2">{results.avgTAT}</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-6 rounded-xl shadow-lg">
                    <p className="text-emerald-100 text-sm font-medium">Average Waiting Time</p>
                    <p className="text-4xl font-bold mt-2">{results.avgWT}</p>
                  </div>
                </div>

                {/* Gantt Chart */}
                <div className="bg-white rounded-xl p-5 shadow-lg border overflow-x-auto">
                  <h3 className="text-xl font-bold mb-4">Gantt Chart</h3>
                  <div className="flex gap-2 min-w-max pb-2">
                    {results.ganttChart.map((block, i) => (
                      <div key={i} className="text-center">
                        <div
                          className={`${colors[i % colors.length]} text-white font-bold py-8 rounded-lg shadow-md flex items-center justify-center text-lg min-w-24`}
                          style={{ width: `${(block.end - block.start) * 50}px` }}
                        >
                          {block.id}
                        </div>
                        <div className="flex justify-between text-xs text-gray-600 mt-2 px-1">
                          <span>{block.start}</span>
                          <span>{block.end}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-lg border overflow-x-auto">
                  <table className="w-full min-w-max text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        {['Process', 'AT', 'BT', 'CT', 'TAT', 'WT'].map(h => (
                          <th key={h} className="px-4 py-3 text-left font-bold text-gray-700">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {results.processResults.map((p, i) => (
                        <tr key={i} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-3 font-bold">{p.id}</td>
                          <td className="px-4 py-3">{p.at}</td>
                          <td className="px-4 py-3">{p.bt}</td>
                          <td className="px-4 py-3">{p.ct}</td>
                          <td className="px-4 py-3 text-blue-600 font-semibold">{p.tat}</td>
                          <td className="px-4 py-3 text-green-600 font-semibold">{p.wt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FcfsSimulator