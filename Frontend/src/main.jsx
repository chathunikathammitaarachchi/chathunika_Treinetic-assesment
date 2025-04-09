import React from "react";
import ReactDOM from "react-dom/client"; 
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux"; 
import { store } from "./api/store"; 
import { BrowserRouter } from "react-router-dom"; 


const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById("root")); 


root.render(
  <Provider store={store}> 
    <ThemeProvider theme={theme}>
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
