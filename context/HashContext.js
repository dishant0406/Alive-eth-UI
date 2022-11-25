import { createContext, useContext, useState } from "react";

const HashContext = createContext();

export function HashContextProvider({ children }) {
  const [audioHash, setAudioHash] = useState();
  const [imageHash, setImageHash] = useState();
  const [jsonHash, setJsonHash] = useState();

  return (
    <HashContext.Provider
      value={{
        audioHash,
        imageHash,
        jsonHash,
        setAudioHash,
        setImageHash,
        setJsonHash,
      }}
    >
      {" "}
      {children}{" "}
    </HashContext.Provider>
  );
}

export function UseHash() {
  return useContext(HashContext);
}
