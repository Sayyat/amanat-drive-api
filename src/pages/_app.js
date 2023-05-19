import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "../store";
import Menu from "@/components/Menu";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();

  return (
    <Provider store={store}>
      <div className="app">
        {pathname === "/login" ? (
          <Component {...pageProps} />
        ) : (
          <div className="wrapper">
            <Menu />
            <Component {...pageProps} />
          </div>
        )}
      </div>
    </Provider>
  );
}
