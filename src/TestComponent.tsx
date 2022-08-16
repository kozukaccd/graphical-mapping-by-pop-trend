import React from "react";

interface Props {
  title: string;
}

export const TestComponent: React.FC<Props> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};
