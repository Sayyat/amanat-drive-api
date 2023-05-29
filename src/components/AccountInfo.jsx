import Image from "next/image";
import React from "react";
import phoneImage from "../assets/images/phone.png";
import styles from "./Header/header.module.scss";

const AccountInfo = ({userData}) => {
    return (
        <div className={styles.logout}>
            <Image
                className={styles.accountImage}
                src={userData?.picture || phoneImage}
                width={50}
                height={50}
                alt="account image"
            />
            <span className={styles.account}>{userData?.fullname || userData?.phone || userData?.googleName}</span>
            <span>{userData?.isAdmin && "Аналитик"}</span>
        </div>
    );
};


export default AccountInfo;
