import styled from "styled-components";

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
  }

  img {
    width: 38px;
    height: 38px;
  }
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
    align-items: center;
    justify-content: space-between;

    .timer {
      font-size: 14px;
    }
  }
`;


export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    background-color: ${({ theme }) => theme.colors.danger.main};
  }
`;