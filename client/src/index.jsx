import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import { LicenseInfo } from "@mui/x-license-pro";
import moment from "moment";
import "moment/locale/he";
import "./index.css";
import "@styles/mui-buttons.css";
import "@styles/mui-datepicker.css";
import "./iconify-offline";
import { getQueryData, updateQueryData } from "@services";
import { muiLicenseKey } from "@environment";
import App from "./App";

moment.locale("he");

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryData,
      onError: (err) => console.error(err),
    },
    mutations: {
      mutationFn: updateQueryData,
      onError: (err) => console.error(err),
    },
  },
});

LicenseInfo.setLicenseKey(muiLicenseKey);

ReactDOM.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <span style={{ direction: "ltr" }}>
          <ReactQueryDevtools />
        </span>
      </BrowserRouter>
    </QueryClientProvider>
  </RecoilRoot>,
  document.getElementById("root")
);
