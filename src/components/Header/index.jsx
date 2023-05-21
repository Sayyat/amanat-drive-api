import React, {useEffect, useState} from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import LinesEllipsis from "react-lines-ellipsis";
import { click } from "@/store/slices/burgerSlice";
import logoutImage from "../../assets/images/logout.png";
import phoneImage from "../../assets/images/phone.png";
import styles from "./header.module.scss";

const Header = () => {
  const { push, pathname } = useRouter();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({phone: "", name: "", picture: ""})
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")))
  }, [])


  const handleBurger = () => {
    dispatch(click());
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userData");
    push("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerRight}>
        <div className={styles.burger} onClick={handleBurger}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 6H10.5"
              stroke="black"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.5 3H10.5"
              stroke="black"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.5 9H10.5"
              stroke="black"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 className={styles.pageTitle}>
          {pathname === "/" && (
            <LinesEllipsis
              text="Моя очередь"
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          )}
          {pathname === "/given-auto" && (
            <LinesEllipsis
              text="Получившие авто"
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          )}
          {pathname === "/given-house" && (
            <LinesEllipsis
              text="Получившие жилье"
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          )}
          {pathname === "/transfer" && (
            <LinesEllipsis
              text="Переуступка"
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          )}
        </h2>
      </div>
      <div className={styles.logout} onClick={logout}>
        <Image className={styles.accountImage} src={userData.picture || phoneImage} width={50} height={50} alt="logout" />
        <span className={styles.account}>{userData.phone || userData.name}</span>
      </div>
      <div className={styles.logout} onClick={logout}>
        <span>Выйти</span>
        <Image src={logoutImage} alt="logout" />
      </div>
    </header>
  );
};

export default Header;
