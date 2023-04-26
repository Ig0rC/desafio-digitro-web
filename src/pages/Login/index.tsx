import Button from "../../components/Button";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import { Container, Form, ButtonContainer } from "./styles";

function Login() {
  function handleSubmit() {
    alert('submit')
  }
  return (
    <Container>
      <Form>
        <FormGroup>
          <Input placeholder="Usuário" />
        </FormGroup>
        <FormGroup>
          <Input placeholder="Máximo de Chamadas" />
        </FormGroup>

        <ButtonContainer>
          <Button 
            type="submit" 
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