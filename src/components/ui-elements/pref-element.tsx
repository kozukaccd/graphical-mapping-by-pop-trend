import React from "react";
import { useRESAS } from "~/hooks/useRESAS";

export const PrefElement: React.FC<{ prefName: string; prefCode: number }> = ({ prefName, prefCode }) => {
  const { addPrefectureToGraph } = useRESAS();

  const clickHandler = (code: number): void => {
    addPrefectureToGraph(code);
  };
  return (
    <li
      onClick={() => {
        clickHandler(prefCode);
      }}
    >
      <p>{prefName}</p>
    </li>
  );
};
