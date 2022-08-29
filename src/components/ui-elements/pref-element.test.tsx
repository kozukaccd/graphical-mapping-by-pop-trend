import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PrefElement } from "./pref-element";
import { useRESAS } from "~/hooks/useRESAS/useRESAS";

jest.mock("~/hooks/useRESAS/useRESAS");

(useRESAS as jest.Mock).mockImplementation(() => {
  return {
    togglePrefectureOnGraph: jest.fn(),
    isPrefectureShownInGraphData: jest.fn(() => true),
  };
});

describe("test", () => {
  test("「北海道」が描画されている", () => {
    render(<PrefElement prefName="北海道" prefCode={1} />);
    expect(screen.getByText("北海道")).toBeInTheDocument();
  });
  test("北海道をクリックした際に色が変わるかどうかをテスト", async () => {
    render(<PrefElement prefName="北海道" prefCode={1} />);
    const prefButton = screen.getByRole("listitem");
    await userEvent.click(prefButton);
    await waitFor(() => expect(prefButton).toHaveStyle("background-color: #e5e2f4"));
  });
});
