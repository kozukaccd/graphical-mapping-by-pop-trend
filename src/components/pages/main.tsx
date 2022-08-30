import React from "react";
import { GraphView } from "~/components/ui-parts/graph-view";
import { PrefectureList } from "../ui-parts/prefecture-list";
import styled from "styled-components";

export const Main: React.FC = () => {
  return (
    <MainContainer>
      <GraphView />
      <PrefectureList />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  padding: 0 60px;
`;
