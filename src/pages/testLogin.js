import React, { useState } from "react";
import Image from "next/image";
import InputMask from "react-input-mask";

import logo from "../assets/images/logo.png";
import carAndHome from "../assets/images/car-home.png";
// import {router} from "next/client";

const TestLogin = () => {
  const [iin, setIin] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmCode, setConfirmCode] = useState("");

  const [step, setStep] = useState("initial");

  function sendConfirmSMS(event) {
    event.preventDefault(); // страница обновить етілмеу үшін
    console.log(phone);
    fetch("/api/sendCode", {
      method: "POST",
      body: JSON.stringify({
        phone,
      }),
    });
  }

  async function register(event) {
    event.preventDefault(); // страница обновить етілмеу үшін
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        phone,
        confirmCode,
      }),
    });
    console.log(response);
    if (response.status === 200) {
      console.log("Success");
      // convert iin to base64
      const base64 = Buffer.from(iin).toString("base64");
      // save it in localstorage
      localStorage.setItem("iin", base64);
      // redirect to main page
      // await router.push("/")
    }
  }

  return (
    <div className="auth">
      <div className="auth__banner auth-banner">
        <div className="auth-banner__content">
          <Image src={logo} className="auth-banner__content-logo" alt="logo" />
          <Image
            src={carAndHome}
            className="auth-banner__content-img"
            alt="car and home"
          />
          <div className="auth-banner__content-text">
            <h2>Пайызсыз өмір сүр</h2>
            <p>У вас нету аккаунта? Зарегистрировайтесть</p>
          </div>
        </div>
      </div>
      <div className="auth__form">
        {step === "initial" && (
          <form className="auth-form">
            <h3 className="auth-form__title">Введите номер телефона</h3>
            <div className="auth-form__fields">
              <div className="auth-form__field field">
                <div className="field__title">Номер телефона</div>
                <InputMask
                  mask="+7 (999) 999-99-99"
                  maskChar="_"
                  className="field__input"
                  placeholder="Введите номер"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <button className="auth-form__btn" onClick={sendConfirmSMS}>
              Отправить СМС
            </button>
          </form>
        )}

        {step === "confirm" && (
          <form className="auth-form">
            <h3 className="auth-form__title">Войти</h3>
            <div className="auth-form__fields">
              <div className="auth-form__field field">
                <div className="field__title">ИИН</div>
                <input
                  type="number"
                  className="field__input"
                  placeholder="Введите ИИН"
                  onChange={(e) => setIin(e.target.value)}
                />
              </div>
              <div className="auth-form__field field">
                <div className="field__title">Номер телефона</div>
                <input
                  type="tel"
                  className="field__input"
                  placeholder="Введите номер"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button className="auth-form__btn" onClick={sendConfirmSMS}>
                  Отправить СМС
                </button>
              </div>
              <div className="auth-form__field field">
                <div className="field__title">Код подтверждения</div>
                <input
                  type="text"
                  className="field__input"
                  placeholder="Введите код из смс"
                  onChange={(e) => setConfirmCode(e.target.value)}
                />
              </div>
            </div>
            <div className="auth-form__options">
              <div className="save">
                <input type="checkbox" />
                <span>Запомнить меня</span>
              </div>
              <div className="forgot">Забыли пароль?</div>
            </div>
            <button className="auth-form__btn" onClick={register}>
              Авторизоваться
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TestLogin;
