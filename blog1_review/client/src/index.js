import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // you can reach data in context folder by this
import { ContextProvider } from "./context/Context";
/*
= export const ContextProvider = ({
  children, 
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch, 
      }}
    >
      {children}
    </Context.Provider>
  );
};
*/

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      {/*reach user and fetch err. */}
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
