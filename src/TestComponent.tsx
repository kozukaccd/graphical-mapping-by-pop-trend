import React from "react";
import styled from "styled-components";
interface Props {
  title: string;
}

export const TestComponent: React.FC<Props> = ({ title }) => {
  const apikey = process.env.VITE_API_KEY;
  return (
    <div>
      <h1>{title}</h1>
      <TestStyledComponent>
        <p>{apikey}</p>
      </TestStyledComponent>
    </div>
  );
};

const TestStyledComponent = styled.div`
  color: red;
`;
