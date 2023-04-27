import { useContext, useState } from "react";
import Button from "../../components/Button";
import {  ButtonContainer, CardContainer, Container, Menu } from "./styles";
import AuthenticationContext from "../../Context/AuthenticationContext";
import Timer from "../../components/Timer";
import Call from '../../assets/images/call.svg'

function CallCenter() {
  const { calls, acceptCall, turnOfCall, signOut } = useContext(AuthenticationContext);
  const [currentCallId, setCurrentCallId] = useState('');

  const currentCall  = calls.find((call) => call.callId === currentCallId);

  function handleAcceptCall(callId: string){
    acceptCall(callId);
  }

  function handleTurnOfCall(callId: string){
    turnOfCall(callId);
  }

  function handleToggleCall(callId: string) {
    setCurrentCallId(callId)
  }

  return (
    <div>
      <Menu>
        <h2>José</h2>
        <Button onClick={() => signOut('teste')} disabled={false} isLoading={false} type="button">
          Desconectar
        </Button>
      </Menu>
      <Container>
        <div className="grid-item">
          <h2>Atendimentos</h2>

          {calls.map((call) =>  (
            <CardContainer onClick={() => handleToggleCall(call.callId)} key={call.callId}>
              {call.callId === currentCallId && (<div className="select-call"/>)}
              <div className="card">
                <div>
                  <p>{call.caller}</p>
                  <small>{call.service}</small>
                </div>
                <div>
                  {call.accepted ? (
                      <Timer offCallTime={call.offCallTime} acceptedCallTime={call.acceptedCallTime} /> 
                    ) : (
                      <button onClick={() => handleAcceptCall(call.callId)} type="button">
                        <img src={Call} />
                     </button>
                  )}
                </div>

                {call?.error && (
                  <p>{call.error}</p>
                )}
              </div>
            </CardContainer>
          ))}
          
        </div>

        

        <div className="grid-item">
          {currentCall && (
            <div>
              <p>Chamada Selecionada:</p>
              <p>Callid {currentCall.callId}</p>
              <p>Mídia {currentCall.media}</p>
              <p>Data Inicial {currentCall.startDate}</p>
              <p>Serviço {currentCall.service} </p>
              <p>Origem {currentCall.caller}</p>


            {(currentCall.accepted && !currentCall.offCallTime && !currentCall?.error) && (
              <ButtonContainer>
                <Button onClick={() => handleTurnOfCall(currentCall.callId)} isLoading={false} disabled={false} type="button">
                  Finalizar
                </Button>
              </ButtonContainer>
            )}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default CallCenter;