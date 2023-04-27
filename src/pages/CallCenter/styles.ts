import styled, { css } from "styled-components";


interface ButtonProps {
  declined?: boolean;
}


export const Menu = styled.menu`
  width: 100%;
  height: 80px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  
  h2 {
    font-weight: bold;
    color: #fff;
  }

  button {
    margin-left: 8px;
    background-color: ${({ theme }) => theme.colors.danger.dark};
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;  

  h2 {
    margin-bottom: 16px;
  }

  .grid-item {
    background-color: #ffff;
    padding: 20px;
    border-radius: 4px;
    min-height: 200px;
    max-height: 800px;
    overflow-y: scroll;
  }

  img {
    width: 38px;
    height: 38px;
  }

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

export const ChatContainer = styled.div`
  background-color: #FDF4E7;
  padding: 12px;
  border-radius: 12px;
  margin-right: 12px;
`;


export const CardContainer = styled.div`
  position: relative;


  & + & {
    margin-top: 16px;
  } 

  .select-call {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    background-color: black;
    width: 16px;
    height: 100%;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.danger.main};
  }

  .card {
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

    .timer {
      font-size: 14px;
    }
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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  
  button {
    background-color: ${({ theme }) => theme.colors.danger.main};
  }
`;