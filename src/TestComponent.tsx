import React from "react";
import styled from "styled-components";
interface Props {
  title: string;
}

export const TestComponent: React.FC<Props> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <TestStyledComponent>
        <p>Content Content Content</p>
      </TestStyledComponent>
    </div>
  );
};

const TestStyledComponent = styled.div`
  color: red;
`;
