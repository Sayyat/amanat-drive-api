import React from "react";
import Image from "next/image";
import {useRouter} from "next/router";
import Search from "../Search";
import banner0 from "../../assets/images/banner/banner-0.png";
import banner1 from "../../assets/images/banner/banner-1.png";
import banner2 from "../../assets/images/banner/banner-2.png";
import banner3 from "../../assets/images/banner/banner-3.png";
import styles from "./banner.module.scss";

const Banner = ({iin, handleInput, findByIIN}) => {
    const {pathname} = useRouter();
    return (
        <div className={styles.banner}>
            <div className={styles.banner__text}>
                <h3>
                    {pathname === "/" && "Моя очередь"}
                    {pathname === "/given-auto" && "Получившие авто"}
                    {pathname === "/given-house" && "Получившие жилье"}
                    {pathname === "/transfer" && "Переуступка"}
                    {pathname === "/one-c" && "База пополненных счетов"}
                </h3>
                <p>
                    {pathname === "/" && "Для поиска введите свой ИИН или Ф.И.О. в поле «ПОИСК»"}
                    {(pathname === "/given-auto" || pathname === "/given-house") &&
                        "Для поиска введите ИИН или Ф.И.О. в поле «ПОИСК»"}
                    {pathname === "/transfer" &&
                        "Уступка прав требования или иного имущества"}
                </p>
                {(pathname === "/" || pathname === "/one-c" || pathname === "/given-auto" || pathname === "/given-house") && (
                    <Search iin={iin} handleInput={handleInput} findByIIN={findByIIN}/>
                )}
            </div>
            <div className={styles.banner__img}>
                {pathname === "/" && <Image src={banner0} alt="Моя очередь" priority="true"/>}
                {pathname === "/given-auto" && (
                    <Image src={banner1} alt="Получившие авто" priority="true"/>
                )}
                {pathname === "/given-house" && (
                    <Image src={banner2} alt="Получившие жилье" priority="true"/>
                )}
                {pathname === "/transfer" && <Image src={banner3} alt="Переуступка" priority="true"/>}
            </div>
        </div>
    );
};

export default Banner;
