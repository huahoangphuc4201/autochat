import { createContext, useReducer } from "react";
import reducer, { initState } from "./reducer";

const ChatBoxContext = createContext();

function ChatBoxContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);
  const states = state;

  return (
    <ChatBoxContext.Provider value={{ states, dispatch }}>
      {children}
    </ChatBoxContext.Provider>
  );
}

export { ChatBoxContextProvider, ChatBoxContext };
