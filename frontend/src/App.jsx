import { useEffect, useState } from 'react'

function App() {
  const [backendMessage, setBackendMessage] = useState('Waiting...')
  const [containerCount, setContainerCount] = useState('Loading...')

  useEffect(() => {
    fetch('/api/status')
      .then((response) => response.json())
      .then((data) => setBackendMessage(data.message))
      .catch(() => setBackendMessage('Unable to load status'))

    fetch('/api/metrics/containers')
      .then((response) => response.json())
      .then((data) => setContainerCount(data.count))
      .catch(() => setContainerCount('Error'))
  }, [])

  return (
    <main className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <header className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-500 tracking-tight">
            OpsVision
          </h1>
          <p className="mt-3 text-sm md:text-base uppercase tracking-[0.35em] text-gray-400">
            Live Infrastructure Dashboard
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-gray-700 bg-gray-800 shadow-2xl shadow-black/30 p-8">
            <h2 className="text-xl font-semibold text-gray-100 mb-6">
              Backend API Status
            </h2>
            <div className="flex items-center gap-3 text-lg text-gray-200">
              <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              <span>{backendMessage}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-700 bg-gray-800 shadow-2xl shadow-black/30 p-8">
            <h2 className="text-xl font-semibold text-gray-100 mb-6">
              Active Containers
            </h2>
            <div className="text-7xl font-black leading-none text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-600">
              {containerCount}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App