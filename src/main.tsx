import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";

import { RouterProvider } from "react-router-dom";
import appRouter from "./routers.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter}></RouterProvider>
    </Provider>
  </StrictMode>
);
