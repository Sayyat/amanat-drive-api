import Image from "next/image";
import React from "react";
import phoneImage from "../assets/images/phone.png";
import styles from "./Header/header.module.scss";

const AccountInfo = ({ data }) => {
  return (
    <div className={styles.logout}>
      <Image
        className={styles.accountImage}
        src={data?.picture || phoneImage}
        width={50}
        height={50}
        alt="account image"
      />
      <span className={styles.account}>{data?.phone || data?.name}</span>
    </div>
  );
};

export default AccountInfo;
