import React from "react";
const SymbolContext = React.createContext({
  selectsymbol: "",
  selectaddSymbol: (value) => {},
  nonselectsymbol: "",
  nonselectaddSymbol: (value) => {},
});

export default SymbolContext;
