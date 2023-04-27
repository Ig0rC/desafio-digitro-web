import { createContext, useState, useEffect } from 'react'
import { socket } from '../service/socket';


interface AuthenticationContextValues {
  isAuthentication: boolean;
  signIn: (username: string, maxCalls: number) => void;
  signOut: (username: string) => void;
  acceptCall: (callId: string) => void;
  turnOfCall: (callId: string) => void;
  calls: any[];
}

const AuthenticationContext = createContext({} as AuthenticationContextValues);

interface Props {
  children: React.ReactNode;

}


export function AuthenticationProvider({ children} : Props) {
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [calls, setCalls] = useState<any[]>([])


  function signIn(username: string, maxCalls: number) {
    socket.emit('USER_CONNECT', 
      {
        username,
        maxCalls,
      }      
    );
    // setIsAuthentication(true);
  }

  function signOut(username: string,) {
    try {
      socket.off('USER_DISCONNECT').emit('USER_DISCONNECT', 
      {
        username: 'teste',
      }      
    );
    } catch (error) {
      console.log(error)
    }
    // setIsAuthentication(false);
  }

  function acceptCall(callId: string) {
    socket.emit('NEW_CALL_ANSWERED', 
      {
        callId,
      }      
    );

    setCalls((prevState) => (prevState.map((call) => {
      if(call.callId === callId) {
        return {
          ...call,
          acceptedCallTime: new Date(),
          offCallTime: '',
          accepted: true,
        }
      }

      return call
    })))
  }

  function turnOfCall(callId: string) {
    socket.emit('END_CALL', 
      {
        callId,
      }      
    );
  }


  useEffect(() => {
    socket.off("NEW_CALL").on("NEW_CALL", (data) => {
      setCalls(prevState => [...prevState, {
        ...data,
        acceptedCallTime: '',
        offCallTime: '',
        accepted: false,
      }])
    });
  }, [])

  useEffect(() => {
    socket.off("NEW_CALL_ERROR").on("NEW_CALL_ERROR", (data) => {
      console.log(data, "NEW_CALL_ERROR")
    });
  }, [])

  useEffect(() => {
    socket.on("USER_DISCONNECTED", (data) => {
      console.log(data, "USER_DISCONNECTED")
    });
  }, [])

  useEffect(() => {
    socket.off("USER_CONNECTED").on("USER_CONNECTED", (data) => {
      setIsAuthentication(true)
    });
  }, [])

  useEffect(() => {
    socket.on("USER_DISCONNECTION_ERROR", (data) => {
      console.log(data, "USER_DISCONNECTION_ERROR")
    });
  }, [])


  useEffect(() => {
    socket.off("CALL_ENDED").on("CALL_ENDED", (data) => {
      setCalls((prevState) => (prevState.map((call) => {
        if(call.callId === data.callId) {
          return {
            ...call,
            offCallTime: new Date(),
          }
        }
        return call
      })))
    });
  }, [])

  useEffect(() => {
    socket.off("END_CALL_ERROR").on("END_CALL_ERROR", (data) => {
      console.log(data)
      setCalls((prevState) => (prevState.map((call) => {
        if(call.callId === data.callId) {
          return {
            ...call,
            error: data.error,
          }
        }
        return call
      })))
    });
  }, [])


  return (
    <AuthenticationContext.Provider value={{ 
      acceptCall,
      signOut,
      isAuthentication,
      signIn,
      turnOfCall,
      calls,
    }}>
      {children}
    </AuthenticationContext.Provider>
  )
}


export default AuthenticationContext;