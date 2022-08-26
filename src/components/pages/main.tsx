import React, { Fragment } from "react";
import GraphView from "~/components/ui-parts/graph-view";
import PrefectureList from "../ui-parts/prefecture-list";

const Main: React.FC = () => {
  return (
    <Fragment>
      <PrefectureList />
      <GraphView />
    </Fragment>
  );
};

export default Main;
