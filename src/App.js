import { useState } from "react";
import GamePage from "./Components/GamePage";
import HomePage from "./Components/HomePage";
import Quote from "./Components/Quote";
import SymbolProvider from "./Components/SymbolProvider";
// import "./App.css";

function App() {
  const [playStatus, setPlayStatus] = useState(false);
  const enableGameHandler = () => {
    setPlayStatus(true);
  };
  const disableGameHandler = () => {
    setPlayStatus(false);
  };
  return (
    <SymbolProvider>
      {!playStatus && <HomePage gameEnable={enableGameHandler} />}
      {playStatus && <GamePage disableGame={disableGameHandler} />}
      <Quote />
    </SymbolProvider>
  );
}

export default App;
