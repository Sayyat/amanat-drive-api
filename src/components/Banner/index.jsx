import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Search from "../Search";
import banner0 from "../../assets/images/banner/banner-0.png";
import banner1 from "../../assets/images/banner/banner-1.png";
import banner2 from "../../assets/images/banner/banner-2.png";
import banner3 from "../../assets/images/banner/banner-3.png";
import styles from "./banner.module.scss";

const Banner = ({ iin, handleInput, findByIIN }) => {
  const { pathname } = useRouter();
  return (
    <div className={styles.banner}>
      <div className={styles.banner__text}>
        <h3>
          {pathname === "/" && "Моя очередь"}
          {pathname === "/given-auto" && "Получившие авто"}
          {pathname === "/given-house" && "Получившие жилье"}
          {pathname === "/transfer" && "Переуступка"}
        </h3>
        <p>
          {pathname === "/" && "Для поиска введите свой ИИН в поле «ПОИСК»"}
          {pathname === "/given-auto" &&
            "Член паевого товарищества, лицо, внесшее пай для автомобиля"}
          {pathname === "/given-house" &&
            "Член паевого товарищества, лицо, внесшее пай для жилья"}
          {pathname === "/transfer" &&
            "Уступка прав требования или иного имущества"}
        </p>
        {pathname === "/" && (
          <Search iin={iin} handleInput={handleInput} findByIIN={findByIIN} />
        )}
      </div>
      <div className={styles.banner__img}>
        {pathname === "/" && <Image src={banner0} alt="Моя очередь" />}
        {pathname === "/given-auto" && (
          <Image src={banner1} alt="Получившие авто" />
        )}
        {pathname === "/given-house" && (
          <Image src={banner2} alt="Получившие жилье" />
        )}
        {pathname === "/transfer" && <Image src={banner3} alt="Переуступка" />}
      </div>
    </div>
  );
};

export default Banner;
