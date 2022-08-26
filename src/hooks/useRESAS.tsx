import { useState, useEffect } from "react";
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
  prefCode: number;
  prefName: string;
  label: string;
  data: Array<{
    year: number;
    value: number;
  }>;
}

type GraphData = PrefPopulation[];

type UseRESAS = () => {
  prefectures: Prefecture[];
  graphData: GraphData;
  addPrefectureToGraph: (prefCode: number) => void;
};

const apikey = process.env.VITE_API_KEY ?? "";
const requestHeader: AxiosRequestConfig = { headers: { "X-API-KEY": apikey } };

export const useRESAS: UseRESAS = () => {
  const [prefectures, setPosts] = useState<Prefecture[]>([]);
  const [graphData, setGraphData] = useState<GraphData>([]);

  const getPrefectures = (): void => {
    axios
      .get(
        "https://opendata.resas-portal.go.jp/api/v1/prefectures",
        requestHeader
      )
      .then((res: AxiosResponse<{ result: Prefecture[] }>) => {
        setPosts(res.data.result);
      })
      .catch((e) => {
        console.log("error");
        console.log(e);
      });
  };
  useEffect(() => {
    getPrefectures();
    console.log(graphData);
  }, [graphData]);

  const addPrefectureToGraph = (prefCode: number): void => {
    axios
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
          label: data[0].label,
          data: data[0].data,
        };
        setGraphData([...graphData, tmp]);
      })
      .catch((e) => {
        console.log("error");
        console.log(e);
      });
  };

  return { prefectures, graphData, addPrefectureToGraph };
};
