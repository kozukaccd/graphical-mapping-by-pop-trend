import React from "react";
import { render, screen } from "@testing-library/react";
import { PrefectureList } from "./prefecture-list";
import { useRESAS } from "~/hooks/useRESAS/useRESAS";

jest.mock("~/hooks/useRESAS/useRESAS");

const prefecturesMockData = [
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

(useRESAS as jest.Mock).mockImplementation(() => {
  return {
    prefectures: prefecturesMockData,
    getPrefectures: jest.fn(() => {}),
    togglePrefectureOnGraph: jest.fn(),
    isPrefectureShownInGraphData: jest.fn(() => false),
  };
});

describe("test", () => {
  test("北海道・青森県・岩手県が描画されている", () => {
    render(<PrefectureList />);
    expect(screen.getByText("北海道")).toBeInTheDocument();
    expect(screen.getByText("青森県")).toBeInTheDocument();
    expect(screen.getByText("岩手県")).toBeInTheDocument();
  });
});
