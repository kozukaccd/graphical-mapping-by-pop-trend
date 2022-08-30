import { cleanup, renderHook, act } from "@testing-library/react";
import axios from "axios";
import RESASProvider, { useRESAS } from "~/hooks/useRESAS/useRESAS";

jest.mock("axios");

const getPopulationByPrefectureResMock = {
  prefCode: 1,
  data: [
    {
      label: "総人口",
      data: [
        {
          year: 1900,
          value: 100000,
        },
        {
          year: 1905,
          value: 200000,
        },
        {
          year: 1910,
          value: 300000,
        },
      ],
    },
  ],
};

const expectedPrefecturePopulationData1 = [
  {
    prefCode: 1,
    prefName: "",
    isAvailable: true,
    label: "総人口",
    data: [
      {
        year: 1900,
        value: 100000,
      },
      {
        year: 1905,
        value: 200000,
      },
      {
        year: 1910,
        value: 300000,
      },
    ],
  },
];

const expectedPrefecturePopulationData2 = [
  {
    prefCode: 1,
    prefName: "",
    isAvailable: false,
    label: "総人口",
    data: [
      {
        year: 1900,
        value: 100000,
      },
      {
        year: 1905,
        value: 200000,
      },
      {
        year: 1910,
        value: 300000,
      },
    ],
  },
];

const getPrefecturesResMock = [
  {
    prefCode: 1,
    prefName: "北海道",
  },
  {
    prefCode: 2,
    prefName: "青森県",
  },
  {
    prefCode: 3,
    prefName: "岩手県",
  },
];

describe("useRESAS", () => {
  beforeEach(() => {
    cleanup();
  });

  test("getPrefecturesが正しくresを返している", async () => {
    (axios.get as any).mockResolvedValue({
      data: { result: getPrefecturesResMock },
    });
    const { result } = renderHook(() => useRESAS(), { wrapper: RESASProvider });
    await act(async () => {
      await result.current.getPrefectures();
    });
    expect(result.current.prefectures).toEqual(getPrefecturesResMock);
  });

  test("getPopulationByPrefectureが正しくresを加工・返している、toggleが機能している", async () => {
    (axios.get as any).mockResolvedValue({
      data: { result: getPopulationByPrefectureResMock },
    });
    const { result } = renderHook(() => useRESAS(), { wrapper: RESASProvider });
    await act(async () => {
      await result.current.togglePrefectureOnGraph(1);
    });
    expect(result.current.populationData).toEqual(
      expectedPrefecturePopulationData1
    );

    await act(async () => {
      await result.current.togglePrefectureOnGraph(1);
    });
    expect(result.current.populationData).toEqual(
      expectedPrefecturePopulationData2
    );
  });
});
