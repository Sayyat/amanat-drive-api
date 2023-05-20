import React, {useState} from 'react'
import Image from 'next/image';
import logo from '../assets/images/logo.png';
import carAndHome from '../assets/images/car-home.png';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter()

  const [phone, setPhone] = useState("")
  const [confirmCode, setConfirmCode] = useState("")
  const [iin, setIin] = useState("")

  function sendCode(event){
    event.preventDefault()
    console.log({phone})
    fetch("/api/sendCode",{
      method: "POST",
      body: JSON.stringify({phone})
    })
  }

  async function register(event){
    event.preventDefault()
    const response = await fetch("/api/register",{
      method: "POST",
      body: JSON.stringify({phone, confirmCode})
    })

    if(response.status === 200){
      localStorage.setItem("authorized", "1")
      router.push('/');
    }
  }

  return (
    <div className="auth">
      <div className="auth__banner auth-banner">
        <div className="auth-banner__content">
          <Image src={logo} className="auth-banner__content-logo" alt="logo" />
          <Image src={carAndHome} className="auth-banner__content-img" alt="car and home" />
          <div className="auth-banner__content-text">
            <h2>Пайызсыз өмір сүр</h2>
            <p>У вас нету аккаунта? Зарегистрируйтесть</p>
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
              <div className="field__title">Номер</div>
              <input type="number" className="field__input" placeholder="Введите номер телефона" onChange={(event) => {setPhone(event.target.value)}}/>
            </div>
            <button className="auth-form__btn" onClick={sendCode}>
              Отправить код
            </button>
          </div>
          <br/>
          <div className="auth-form__fields">
            <div className="auth-form__field field">
              <div className="field__title">Код подтверждения</div>
              <input type="number" className="field__input" placeholder="Введите код из СМС" onChange={(event) => setConfirmCode(event.target.value)}/>
            </div>
            <button className="auth-form__btn" onClick={register}>
              Авторизоваться
            </button>
          </div>

        </from>
      </div>
    </div>
  )
}

export default Login