import { useContext, useState } from "react";
import Button from "../../components/Button";
import {  ButtonContainer, CardContainer, ChatContainer, Container, Menu, ButtonCall } from "./styles";
import AuthenticationContext from "../../Context/AuthenticationContext";
import Timer from "../../components/Timer";
import Chat from '../../assets/images/chat-icon.svg'
import maskDate from "../../utils/maskDate";

function CallCenter() {
  const { calls, acceptCall, turnOffCall, signOut, username, rejectCall } = useContext(AuthenticationContext);
  const [currentCallId, setCurrentCallId] = useState('');


  const currentCall = calls.find((call) => call.callId === currentCallId);

  function handleAcceptCall(callId: string){
    acceptCall(callId);
  }

  function handleTurnOffCall(callId: string){
    turnOffCall(callId);
  }

  function handleToggleCall(callId: string, accepted: boolean) {
    if(accepted) {
      setCurrentCallId(callId)
    }
  }

  function handleRejectCall(callId: string) {
    rejectCall(callId, 'Chamada recusada!')
  }


  return (
    <div>
      <Menu>
        <h2>{username}</h2>
        <Button onClick={() => signOut()} disabled={false} isLoading={false} type="button">
          Desconectar
        </Button>
      </Menu>

      <Container>
        <div className="grid-item">
          <h2>Atendimentos</h2>

          {calls.map((call) =>  (
            <CardContainer 
              onClick={() => handleToggleCall(call.callId, call.accepted)} 
              key={call.callId}
            >
              {call.callId === currentCallId && (<div className="select-call"/>)}
              <div className="card">
                <div className="info-card">
                  <ChatContainer>
                    <img src={Chat} />
                  </ChatContainer>
                  <div>
                    <p>{call.caller}</p>
                    <small>{call.service}</small>
                  </div>
                </div>

                <div className="options">
                  {call?.rejectCall ? (
                    <div>
                        <span>Chamada recusada!</span>
                    </div>
                  ) : (
                    <div>
                        {call.accepted ? (
                            <Timer offCallTime={call.offCallTime} acceptedCallTime={call.acceptedCallTime} /> 
                          ) : (
                          <div className="container-button-option-call">
                              <ButtonCall onClick={() => handleAcceptCall(call.callId)} type="button">
                                Aceitar
                              </ButtonCall>
                              <ButtonCall declined onClick={() => handleRejectCall(call.callId)} type="button">
                                Recusar
                              </ButtonCall>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              </div>

            </CardContainer>
          ))}
          
        </div>

        <div className="grid-item">
          {currentCall && (
            <div>
              <p>Chamada Selecionada</p>
              <p>Callid {currentCall.callId}</p>
              <p>Mídia {currentCall.media}</p>
              <p>Data Inicial {maskDate(currentCall.startDate)}</p>
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