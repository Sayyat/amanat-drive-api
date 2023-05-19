import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import banner1 from "../../assets/images/banner/banner-1.png";
import styles from "./banner.module.scss";
import Search from "../Search";

const Banner = ({ iin, handleInput, findByIIN }) => {
  const { pathname } = useRouter();
  return (
    <div className={styles.banner}>
      <div className={styles.banner__text}>
        <h3>
          {pathname === "/" && "Моя очередь"}
          {pathname === "/given-house" && "Получившие авто"}
          {pathname === "/given-house" && "Получившие жилье"}
          {pathname === "/transfer" && "Переуступка"}
        </h3>
        <p>Для поиска введите свой ИИН в поле «ПОИСК»</p>
        <Search iin={iin} handleInput={handleInput} findByIIN={findByIIN} />
      </div>
      <div className={styles.banner__img}>
        <Image src={banner1} alt="" />
      </div>
    </div>
  );
};

export default Banner;
