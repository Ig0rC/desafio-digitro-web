import { useEffect, useState } from 'react'
import { socket } from './service/socket';

function App() {
  const [count, setCount] = useState(0);
  const [isConnected, setIsConnected] = useState(socket.connected);

 

 function connect() {
    try {
      socket.emit('USER_CONNECT', {
        username: 'test',
        maxCalls: 2,
      })

      console.log('mit')
    } catch (error) {
      console.log(error)
    }
  }

  function conneted() {
    socket.on('USER_CONNECTED', (data) => {
      console.log('aqui')
      console.log(data)
    });
  }

  useEffect(() => {
    try {

      socket.on('USER_CONNECTED', (data) => {
        console.log('aqui')
        console.log(data)
      });

    } catch (error) {
      console.log(error, 'aqui')
    }
  
  }, [])

  return (
    <>
      <h1>Vite + React {isConnected === true ? 'a' : 'false'}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <button onClick={connect}>
        connect
      </button>
      <button onClick={conneted}>
        has
      </button>
    </>
  )
}

export default App
