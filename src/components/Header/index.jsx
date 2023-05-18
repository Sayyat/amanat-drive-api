import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import LinesEllipsis from "react-lines-ellipsis";

import { click } from "../../store/slices/burgerSlice";
import logout from "../../assets/images/logout.png";
import styles from "./header.module.scss";

const Header = () => {
  const { pathname } = useRouter();
  const dispatch = useDispatch();

  console.log("router", pathname);

  const handleBurger = () => {
    dispatch(click());
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
              text="Пайщики автомобилей"
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
      <div className={styles.logout}>
        <span>Выйти</span>
        <Image src={logout} alt="logout" />
      </div>
    </header>
  );
};

export default Header;
