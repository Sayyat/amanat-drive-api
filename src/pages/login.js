import React, { useState } from "react";
import Image from "next/image";
import InputMask from "react-input-mask";

import logo from "../assets/images/logo.png";
import carAndHome from "../assets/images/car-home.png";
import { useRouter } from "next/navigation";

const Login = () => {
  const phoneNumberRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [step, setStep] = useState("initial");

  const formattedPhoneNumber = phone.replace(/\D/g, "");
  const finalPhoneNumber = "+" + formattedPhoneNumber;

  console.log("phoneDecode", finalPhoneNumber)

  const sendCode = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/sendCode", {
        method: "POST",
        body: JSON.stringify({ finalPhoneNumber }),
      });

      if (res.status === 200) {
        setStep("send");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ finalPhoneNumber, confirmCode }),
      });

      if (res.status === 200) {
        localStorage.setItem("authorized", "1");
        router.push("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

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
            <p>
              Если у вас возникают проблемы с авторизацией, пожалуйста,
              обратитесь в нашу службу поддержки для получения помощи
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form">
        <form className="auth-form">
          {step === "initial" && (
            <>
              <h3 className="auth-form__title">Отправка SMS кода</h3>
              <div className="auth-form__fields">
                <div className="auth-form__field field">
                  <div className="field__title">Введите номер телефона</div>
                  <InputMask
                    mask="+7 (999) 999-99-99"
                    maskChar="_"
                    className="field__input"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>
                <button
                  className="auth-form__btn"
                  onClick={sendCode}
                  disabled={!phoneNumberRegex.test(phone)}
                >
                  Отправить
                </button>
              </div>
            </>
          )}

          {step === "send" && (
            <>
              <h3 className="auth-form__title">
                Введите код <br /> из СМС
              </h3>
              <p className="auth-form__desc-phone">
                Мы отправили код подтверждения на номер <br />{" "}
                <span>{phone}</span>
              </p>
              <div className="auth-form__fields">
                <div className="auth-form__field field">
                  <InputMask
                    mask="9999"
                    maskChar="_"
                    className="field__input field__inputCode"
                    placeholder="____"
                    value={confirmCode}
                    onChange={(e) => setConfirmCode(e.target.value)}
                  />
                </div>
                <button className="auth-form__btn" onClick={register}>
                  Авторизоваться
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
