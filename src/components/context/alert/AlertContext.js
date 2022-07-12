import { createContext, useReducer } from "react";
import AlertReducer from "./AlertReducer";

const AlertContext = createContext();

export const AlertProvider = ({children}) => {
  const initialState = null;
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type) => {
    dispatch({ type: "SET_ALERT", payload: { msg, type } });
  };
  //Dissappear alert after 3 sec
  setTimeout(() => {
    dispatch({ type: "CLEAR_ALERT" });
  }, 3000);

    return <AlertContext.Provider value={{ alert: state, setAlert }}>{children}</AlertContext.Provider>;
};

export default AlertContext;
