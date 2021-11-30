import React, { createContext, useEffect, useReducer } from 'react';
import languages from 'data/languages.json';

const initialState = {
  language: localStorage.getItem('ILPlatform-Language') || languages[0],
};

let prevState = initialState;

const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return languages.includes(action.payload)
        ? {
            ...state,
            language: action.payload,
          }
        : state;
    default:
      return state;
  }
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    if (state.language !== prevState.language) {
      localStorage.setItem('ILPlatform-Language', state.language);
    }
  });

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
