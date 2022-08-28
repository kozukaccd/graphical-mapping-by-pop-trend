export interface Prefecture {
  prefCode: number;
  prefName: string;
}

export interface RawPrefPopulation {
  prefCode: number;
  data: Array<{
    label: string;
    data: Array<{
      year: number;
      value: number;
    }>;
  }>;
}

export interface PrefPopulation {
  isActive: boolean;
  prefCode: number;
  prefName: string;
  label: string;
  data: Array<{
    year: number;
    value: number;
  }>;
}

export type PopulationData = PrefPopulation[];

export interface UseRESAS {
  prefectures: Prefecture[];
  populationData: PopulationData;
  getPrefectures: () => void;
  togglePrefectureOnGraph: (prefCode: number) => void;
  isPrefectureShownInGraphData: (prefCode: number) => boolean;
}
