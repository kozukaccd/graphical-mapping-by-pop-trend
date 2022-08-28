import React from "react";
import { useRESAS } from "~/hooks/useRESAS/useRESAS";
import styled from "styled-components";

export const PrefElement: React.FC<{ prefName: string; prefCode: number }> = ({
  prefName,
  prefCode,
}) => {
  const { togglePrefectureOnGraph, isPrefectureShownInGraphData } = useRESAS();
  const clickHandler = (code: number): void => {
    togglePrefectureOnGraph(code);
  };

  return (
    <Item
      onClick={() => {
        clickHandler(prefCode);
      }}
      isActive={isPrefectureShownInGraphData(prefCode)}
    >
      <p>{prefName}</p>
    </Item>
  );
};

const Item = styled.li`
  margin: 0.4rem 0.4rem;
  padding: 0rem 0.5rem;
  border: 1px solid #24254a;
  background-color: ${(props: { isActive: boolean }) =>
    props.isActive ? "#e5e2f4" : "#fff"};
  &:hover {
    cursor: pointer;
    background-color: ${(props: { isActive: boolean }) =>
      props.isActive ? "#d7d2ef" : "#f2f3f9"};
    transition: 0.1s;
  }
`;
