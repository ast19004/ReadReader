import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-contex";
import { ReaderContextProvider } from "./store/reader-contex";
import { PrizeContextProvider } from "./store/prize-context";
import { ScrollContextProvider } from "./store/scroll-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ScrollContextProvider>
        <ReaderContextProvider>
          <PrizeContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PrizeContextProvider>
        </ReaderContextProvider>
      </ScrollContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
