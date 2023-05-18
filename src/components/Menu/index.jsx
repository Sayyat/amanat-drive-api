import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { click } from "../../store/slices/burgerSlice";
import logo from "../../assets/images/logo-dark.png";
import Image from "next/image";
import styles from "./menu.module.scss";

const Menu = () => {
  const burger = useSelector((state) => state.burger.value);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
        <div
      className={
        burger ? `${styles.menu} ${styles.menuActive}` : `${styles.menu}`
      }
    >
      <div className={styles.menuLogo}>
        <Image src={logo} alt="logo" />
      </div>

      <nav className={styles.nav}>
        <Link
          href="/"
          className={
            router.pathname === "/"
              ? `${styles.nav__link} ${styles.nav__linkActive}`
              : `${styles.nav__link}`
          }
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.0001 7.16C17.9401 7.15 17.8701 7.15 17.8101 7.16C16.4301 7.11 15.3301 5.98 15.3301 4.58C15.3301 3.15 16.4801 2 17.9101 2C19.3401 2 20.4901 3.16 20.4901 4.58C20.4801 5.98 19.3801 7.11 18.0001 7.16Z"
              stroke="#8e8d8f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.9704 14.4402C18.3404 14.6702 19.8504 14.4302 20.9104 13.7202C22.3204 12.7802 22.3204 11.2402 20.9104 10.3002C19.8404 9.59016 18.3104 9.35016 16.9404 9.59016"
              stroke="#8e8d8f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.97047 7.16C6.03047 7.15 6.10047 7.15 6.16047 7.16C7.54047 7.11 8.64047 5.98 8.64047 4.58C8.64047 3.15 7.49047 2 6.06047 2C4.63047 2 3.48047 3.16 3.48047 4.58C3.49047 5.98 4.59047 7.11 5.97047 7.16Z"
              stroke="#8e8d8f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.00043 14.4402C5.63043 14.6702 4.12043 14.4302 3.06043 13.7202C1.65043 12.7802 1.65043 11.2402 3.06043 10.3002C4.13043 9.59016 5.66043 9.35016 7.03043 9.59016"
              stroke="#8e8d8f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.0001 14.6302C11.9401 14.6202 11.8701 14.6202 11.8101 14.6302C10.4301 14.5802 9.33008 13.4502 9.33008 12.0502C9.33008 10.6202 10.4801 9.47021 11.9101 9.47021C13.3401 9.47021 14.4901 10.6302 14.4901 12.0502C14.4801 13.4502 13.3801 14.5902 12.0001 14.6302Z"
              stroke="#8e8d8f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.08973 17.7804C7.67973 18.7204 7.67973 20.2603 9.08973 21.2003C10.6897 22.2703 13.3097 22.2703 14.9097 21.2003C16.3197 20.2603 16.3197 18.7204 14.9097 17.7804C13.3197 16.7204 10.6897 16.7204 9.08973 17.7804Z"
              stroke="#8e8d8f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Пайщики</span>
        </Link>
        <Link
          href="/"
          className={
            router.pathname === "/1"
              ? `${styles.nav__link} ${styles.nav__linkActive}`
              : `${styles.nav__link}`
          }
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.0001 7.16C17.9401 7.15 17.8701 7.15 17.8101 7.16C16.4301 7.11 15.3301 5.98 15.3301 4.58C15.3301 3.15 16.4801 2 17.9101 2C19.3401 2 20.4901 3.16 20.4901 4.58C20.4801 5.98 19.3801 7.11 18.0001 7.16Z"
              stroke="#8e8d8f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.9704 14.4402C18.3404 14.6702 19.8504 14.4302 20.9104 13.7202C22.3204 12.7802 22.3204 11.2402 20.9104 10.3002C19.8404 9.59016 18.3104 9.35016 16.9404 9.59016"
              stroke="#8e8d8f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.97047 7.16C6.03047 7.15 6.10047 7.15 6.16047 7.16C7.54047 7.11 8.64047 5.98 8.64047 4.58C8.64047 3.15 7.49047 2 6.06047 2C4.63047 2 3.48047 3.16 3.48047 4.58C3.49047 5.98 4.59047 7.11 5.97047 7.16Z"
              stroke="#8e8d8f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.00043 14.4402C5.63043 14.6702 4.12043 14.4302 3.06043 13.7202C1.65043 12.7802 1.65043 11.2402 3.06043 10.3002C4.13043 9.59016 5.66043 9.35016 7.03043 9.59016"
              stroke="#8e8d8f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.0001 14.6302C11.9401 14.6202 11.8701 14.6202 11.8101 14.6302C10.4301 14.5802 9.33008 13.4502 9.33008 12.0502C9.33008 10.6202 10.4801 9.47021 11.9101 9.47021C13.3401 9.47021 14.4901 10.6302 14.4901 12.0502C14.4801 13.4502 13.3801 14.5902 12.0001 14.6302Z"
              stroke="#8e8d8f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.08973 17.7804C7.67973 18.7204 7.67973 20.2603 9.08973 21.2003C10.6897 22.2703 13.3097 22.2703 14.9097 21.2003C16.3197 20.2603 16.3197 18.7204 14.9097 17.7804C13.3197 16.7204 10.6897 16.7204 9.08973 17.7804Z"
              stroke="#8e8d8f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Пайщики</span>
        </Link>
      </nav>

      <div className={styles.contacts}>
        <a href="tel:+77478753918" className={styles.contacts__phone}>
          +7 747 875 39 18
        </a>
        <a href="mailto:support@gmail.com">
          support@gmail.com
        </a>
      </div>

      {burger && (
        <div className={styles.menuClose} onClick={() => dispatch(click())}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 3L3 9"
              stroke="#fff"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 3L9 9"
              stroke="#fff"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>

    {
      burger &&  <div className={styles.menuOverlay} onClick={() => dispatch(click())}></div> 
    }
    </>
  );
};

export default Menu;
