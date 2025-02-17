import React from "react";
import List from "./components/List";

const animals = [
  { type: "turtle", icon: "🐢" },
  { type: "octopus", icon: "🐙" },
  { type: "fish", icon: "🐠" },
  { type: "flamingo", icon: "🦩" },
  { type: "penguin", icon: "🐧" }
];

const App = () => (
  <div>
    <List list={animals} />
  </div>
);

export default App;
