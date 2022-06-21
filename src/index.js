import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ContextProvider } from "./context/store";
import reducer, { initialState } from "./context/reducers";

export const BASEURL = "https://fa3f-171-225-184-188.ap.ngrok.io";
axios.defaults.baseURL = "https://fa3f-171-225-184-188.ap.ngrok.io/api";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ContextProvider initialState={initialState} reducer={reducer}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </ContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
