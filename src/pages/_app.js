import {Provider} from "react-redux";
import store from "../store";
import "@/styles/globals.scss";
import Menu from "@/components/Menu";
import {useEffect, useState} from "react";
import Header from "@/components/Header";
import Login from "@/components/Login"
import {useUserData} from "@/hooks/useUserData";
import Loading from "@/components/Loading";

export default function App({Component, pageProps}) {
    const {fetchUserData, userId, setUserId} = useUserData()
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUserData(userId)
            .then(userData => {
                console.log(userData)
                setUserData(userData)
                setLoading(false)
            })
    }, [userId])


    return (
        <Provider store={store}>
            <div className="app">
                {
                    loading ? <Loading></Loading> :
                        !userId ? <Login setUserId={setUserId} {...pageProps}/>
                            : (
                                <div className="wrapper">
                                    <Menu userData={userData}/>
                                    <div className="content">
                                        <Header userData={userData} setUserId={setUserId}/>
                                        <Component userData={userData}  {...pageProps} />
                                    </div>
                                </div>
                            )
                }
            </div>
        </Provider>
    );
}
