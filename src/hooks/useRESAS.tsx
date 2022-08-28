import React, { useState, useContext, ReactNode } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface RawPrefPopulation {
  prefCode: number;
  data: Array<{
    label: string;
    data: Array<{
      year: number;
      value: number;
    }>;
  }>;
}

interface PrefPopulation {
  isActive: boolean;
  prefCode: number;
  prefName: string;
  label: string;
  data: Array<{
    year: number;
    value: number;
  }>;
}

type PopulationData = PrefPopulation[];

interface UseRESAS {
  prefectures: Prefecture[];
  populationData: PopulationData;
  getPrefectures: () => void;
  togglePrefectureOnGraph: (prefCode: number) => void;
  isPrefectureCodeInGraphData: (prefCode: number) => boolean;
  isPrefectureShownInGraphData: (prefCode: number) => boolean;
}

const contextDefaultValues: UseRESAS = {
  prefectures: [],
  populationData: [],
  getPrefectures: () => {},
  togglePrefectureOnGraph: (prefCode: number) => {},
  isPrefectureCodeInGraphData: (prefCode: number) => false,
  isPrefectureShownInGraphData: (prefCode: number) => false,
};

const RESASContext = React.createContext(contextDefaultValues);

const apikey = process.env.VITE_API_KEY ?? "";
const requestHeader: AxiosRequestConfig = { headers: { "X-API-KEY": apikey } };

const RESASProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [populationData, setGraphData] = useState<PopulationData>([]);

  const getPrefectures = (): void => {
    axios
      .get(
        "https://opendata.resas-portal.go.jp/api/v1/prefectures",
        requestHeader
      )
      .then((res: AxiosResponse<{ result: Prefecture[] }>) => {
        setPrefectures(res.data.result);
      })
      .catch((e) => {
        console.log("error");
        console.log(e);
      });
  };

  const getPrefecturePopulation = async (
    prefCode: number
  ): Promise<PrefPopulation> => {
    return await axios
      .get(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${String(
          prefCode
        )}`,
        requestHeader
      )
      .then((res: AxiosResponse<{ result: RawPrefPopulation }>) => {
        const { data } = res.data.result;
        const prefName =
          prefectures.find((item) => item.prefCode === prefCode)?.prefName ??
          "";
        const tmp: PrefPopulation = {
          prefCode,
          prefName,
          isActive: true,
          label: data[0].label,
          data: data[0].data,
        };
        return tmp;
      });
  };

  // グラフデータの中に都道府県コードがあるか・あった場合isActiveがtrueどうかを判定する
  const isPrefectureCodeInGraphData = (prefCode: number): boolean => {
    return populationData.some((item) => item.prefCode === prefCode);
  };

  const isPrefectureShownInGraphData = (prefCode: number): boolean => {
    return populationData.some(
      (item) => item.prefCode === prefCode && item.isActive
    );
  };

  const togglePrefectureOnGraph = (prefCode: number): void => {
    // populationDataの中身を走査して、prefCodeが一致するものがあった場合はisAvticeを反転させる
    if (isPrefectureCodeInGraphData(prefCode)) {
      console.log("find");
      setGraphData(
        populationData.map((item) => {
          if (item.prefCode === prefCode) {
            item.isActive = !item.isActive;
            return item;
          } else {
            return item;
          }
        })
      );
    } else {
      // 無かった場合はRESASから取得してisActive=trueで追加する
      getPrefecturePopulation(prefCode)
        .then((res) => {
          setGraphData([...populationData, res]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <RESASContext.Provider
      value={{
        prefectures,
        populationData,
        getPrefectures,
        togglePrefectureOnGraph,
        isPrefectureCodeInGraphData,
        isPrefectureShownInGraphData,
      }}
      {...props}
    />
  );
};

export const useRESAS = (): UseRESAS => useContext(RESASContext);

export default RESASProvider;
