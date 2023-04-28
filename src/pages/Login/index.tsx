import { ChangeEvent } from 'react';
import Button from "../../components/Button";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import { useContext, useState } from 'react';
import { Container, Form, ButtonContainer } from "./styles";
import AuthenticationContext from "../../Context/AuthenticationContext";
import useErrors from '../../hooks/useErrors';
import onlyNumber from '../../utils/onlyNumbers';
import onlyLetters from '../../utils/onlyLetters';

function Login() {
  const { errors, getErrorMessageByFieldName, removeError, setError } = useErrors();
  const { signIn } = useContext(AuthenticationContext);
  const [username, setUsername] = useState<string>('');
  const [maxCalls, setMaxCalls] = useState<string>('')

  function handleSubmit() {
    signIn(username, Number(maxCalls));
  }

  const isFormValid = errors.length <= 0 && Boolean(username) && Boolean(maxCalls);

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(onlyLetters(e.target.value));

    if(!e.target.value) {
      setError('username', 'Nome do usário é obrigatório');
    } else {
      removeError('username');
    }
  }

  function handleMaxCallsChange(e: ChangeEvent<HTMLInputElement>) {
    setMaxCalls(onlyNumber(e.target.value))

    if(!e.target.value) {
      setError('maxCalls', 'Máximo de chamadas é obrigatório');
    } else {
      removeError('maxCalls');
    }
  }

  return (
    <Container>
      <Form>
        <FormGroup
          error={getErrorMessageByFieldName('username')} 
        >
          <Input 
            error={getErrorMessageByFieldName('username')} 
            onChange={handleUsernameChange} 
            value={username} 
            placeholder="Usuário"
          />
        </FormGroup>

        <FormGroup
          error={getErrorMessageByFieldName('maxCalls')} 
        >
          <Input 
            error={getErrorMessageByFieldName('maxCalls')} 
            onChange={handleMaxCallsChange} 
            value={maxCalls} 
            placeholder="Máximo de Chamadas" 
          />
        </FormGroup>

        <ButtonContainer>
          <Button 
            type="button" 
            isLoading={false}  
            disabled={!isFormValid}  
            onClick={handleSubmit}
          >
            Conectar
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  )
}

export default Login;