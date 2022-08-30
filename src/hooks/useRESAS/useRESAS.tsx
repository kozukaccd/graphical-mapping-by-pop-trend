import React, { useState, useContext, ReactNode, createContext } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  Prefecture,
  RawPrefPopulation,
  PrefPopulation,
  PopulationData,
  UseRESAS,
} from "./types";

const contextDefaultValues: UseRESAS = {
  prefectures: [],
  populationData: [],
  getPrefectures: () => {},
  togglePrefectureOnGraph: (prefCode: number) => {},
  isPrefectureShownInGraphData: (prefCode: number) => false,
};

// React.createContextだとなぜかテストでコケた。よくわからない
const RESASContext = createContext(contextDefaultValues);

const apikey = process.env.VITE_API_KEY ?? "";
const requestHeader: AxiosRequestConfig = { headers: { "X-API-KEY": apikey } };

const RESASProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [populationData, setPopulationData] = useState<PopulationData>([]);

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

  // prefCodeを基に人口データを取得する
  const getPopulationByPrefecture = async (
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
          isAvailable: true,
          label: data[0].label,
          data: data[0].data,
        };
        return tmp;
      });
  };

  // グラフデータの中に引数の都道府県コードがあるか・あった場合isAvailableがtrueどうかを判定する
  const isPrefectureShownInGraphData = (prefCode: number): boolean => {
    return populationData.some(
      (item) => item.prefCode === prefCode && item.isAvailable
    );
  };

  const togglePrefectureOnGraph = (prefCode: number): void => {
    // populationDataの中身を走査して、prefCodeが一致するものがあった場合はisAvticeを反転させる
    if (populationData.some((item) => item.prefCode === prefCode)) {
      setPopulationData(
        populationData.map((item) => {
          if (item.prefCode === prefCode) {
            item.isAvailable = !item.isAvailable;
            return item;
          } else {
            return item;
          }
        })
      );
    } else {
      // 無かった場合はRESASから取得してisAvailable=trueで追加する
      getPopulationByPrefecture(prefCode)
        .then((res) => {
          setPopulationData([...populationData, res]);
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
        isPrefectureShownInGraphData,
      }}
      {...props}
    />
  );
};

export const useRESAS = (): UseRESAS => useContext(RESASContext);

export default RESASProvider;
