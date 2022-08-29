import React, { Fragment, useEffect } from "react";
import { useRESAS } from "~/hooks/useRESAS/useRESAS";
import { PrefElement } from "~/components/ui-elements/pref-element";
import styled from "styled-components";

export const PrefectureList: React.FC = () => {
  const { prefectures, getPrefectures } = useRESAS();

  useEffect(() => {
    getPrefectures();
  }, []);

  return (
    <Fragment>
      <ListContainer>
        {prefectures === undefined
          ? null
          : prefectures.map((item, i) => {
              return <PrefElement key={`item${String(i)}`} prefName={item.prefName} prefCode={item.prefCode} />;
            })}
      </ListContainer>
    </Fragment>
  );
};

const ListContainer = styled.ul`
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
`;
