// import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import InjectTailwind from "./InjectTailwind.tsx";
import { render } from "react-dom";
import { LoadScript } from "@react-google-maps/api";

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <BrowserRouter>
      <InjectTailwind>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <App />
      </LoadScript>
      </InjectTailwind>
    </BrowserRouter>
  </Provider>
,rootElement);
