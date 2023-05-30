import React from "react";
import Image from "next/image";
import Link from "next/link";
import truePaid from '../../assets/images/done.svg'
import falsePaid from "@/assets/images/no-check.svg";
import empty from "../../assets/images/empty.svg";
import styles from "./table.module.scss";

const TableOneCAll = ({data, type, pathIndex}) => {
    console.log(data)
    const isType = type ? {type: type === "auto" ? "auto" : "house"} : {}
    return (
        <div className={`${styles.table} ${styles.tableFlex}`}>

                {data.sharers.length <= 0 ? (
                    <div className={styles.empty}>
                        <Image src={empty} alt="Empty"/>
                        <div className={styles.empty__title}>Нет данных</div>
                    </div>
                ) : (
                    <>
                        <h3 className={styles.tableTitle}>{data?.listName}</h3>
                        <div className={styles.tableWrapper}>
                            <table className={styles.oneCAllTable}>
                                <thead>
                                <tr>
                                    <td>№</td>
                                    <td>Ф.И.О.</td>
                                    <td>ИИН</td>
                                    <td>Договор</td>
                                    <td>Пополнено (<span className={styles.OneCLink}>{data.paidCount} / {data.sharers.length}</span>)</td>
                                </tr>
                                </thead>
                                <tbody>
                                {data.sharers.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td>{rowIndex + 1}</td>
                                        <td>{row["fullname"]}</td>
                                        <td className={styles.OneCTdLink}><
                                            Link className={styles.OneCLink} href={{ pathname: `/${pathIndex}/${row["iin"] ? row["iin"] : row["fullname"]}`, query: isType }}>
                                            {row["iin"] ? row["iin"] : "Подробнее"}
                                        </Link>
                                        </td>
                                        <td>{row["contractNumber"]}</td>
                                        <td>{row["isPaid"] ? <Image src={truePaid} alt="true check" /> : <Image src={falsePaid} alt="false check"/>}</td>
                                    </tr>
                                ))}
                                {/*<tr key={"summaryRow"}>*/}
                                {/*    <td>{data.summary["buildingPrice"]}</td>*/}
                                {/*    <td>{data.summary["contractNumber"]}</td>*/}
                                {/*    <td>{data.summary["date"]}</td>*/}
                                {/*    <td>{data.summary["fullname"]}</td>*/}
                                {/*    <td>{data.summary["iin"]}</td>*/}
                                {/*</tr>*/}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
        </div>
    );
};

export default TableOneCAll;
