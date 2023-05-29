import React, {useEffect, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/router";
import {PatternFormat} from "react-number-format";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import logo from "../assets/images/logo.png";
import carAndHome from "../assets/images/car-home.png";

const Login = () => {
    const phoneNumberRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    const {push} = useRouter();
    const [step, setStep] = useState("number");
    const [phone, setPhone] = useState("");
    const [timestamp, setTimestamp] = useState("");
    const [confirmCode, setConfirmCode] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [googleName, setGoogleName] = useState("");
    const [picture, setPicture] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [iin, setIin] = useState("");
    const [isErrorCode, setIsErrorCode] = useState(false);
    const formattedPhoneNumber = phone.replace(/\D/g, "");

    useEffect(() => {
        if(localStorage.getItem("userData")){
            push("/")
        }
    } , [])

    const sendCode = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/sendCode", {
                method: "POST",
                body: JSON.stringify({phone: formattedPhoneNumber}),
            });

            const {timestamp} = await res.json()
            setTimestamp(timestamp)

            setStep("confirm")

        } catch (e) {
            console.error(e);
        }
    };

    const confirmSms = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/confirm", {
                method: "POST",
                body: JSON.stringify({timestamp, phone: formattedPhoneNumber, confirmCode}),
            });

            if (res.status === 400) {
                setIsErrorCode(true);
                return
            }

            const {isAdmin} = await res.json()
            setIsAdmin(isAdmin)
            setStep("data")
        } catch (e) {
            console.error(e);
        }
    };

    const enter = async (e) => {
        e.preventDefault();
        let fullname = `${lastname} ${firstname} ${middlename}`
        localStorage.setItem("userData", Buffer.from(JSON.stringify({isAdmin, phone, fullname, iin, googleName, picture})).toString("base64"));
        push("/");
    };

    const handleFocus = () => {
        setIsErrorCode(false);
    };


    function success(result) {
        const {name, picture} = jwtDecode(result.credential)
        console.log({name, picture} )
        setGoogleName(name)
        setPicture(picture)
        setStep("data")
    }

    function error() {
    }

    return (
        <div className="auth">
            <div className="auth__banner auth-banner">
                <div className="auth-banner__content">
                    <Image src={logo} className="auth-banner__content-logo" alt="logo"/>
                    <Image
                        src={carAndHome}
                        className="auth-banner__content-img"
                        alt="car and home"
                    />
                    <div className="auth-banner__content-text">
                        <h2>Пайызсыз өмір сүр</h2>
                        <p>
                            Если у вас возникают проблемы с авторизацией, пожалуйста,
                            обратитесь в нашу службу поддержки для получения помощи
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form">
                <form className="auth-form">
                    {step === "number" && (
                        <>
                            <h3 className="auth-form__title">Отправка SMS кода</h3>
                            <div className="auth-form__fields">
                                <div className="auth-form__field field">
                                    <div className="field__title">Введите номер телефона</div>
                                    <PatternFormat
                                        format="+7 (###) ###-##-##"
                                        allowEmptyFormatting
                                        mask="_"
                                        className="field__input" placeholder='+7 (___) ___-__-__'
                                        value={phone} onChange={(e) => {
                                        setPhone(e.target.value);
                                    }}/>
                                </div>
                                <button
                                    className="auth-form__btn"
                                    onClick={sendCode}
                                    disabled={!phoneNumberRegex.test(phone)}
                                >
                                    Отправить
                                </button>
                            </div>
                            <div className="line"></div>
                            <div className={"oauth"}>

                                <GoogleOAuthProvider
                                    clientId={"1073982536661-u50ihostb12fjvqlnph7g2gif14nam7b.apps.googleusercontent.com"}
                                >
                                    <GoogleLogin
                                        onSuccess={success}
                                        onError={error}
                                        logo_alignment={"center"}
                                    >

                                    </GoogleLogin>
                                </GoogleOAuthProvider>

                            </div>
                        </>
                    )}

                    {step === "confirm" && (
                        <>
                            <h3 className="auth-form__title">
                                Введите код <br/> из СМС
                            </h3>
                            <p className="auth-form__desc-phone">
                                Мы отправили код подтверждения на номер <br/>{" "}
                                <span>{phone}</span>
                            </p>
                            <div className="auth-form__fields">
                                <div className="auth-form__field field">
                                    <PatternFormat
                                        format="####"
                                        allowEmptyFormatting
                                        mask="_"
                                        className="field__input field__inputCode"
                                        placeholder='____'
                                        value={confirmCode}
                                        onChange={(e) => setConfirmCode(e.target.value)}
                                        onFocus={handleFocus}
                                        style={isErrorCode ? {borderColor: "#e92d45"} : {}}
                                    />
                                    {isErrorCode && (
                                        <div className="field__error">
                                            Неверный код. Попробуйте еще раз
                                        </div>
                                    )}
                                </div>
                                <button className="auth-form__btn" onClick={confirmSms}>
                                    Подтвердить
                                </button>
                            </div>
                        </>
                    )}

                    {step === "data" && (
                        <>
                            <h3 className="auth-form__title">Ваши данные</h3>
                            <div className="auth-form__fields">
                                <div className="auth-form__field field">
                                    <div className="field__title">Фамилия</div>
                                    <input
                                        type="text"
                                        name="lastname"
                                        className="field__input"
                                        required
                                        onChange={e => {
                                        e.preventDefault()
                                        setLastname(e.target.value)
                                    }}/>
                                </div>
                                <div className="auth-form__field field">
                                    <div className="field__title">Имя</div>
                                    <input type="text" name="firstname" className="field__input" onChange={e => {
                                        e.preventDefault()
                                        setFirstname(e.target.value)
                                    }}/>
                                </div>
                                <div className="auth-form__field field">
                                    <div className="field__title">Отчество</div>
                                    <input type="text" name="middlename" className="field__input" onChange={e => {
                                        e.preventDefault()
                                        setMiddlename(e.target.value)
                                    }}/>
                                </div>
                                <div className="auth-form__field field">
                                    <div className="field__title">ИИН</div>
                                    <PatternFormat
                                        name="iin"
                                        format="############"
                                        allowEmptyFormatting
                                        mask="_"
                                        className="field__input field__inputCode"
                                        placeholder='____________'
                                        onChange={(e) => {
                                            e.preventDefault()
                                            setIin(e.target.value)
                                        }}
                                        onFocus={handleFocus}
                                        style={isErrorCode ? {borderColor: "#e92d45"} : {}}
                                    />
                                </div>
                                <button
                                    className="auth-form__btn"
                                    onClick={enter}
                                    disabled={!firstname || !lastname || !iin}
                                >
                                    Войти
                                </button>
                            </div>
                        </>
                    )}

                </form>
            </div>
        </div>
    );
};

export default Login;
