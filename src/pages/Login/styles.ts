import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 200px;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  margin-top: 16px;

  button {
    width: 100%;
  }
`;