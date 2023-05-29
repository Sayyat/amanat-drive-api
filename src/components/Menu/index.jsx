import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";
import {useSelector, useDispatch} from "react-redux";
import {click, clickLink} from "@/store/slices/burgerSlice";
import logo from "../../assets/images/logo-dark.png";
import styles from "./menu.module.scss";
import AccountInfo from "../AccountInfo";

const Menu = () => {
    const burger = useSelector((state) => state.burger.value);
    const [userData, setUserData] = useState({phone: "", name: "", picture: ""})
    const dispatch = useDispatch();
    const {pathname} = useRouter();

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("userData")))
    }, [])

    return (
        <>
            <div
                className={
                    burger ? `${styles.menu} ${styles.menuActive}` : `${styles.menu}`
                }
            >
                <div className={styles.menuLogo}>
                    <Image src={logo} alt="logo"/>
                </div>

                <div className={styles.accountInfo}>
                    <AccountInfo data={userData}/>
                </div>

                <nav className={styles.nav}>
                    <Link
                        href="/"
                        onClick={() => dispatch(clickLink())}
                        className={
                            pathname === "/"
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
                                d="M9.02 2.83999L3.63 7.03999C2.73 7.73999 2 9.22999 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28999 21.19 7.73999 20.2 7.04999L14.02 2.71999C12.62 1.73999 10.37 1.78999 9.02 2.83999Z"
                                stroke="#8E8D8F"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 17.99V14.99"
                                stroke="#8E8D8F"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>Моя очередь</span>
                    </Link>
                    {userData?.isAdmin && (<>

                        <Link
                            href="/one-c"
                            onClick={() => dispatch(clickLink())}
                            className={
                                pathname === "/one-c"
                                    ? `${styles.nav__link} ${styles.nav__linkActive}`
                                    : `${styles.nav__link}`
                            }
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 22H9C6 22 4 20 4 17V7C4 4 6 2 9 2H16C19 2 21 4 21 7V17C21 20 19 22 16 22Z"
                                      stroke="#8E8D8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4 15H21" stroke="#8E8D8F" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                                <path d="M7 12H8" stroke="#8E8D8F" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                                <path d="M7 9.5H8" stroke="#8E8D8F" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                                <path d="M7 7H8" stroke="#8E8D8F" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                                <path d="M16.4945 18.25H16.5035" stroke="#8E8D8F" strokeWidth="1.5"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>База платежей</span>
                        </Link>

                        <Link
                            href="/given-auto"
                            onClick={() => dispatch(clickLink())}
                            className={
                                pathname === "/given-auto"
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
                                    d="M15.51 2.83H8.49C6 2.83 5.45 4.07 5.13 5.59L4 11H20L18.87 5.59C18.55 4.07 18 2.83 15.51 2.83Z"
                                    stroke="#8E8D8F"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M21.9902 19.82C22.1002 20.99 21.1602 22 19.9602 22H18.0802C17.0002 22 16.8502 21.54 16.6602 20.97L16.4602 20.37C16.1802 19.55 16.0002 19 14.5602 19H9.44022C8.00022 19 7.79022 19.62 7.54022 20.37L7.34022 20.97C7.15022 21.54 7.00022 22 5.92022 22H4.04022C2.84022 22 1.90022 20.99 2.01022 19.82L2.57022 13.73C2.71022 12.23 3.00022 11 5.62022 11H18.3802C21.0002 11 21.2902 12.23 21.4302 13.73L21.9902 19.82Z"
                                    stroke="#8E8D8F"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M4 8H3"
                                    stroke="#8E8D8F"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M21 8H20"
                                    stroke="#8E8D8F"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 3V5"
                                    stroke="#8E8D8F"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10.5 5H13.5"
                                    stroke="#8E8D8F"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M6 15H9"
                                    stroke="#8E8D8F"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M15 15H18"
                                    stroke="#8E8D8F"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>Оплата авто</span>
                        </Link>

                        <Link
                            href="/given-house"
                            onClick={() => dispatch(clickLink())}
                            className={
                                pathname === "/given-house"
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
                                    d="M2 22H22"
                                    stroke="#8E8D8F"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M2.9502 22L3.00019 9.96999C3.00019 9.35999 3.2902 8.78004 3.7702 8.40004L10.7702 2.95003C11.4902 2.39003 12.5002 2.39003 13.2302 2.95003L20.2302 8.39003C20.7202 8.77003 21.0002 9.34999 21.0002 9.96999V22"
                                    stroke="#8E8D8F"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M13 17H11C10.17 17 9.5 17.67 9.5 18.5V22H14.5V18.5C14.5 17.67 13.83 17 13 17Z"
                                    stroke="#8E8D8F"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9.5 13.75H7.5C6.95 13.75 6.5 13.3 6.5 12.75V11.25C6.5 10.7 6.95 10.25 7.5 10.25H9.5C10.05 10.25 10.5 10.7 10.5 11.25V12.75C10.5 13.3 10.05 13.75 9.5 13.75Z"
                                    stroke="#8E8D8F"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M16.5 13.75H14.5C13.95 13.75 13.5 13.3 13.5 12.75V11.25C13.5 10.7 13.95 10.25 14.5 10.25H16.5C17.05 10.25 17.5 10.7 17.5 11.25V12.75C17.5 13.3 17.05 13.75 16.5 13.75Z"
                                    stroke="#8E8D8F"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M18.9998 7L18.9698 4H14.5698"
                                    stroke="#8E8D8F"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span>Оплата жилье</span>
                        </Link>

                        <Link
                            href="/transfer"
                            onClick={() => dispatch(clickLink())}
                            className={
                                pathname === "/transfer"
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
                                    d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                                    stroke="#8E8D8F"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M6.7002 9.26L12.0002 12.33L17.2602 9.28"
                                    stroke="#8E8D8F"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 17.77V12.32"
                                    stroke="#8E8D8F"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10.7603 6.29L7.56024 8.07C6.84024 8.47 6.24023 9.48 6.24023 10.31V13.7C6.24023 14.53 6.83024 15.54 7.56024 15.94L10.7603 17.72C11.4403 18.1 12.5602 18.1 13.2502 17.72L16.4503 15.94C17.1703 15.54 17.7702 14.53 17.7702 13.7V10.3C17.7702 9.47 17.1803 8.46 16.4503 8.06L13.2502 6.28C12.5602 5.9 11.4403 5.9 10.7603 6.29Z"
                                    stroke="#8E8D8F"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span>Переуступка</span>
                        </Link>
                    </>)}
                </nav>

                <div className={styles.contacts}>
                    <a href="tel:+77002359516" className={styles.contacts__phone}>
                        +7 700 235 95 16
                    </a>
                    <a href="mailto:support@amanatdrive.kz">support@amanatdrive.kz</a>
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

            {burger && (
                <div
                    className={styles.menuOverlay}
                    onClick={() => dispatch(click())}
                ></div>
            )}
        </>
    );
};

export default Menu;
