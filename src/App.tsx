import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./Main";
import { ConfigProvider } from "antd";

const theme = {
  colorPrimary: "#6b47ed",
  // colorInfo: "#6b47ed",
};
function App() {
  return (
    <ConfigProvider
      theme={{
        token: theme,
        components: {
          Radio: {
            // buttonCheckedBg: "#222222",
            radioSize: 12,
            dotSize: 0,
            // buttonCheckedBgDisabled: "#4096ff",
            // buttonCheckedColorDisabled: "rgba(0, 0, 0, 0.88)",
          },
        },
      }}
    >
      <div className="App h-screen flex justify-center items-center bg-gray-200 font-nunito">
        <Main />
      </div>
    </ConfigProvider>
  );
}

export default App;
