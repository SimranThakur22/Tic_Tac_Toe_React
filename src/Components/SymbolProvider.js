import React, { useState } from "react";
import SymbolContext from "./SymboLContext";
const SymbolProvider = (props) => {
  const [xsym, xsetSym] = useState("X");
  const xsetSymHandler = (value) => {
    xsetSym(value);
  };

  const [osym, osetSym] = useState("O");
  const osetSymHandler = (value) => {
    osetSym(value);
  };
  const symbol = {
    selectsymbol: xsym,
    selectaddSymbol: xsetSymHandler,
    nonselectsymbol: osym,
    nonselectaddSymbol: osetSymHandler,
  };
  return (
    <SymbolContext.Provider value={symbol}>
      {props.children}
    </SymbolContext.Provider>
  );
};
export default SymbolProvider;
