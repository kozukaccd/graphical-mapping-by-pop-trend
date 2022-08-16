import React from "react";
import { TestComponent } from "./TestComponent";

const App: React.FC = () => {
  return (
    <div className="App">
      <TestComponent title="Hello World" />
      <p>test</p>
    </div>
  );
};

export default App;
