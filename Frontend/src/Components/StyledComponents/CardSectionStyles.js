import styled from "styled-components";

export const GridContainer = styled.div`
  padding: 10px 60px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

export const GridCard = styled.div`
  margin-top: 60px;
  margin-bottom: 60px;
  background-color: #eaeaea;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
`;
