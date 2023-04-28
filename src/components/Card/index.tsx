import { Container, ChatContainer, ButtonCall } from "./styles";
import Chat from '../../assets/images/chat-icon.svg'
import Timer from "../Timer";
import { Call } from "../../service/socket/interfaces/Call";

interface CallCustom extends Call {
  acceptedCallTime: Date | null;
  offCallTime: Date | null;
  rejectCall: boolean;
  error: string | null;
}
interface Props {
  call: CallCustom;
  onAcceptCall(callId: string): void;
  onRejectCall(callId: string): void;
}

function Card({ call, onAcceptCall, onRejectCall }: Props) {
  return (
    <Container>
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
        {call.rejectCall ? (
            <div>
              <span>Chamada recusada!</span>
            </div>
        
        ) : (
          call.acceptedCallTime ? (
            <div>
              <Timer
                offCallTime={call.offCallTime}
                acceptedCallTime={call.acceptedCallTime}
              />
            </div>
          ) :
            <div className="container-button-option-call">
              <ButtonCall
                onClick={() => onAcceptCall(call.callId)}
                type="button"
              >
                Aceitar
              </ButtonCall>
              <ButtonCall
                declined
                onClick={() => onRejectCall(call.callId)}
                type="button"
              >
                Recusar
              </ButtonCall>
            </div>
        )}
      </div>
    </Container>
  )
}

export default Card;