import { ReactNode } from 'react';
import { Container } from './styles';

interface FormGroupProps {
  children: ReactNode;
  error?: string;
}

function FormGroup({ children, error }: FormGroupProps): JSX.Element {
  return (
    <Container>
      <div className="form-item">
        {children}
      </div>
      {error && <small>{error}</small>}
    </Container>
  );
}

export default FormGroup;
