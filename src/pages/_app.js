import {Provider} from "react-redux";
import store from "../store";
import "@/styles/globals.scss";
import Menu from "@/components/Menu";
import Header from "@/components/Header";
import Login from "@/components/Login"
import {useUserData} from "@/hooks/useUserData";
import Loading from "@/components/Loading";


export default function App({Component, pageProps}) {
    const {userData, loading, saveUserId, removeUserId} = useUserData()

    return (<Provider store={store}>
        <div className="app">
            {loading ?
                <Loading></Loading> :
                userData === null ? <Login saveUserId={saveUserId} {...pageProps}/> :
                    (
                        <div className="wrapper">
                            <Menu userData={userData}/>
                            <div className="content">
                                <Header userData={userData} removeUserId={removeUserId}/>
                                <Component userData={userData}  {...pageProps} />
                            </div>
                        </div>)}
        </div>
    </Provider>);
}
