import { Provider } from "react-redux";
import store from "../store";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="app">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
