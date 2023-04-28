import { useContext, useState } from "react";
import Button from "../../components/Button";
import { ButtonContainer, CardContainer, DashboardCall, Menu, } from "./styles";
import AuthenticationContext from "../../Context/AuthenticationContext";
import maskDate from "../../utils/maskDate";
import Card from "../../components/Card";

function CallCenter() {
  const { calls, acceptCall, turnOffCall, signOut, username, rejectCall } = useContext(AuthenticationContext);
  const [currentCallId, setCurrentCallId] = useState('');
  const currentCall = calls.find((call) => call.callId === currentCallId);
  const canFinalize = currentCall && (currentCall.acceptedCallTime && !currentCall.offCallTime && !currentCall?.error);

  function handleAcceptCall(callId: string) {
    acceptCall(callId);
  }

  function handleTurnOffCall(callId: string) {
    turnOffCall(callId);
  }

  function handleToggleCall(callId: string, accepted: Date | null) {
    if (accepted) {
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
        <Button onClick={signOut} disabled={false} isLoading={false} type="button">
          Desconectar
        </Button>
      </Menu>

      <DashboardCall>
        <div className="grid-item">
          <h2>Atendimentos</h2>
          {calls.map((call) => (
            <CardContainer
              onClick={() => handleToggleCall(call.callId, call.acceptedCallTime)}
              key={call.callId}
            >
              {call.callId === currentCallId && (<div className="select-call" />)}

              <Card 
                onAcceptCall={handleAcceptCall}
                onRejectCall={handleRejectCall}
                call={call}
              />
            </CardContainer>
          ))}
        </div>

        {currentCall && (
          <div className="grid-item">
            <div>
              <p>Chamada Selecionada</p>
              <p>Callid {currentCall.callId}</p>
              <p>Mídia {currentCall.media}</p>
              <p>Data Inicial {maskDate(currentCall.startDate)}</p>
              <p>Serviço {currentCall.service} </p>
              <p>Origem {currentCall.caller}</p>


              {canFinalize && (
                <ButtonContainer>
                  <Button onClick={() => handleTurnOffCall(currentCall.callId)} isLoading={false} disabled={false} type="button">
                    Finalizar
                  </Button>
                </ButtonContainer>
              )}
            </div>
          </div>
        )}
      </DashboardCall>

    </div>
  )
}

export default CallCenter;