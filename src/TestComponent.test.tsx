import React from "react";
import { render, screen } from "@testing-library/react";
import { TestComponent } from "./TestComponent";

test("「Hello World」が描画されている", () => {
  render(<TestComponent title="Hello World" />);
  screen.debug();
  expect(screen.getByText("Hello World")).toBeInTheDocument();
});
