import React from "react";
import Image from "next/image";
import empty from "../../assets/images/empty.svg";
import styles from "./table.module.scss";

const TableOneCAll = ({data}) => {
    return (
        <div className={styles.table}>

            <div className={styles.tableWrapper}>
                {data.sharers.length <= 0 ? (
                    <div className={styles.empty}>
                        <Image src={empty} alt="Empty"/>
                        <div className={styles.empty__title}>Нет данных</div>
                    </div>
                ) : (
                    <div><h3>
                        {data.listName}
                    </h3>
                        <table>
                            <thead>
                            <tr>
                                <td>№</td>
                                <td>Сумма недвижимости</td>
                                <td>Дата сделки</td>
                                <td>Ф.И.О.</td>
                                <td>ИИН</td>
                            </tr>
                            </thead>
                            <tbody>
                            {data.sharers.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td>{row["buildingPrice"]}</td>
                                    <td>{row["contractNumber"]}</td>
                                    <td>{row["date"]}</td>
                                    <td>{row["fullname"]}</td>
                                    <td>{row["iin"]}</td>
                                </tr>
                            ))}
                            <tr key={"summaryRow"}>
                                <td>{data.summary["buildingPrice"]}</td>
                                <td>{data.summary["contractNumber"]}</td>
                                <td>{data.summary["date"]}</td>
                                <td>{data.summary["fullname"]}</td>
                                <td>{data.summary["iin"]}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TableOneCAll;
