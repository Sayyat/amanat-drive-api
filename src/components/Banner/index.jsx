import React from "react";
import banner1 from "../../assets/images/banner/banner-1.png";
import Image from "next/image";
import styles from "./banner.module.scss";
import Search from "../Search";

const Banner = ({ iin, handleInput, findByIIN }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.banner__text}>
        <h3>Пайщики автомобилей</h3>
        <p>Член паевого товарищества, лицо, внесшее пай для автомобиля</p>
        <Search iin={iin} handleInput={handleInput} findByIIN={findByIIN} />
      </div>
      <div className={styles.banner__img}>
        <Image src={banner1} alt="" />
      </div>
    </div>
  );
};

export default Banner;
