import "./homePage.css";
import { useContext, useState } from "react";
import Quote from "./Quote";
import SymbolProvider from "./SymbolProvider";
import SymbolContext from "./SymboLContext";

const HomePage = (props) => {
  const [symbol, setSymbol] = useState("X");
  const [xactive, xsetActive] = useState(true);
  const [oactive, osetActive] = useState(false);
  const a = useContext(SymbolContext);
  const crossSymbolHandler = () => {
    osetActive(false);
    setSymbol("X");
    a.selectaddSymbol(symbol);
    a.nonselectaddSymbol("O");
    xsetActive(true);
  };
  const zeroSymbolHandler = () => {
    xsetActive(false);
    setSymbol("O");
    a.selectaddSymbol(symbol);
    a.nonselectaddSymbol("X");
    osetActive(true);
  };
  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <h2 className="cross">x</h2>
          <h2 className="zero">o</h2>
        </div>
        <div className="playerBox">
          <h2>PICK PLAYER</h2>
          <div className="choices">
            <input
              type="button"
              value="X"
              className={xactive ? "selectedClass" : "select_btn"}
              onClick={crossSymbolHandler}
            />
            <input
              type="button"
              value="O"
              className={oactive ? "selectedClass" : "select_btn"}
              onClick={zeroSymbolHandler}
            />
          </div>
        </div>
        <div className="play_btn" onClick={props.gameEnable}>
          NEW GAME ( VS CPU)
        </div>
        <div className="dummy_btn">NEW GAME(VS HUMAN) Coming soon</div>
        <div class="invite">
          <div className="invite_btn">INVITE YOUR FRIEND</div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
