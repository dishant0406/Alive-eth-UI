import { createContext, useContext, useState } from "react";

const HashContext = createContext();

export function HashContextProvider({ children }) {
  const [audioHash, setAudioHash] = useState();
  const [imageHash, setImageHash] = useState();
  const [jsonHash, setJsonHash] = useState();
  const [splitWalletAddress, setSplitWalletAddress] = useState()
  const [pageState, setPageState] = useState(false)

  return (
    <HashContext.Provider
      value={{
        audioHash,
        imageHash,
        jsonHash,
        pageState,
        setAudioHash,
        setImageHash,
        setJsonHash,
        setPageState
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
