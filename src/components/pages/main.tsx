import React, { Fragment } from "react";
import { GraphView } from "~/components/ui-parts/graph-view";
import { PrefectureList } from "../ui-parts/prefecture-list";

export const Main: React.FC = () => {
  return (
    <Fragment>
      <GraphView />
      <PrefectureList />
    </Fragment>
  );
};
