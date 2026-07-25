import { useState, useEffect } from 'react'

function App() {
  const [backendMessage, setBackendMessage] = useState('Waiting for backend...');

  useEffect(() => {
    fetch('/api/status')
      .then(response => response.json())
      .then(data => setBackendMessage(data.message))
      .catch(error => setBackendMessage('Error: Could not connect to backend.'));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>OpsVision Dashboard</h1>
      <div style={{ padding: '20px', border: '2px solid #ccc', borderRadius: '10px', display: 'inline-block' }}>
        <h2>Server Status:</h2>
        <p style={{ color: 'green', fontSize: '24px', fontWeight: 'bold' }}>
          {backendMessage}
        </p>
      </div>
    </div>
  )
}

export default App