import React, {Fragment} from "react";
import Image from "next/image";
import Link from "next/link";
import empty from "../../assets/images/empty.svg";
import styles from "./table.module.scss";

const TableOneCSingle = ({data}) => {
    return (
        <div className={styles.table}>

            <div className={styles.tableWrapper}>
                {data.sharers.length <= 0 ? (
                    <div className={styles.empty}>
                        <Image src={empty} alt="Empty"/>
                        <div className={styles.empty__title}>Нет данных</div>
                    </div>
                ) : (
                    <div>
                        <h3 className={styles.tableTitle}>{data?.listName}</h3>
                        <table>
                            <thead>
                            <tr>
                                <td>№</td>
                                <td>Договор</td>
                                <td>Дата расторжения</td>
                                <td>Ф.И.О.</td>
                                <td>ИИН</td>
                            </tr>
                            </thead>
                            <tbody>
                            {data.sharers.map((row, rowIndex) => (
                                <Fragment key={rowIndex + row["iin"]}>
                                <tr>
                                    <td>{rowIndex}</td>
                                    <td>{row["contractNumber"]}</td>
                                    <td>{row["date"]}</td>
                                    <td>{row["fullname"]}</td>
                                    <td><
                                        Link className={styles.OneCLink} href={`/one-c/${row["iin"]}`}>
                                        {row["iin"]}
                                    </Link>
                                    </td>
                                    <td>{row["isPaid"] ? "true" : "false"}</td>
                                </tr>

                                {row["monthly"].map(({date, entranceFee, initialFee, isPaid, membershipFee}, rowIndexM) => (
                                    <tr key={rowIndexM + date?.day + date?.month + date?.year}>
                                        <td>{date?.day < 10 ? 0 + date?.day : date?.day}.{date?.month < 10 ? 0 + String(date?.month) : date?.month}.{date?.year}</td>
                                        <td>{entranceFee}</td>
                                        <td>{initialFee}</td>
                                        <td>{membershipFee}</td>
                                        <td>{isPaid ? "true" : "false"}</td>
                                    </tr>
                            ))}
                                </Fragment>
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
                    )}
            </div>
        </div>
    );
};

export default TableOneCSingle;
