import { createContext, useEffect, useReducer } from "react"; // use createContext, useEffect, useReducer from react
import Reducer from "./Reducer"; //import Reducer.js

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null, //if there is user in localstorage take this user if not return null
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);
//inside this context I'm gonna pass INITIAL_STATE
/*(alias) createContext<{
    user: any;
    isFetching: boolean;
    error: boolean;
}>(defaultValue: {
    user: any;
    isFetching: boolean;
    error: boolean;
}): React.Context<{
    user: any;
    isFetching: boolean;
    error: boolean;
}>
import createContext */

export const ContextProvider = ({
  children, // these childern will be all components
}) => {
  //how I'm gonna reach this user inside any component. I should create context provider and wrap these all components inside this wrapper, this provider and then we are gonna be able to reach this initial state
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE); //this is gonna take Reducer.js
  /*
(alias) useReducer<(state: any, action: any) => any>(reducer: (state: any, action: any) => any, initializerArg: any, initializer?: undefined): [any, React.DispatchWithoutAction] (+4 overloads)
import useReducer

An alternative to useState.
useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values. It also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks. */

  useEffect(
    () => {
      localStorage.setItem("user", JSON.stringify(state.user));
      /*
(method) JSON.stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string (+1 overload)
Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

@param value — A JavaScript value, usually an object or array, to be converted.
@param replacer — A function that transforms the results.
@param space — Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read. */
    },
    [state.user] //whenever this state and user change exc. useEffect to use localStorage
    /*
(method) Storage.setItem(key: string, value: string): void
Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.

Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)

Dispatches a storage event on Window objects holding an equivalent Storage object. */
  );
  /* 
useEffect(effect: React.EffectCallback, deps?: React.DependencyList): void
import useEffect

Accepts a function that contains imperative, possibly effectful code.
@param effect — Imperative function that can return a cleanup function
@param deps — If present, effect will only activate if the values in the list change. */

  return (
    //we can use Context as Provider
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch, //when you click login btn you are gonna dispatch start and according to server successful or err.
      }}
    >
      {children}
    </Context.Provider>
  );
};
