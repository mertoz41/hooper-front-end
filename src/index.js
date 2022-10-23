import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ChakraProvider>
);
