import React from "react";
import ToggleColorMode from "./components/ToggleColorMode";
import Views from "./components/Views";
import UserContextProvider from "./context/AuthContext";
function App() {
  return (
    <div className='App'>
      <UserContextProvider>
        <Views />
        <ToggleColorMode />
      </UserContextProvider>
    </div>
  );
}

export default App;
