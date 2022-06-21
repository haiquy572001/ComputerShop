import React, { createContext, useContext, useReducer, useMemo } from "react";
import { initialState } from "./reducers";
import { useLocation } from "react-router-dom";
export const Store = createContext([initialState, () => initialState]);

export const ContextProvider = ({ reducer, children, initialState }) => {
  Store.displayName = "HQ";
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>;
};

export const useMyContext = () => useContext(Store);
