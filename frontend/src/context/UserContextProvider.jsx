import React, { createContext, useState } from "react";

const userContext = createContext();

function UserContextProvider({ children }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  
  return (
    <userContext.Provider value={{ name, setName, username, setUsername }}>
      {children}
    </userContext.Provider>
  );
}

export { UserContextProvider, userContext };
