import React from 'react'
import Image from 'next/image';
import logo from '../assets/images/logo.png';
import carAndHome from '../assets/images/car-home.png';

const Login = () => {
  return (
    <div className="auth">
      <div className="auth__banner auth-banner">
        <div className="auth-banner__content">
          <Image src={logo} className="auth-banner__content-logo" alt="logo" />
          <Image src={carAndHome} className="auth-banner__content-img" alt="car and home" />
          <div className="auth-banner__content-text">
            <h2>Пайызсыз өмір сүр</h2>
            <p>У вас нету аккаунта? Зарегистрировайтесть</p>
          </div>
        </div>
      </div>
      <div className="auth__form">
        <from className="auth-form">
          <h3 className="auth-form__title">
            Войти
          </h3>
          <div className="auth-form__fields">
            <div className="auth-form__field field">
              <div className="field__title">E-mail</div>
              <input type="email" className="field__input" placeholder="Введите email" />
            </div>
            <div className="auth-form__field field">
              <div className="field__title">Пароль</div>
              <input type="email" className="field__input" placeholder="Введите пароль" />
            </div>
          </div>
          <div className="auth-form__options">
            <div className="save">
              <input type="checkbox" />
              <span>Сохранить меня</span>
            </div>
            <div className="forgot">
              Забыли пароль?
            </div>
          </div>
          <button className="auth-form__btn" onSubmit>
            Войти
          </button>
        </from>
      </div>
    </div>
  )
}

export default Login