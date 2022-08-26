import React, { useEffect, Fragment } from "react";
import { useRESAS } from "~/hooks/useRESAS";
import { PrefElement } from "~/components/ui-elements/pref-element";

const PrefectureList: React.FC = () => {
  const { prefectures, addPrefectureToGraph } = useRESAS();

  useEffect(() => {
    addPrefectureToGraph(5);
  }, []);

  return (
    <Fragment>
      {prefectures.map((item, i) => {
        return (
          <PrefElement
            key={`item${String(i)}`}
            prefName={item.prefName}
            prefCode={item.prefCode}
          />
        );
      })}
    </Fragment>
  );
};

export default PrefectureList;
