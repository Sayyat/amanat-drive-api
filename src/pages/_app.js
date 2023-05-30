import {Provider} from "react-redux";
import store from "../store";
import "@/styles/globals.scss";
import {useRouter} from "next/router";
import Menu from "@/components/Menu";
import {useEffect, useState} from "react";
import Header from "@/components/Header";
import {useLocalStorage} from "@/hooks/useLocalStorage";

export default function App({Component, pageProps}) {
    const router = useRouter()
    const {pathname, push} = router
    const [userData, setUserData] = useState({})
    const {getUserData} = useLocalStorage()
    useEffect(() => {

        const userData = getUserData()
        if(!userData) {
            push("/login")
            return
        }
        setUserData(userData)
    }, [pathname])


    return (
        <Provider store={store}>
            <div className="app">
                {pathname === "/login" ? (
                    <Component {...pageProps} />
                ) : (
                    <div className="wrapper">
                        <Menu userData={userData}/>
                        <div className="content">
                            <Header userData={userData} />
                            <Component {...pageProps} />
                        </div>
                    </div>
                )}
            </div>
        </Provider>
    );
}
