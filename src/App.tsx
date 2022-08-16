import React from "react";
import "./App.css";
import { TestComponent } from "./TestComponent";

const App: React.FC = () => {
  return (
    <div className="App">
      <TestComponent title="Hello World" />
    </div>
  );
};

export default App;
