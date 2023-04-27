import { createContext, useState, useEffect } from 'react'
import { socket } from '../service/socket';
import { UserConnectionErros } from '../service/socket/interfaces/UserConnectionErrors';
import { Call } from '../service/socket/interfaces/Call';
import { UseConnected } from '../service/socket/interfaces/UserConnected';
import { CallEnded } from '../service/socket/interfaces/CallEnded';
import { UserDisconnectionError } from '../service/socket/interfaces/UserDisconnectionError';
import { NewCallError } from '../service/socket/interfaces/NewCallError';
import { EndCallError } from '../service/socket/interfaces/EndCallError';
import { UserDisconnected } from '../service/socket/interfaces/UserDisconnected';

interface CallCustom extends Call {
  acceptedCallTime: Date | null;
  offCallTime: Date | null;
  accepted: boolean;
  rejectCall: boolean;
}

interface AuthenticationContextValues {
  isAuthentication: boolean;
  signIn: (username: string, maxCalls: number) => void;
  signOut: () => void;
  acceptCall: (callId: string) => void;
  turnOffCall: (callId: string) => void;
  rejectCall: (callId: string, error: string) => void;
  calls: CallCustom[];
  username: string;
}

const AuthenticationContext = createContext({} as AuthenticationContextValues);

interface Props {
  children: React.ReactNode;
}

export function AuthenticationProvider({ children} : Props) {
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [calls, setCalls] = useState<CallCustom[]>([])
  const [username, setUsername] = useState('');

  function signIn(user: string, maxCalls: number) {
    socket.emit('USER_CONNECT', 
      {
        username: user,
        maxCalls,
      }      
    );
  }

  function signOut() {
    socket.emit('USER_DISCONNECT', {
      username: username,
    });
  }

  function userConnectionError(data: UserConnectionErros) {
    if(data.error === 'User already connected') {
      setUsername(data.username);
      localStorage.setItem('user', JSON.stringify({
        username: data.username,
        sid: socket.id,
      }))
      setIsAuthentication(true)
    }
  }

  function rejectCall(callId: string, error: string) {
    socket.emit('NEW_CALL_ERROR', {
      callId,
      error,
    });

    setCalls((prevState) => (prevState.map((call) => {
      if(call.callId === callId) {
        return {
          ...call,
          rejectCall: true,
        }
      }
      return call
    })));
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
          offCallTime: null,
          accepted: true,
        }
      }
      return call
    })));
  }

  function turnOffCall(callId: string) {
    socket.emit('END_CALL', 
      {
        callId,
      }      
    );
  }

  function newCall(data: Call) {
    setCalls(prevState => [...prevState, {
      ...data,
      acceptedCallTime: null,
      offCallTime: null,
      accepted: false,
      rejectCall: false,
    }])
  }

  function disconnectUser() {
    setIsAuthentication(false)
    setCalls([]);
    localStorage.clear();
  }

  function userConnected(data: UseConnected) {
    setUsername(data.username);
      localStorage.setItem('user', JSON.stringify({
        username: data.username,
        sid: socket.id,
    }))
    setIsAuthentication(true)
  }

  function callEnded(data: CallEnded) {
    setCalls((prevState) => (prevState.map((call) => {
      if(call.callId === data.callId) {
        return {
          ...call,
          offCallTime: new Date(),
        }
      }
      return call
    })))
  }

  function endCallerror(data: EndCallError) {
    setCalls((prevState) => (prevState.map((call) => {
      if(call.callId === data.callId) {
        return {
          ...call,
          error: data.error,
        }
      }
      return call
    })))
  }

  function userDisconnectionError(data: UserDisconnectionError) {
    console.log('USER_DISCONNECTION_ERROR', data);
  }

  function newCallError(data: NewCallError) {
    console.log('NEW_CALL_ERROR', data)
  }

  function userDisconnected(data: UserDisconnected) {
    console.log('USER_DISCONNECTED', data)
  }

  useEffect(() => {
    // Implementados
    socket.off("NEW_CALL").on("NEW_CALL", newCall);
    socket.on("disconnect", disconnectUser);
    socket.off("USER_CONNECTED").on("USER_CONNECTED", userConnected);
    socket.off("CALL_ENDED").on("CALL_ENDED", callEnded);
    socket.off("END_CALL_ERROR").on("END_CALL_ERROR", endCallerror);
    socket.off("USER_CONNECTION_ERROR").on("USER_CONNECTION_ERROR", userConnectionError);

    // Não implementados
    socket.off("USER_DISCONNECTION_ERROR").on("USER_DISCONNECTION_ERROR", userDisconnectionError);
    socket.off("NEW_CALL_ERROR").on("NEW_CALL_ERROR", newCallError);
    socket.off("USER_DISCONNECTED").on("USER_DISCONNECTED", userDisconnected);
  }, []);

  return (
    <AuthenticationContext.Provider value={{ 
      acceptCall,
      signOut,
      isAuthentication,
      signIn,
      turnOffCall,
      username,
      calls,
      rejectCall,
    }}>
      {children}
    </AuthenticationContext.Provider>
  )
}


export default AuthenticationContext;