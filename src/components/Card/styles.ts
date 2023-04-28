import styled, { css } from 'styled-components';

interface ButtonProps {
  declined?: boolean;
}

export const Container = styled.div`
  padding: 24px;
  background-color: #ffff;
  border-radius: 4px;
  border: 1px solid #E6ECF2;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .info-card {
    display: flex;
    flex: 1;
    align-items: center;
  }

  .container-button-option-call {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .options {
    display: flex;
    align-items: center;

    span {
      color: ${({ theme }) => theme.colors.danger.dark};
      font-weight: bold;
    }
  }
`;

export const ChatContainer = styled.div`
  background-color: #FDF4E7;
  padding: 12px;
  border-radius: 12px;
  margin-right: 12px;
`;


export const ButtonCall = styled.button<ButtonProps>`
  height: 52px;
  padding: 0 16px;
  border: none;
  background: ${({ theme }) => theme.colors.success.main};
  font-size: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  color: #FFFFFF;
  font-weight: bold;
  border-radius: 4px;
  transition: background 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.colors.success.light};
  }

  ${({ theme, declined }) => declined && css`
    background: ${theme.colors.danger.main};

    &:hover {
    background: ${theme.colors.danger.light};
    }
  `}

  & + & {
    margin-left: 4px
  }
`;
