import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";
// import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>,
  //</StrictMode>
);
