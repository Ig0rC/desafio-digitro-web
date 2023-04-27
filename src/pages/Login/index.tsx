import Button from "../../components/Button";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import { useContext, useState } from 'react';
import { Container, Form, ButtonContainer } from "./styles";
import AuthenticationContext from "../../Context/AuthenticationContext";

function Login() {
  const { signIn } = useContext(AuthenticationContext);
  const [username, setUsername] = useState('teste');
  const [maxCalls, setMaxCalls] = useState(10)

  function handleSubmit() {
    console.log('hello')
    signIn(username, maxCalls);
  }

  return (
    <Container>
      <Form>
        <FormGroup>
          <Input value={username} placeholder="Usuário" />
        </FormGroup>
        <FormGroup>
          <Input value={maxCalls} placeholder="Máximo de Chamadas" />
        </FormGroup>

        <ButtonContainer>
          <Button 
            type="button" 
            isLoading={false}  
            disabled={false}  
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