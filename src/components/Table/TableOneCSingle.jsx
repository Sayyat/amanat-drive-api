import React, {Fragment} from "react";
import Image from "next/image";
import empty from "@/assets/images/empty.svg";
import truePaid from "@/assets/images/done.svg";
import falsePaid from "@/assets/images/no-check.svg";
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
                    <>
                        <div className={styles.infoPersonTable}>
                            <h3 className={styles.tableTitle}>{data?.listName}</h3>
                            <table>
                                <thead>
                                <tr>
                                    <td>№</td>
                                    <td>Ф.И.О.</td>
                                    <td>ИИН</td>
                                    <td>Договор</td>
                                    <td>Пополнено</td>
                                </tr>
                                </thead>
                                <tbody>
                                {data.sharers.map((row, rowIndex) => {
                                    let rowNum = rowIndex + 1
                                    return (
                                        <tr key={rowIndex + row["iin"]}>
                                            <td>{rowNum}</td>
                                            <td>{row["fullname"]}</td>
                                            <td>{row["iin"]}</td>
                                            <td>{row["contractNumber"]}</td>
                                            <td>{row["isPaid"] ? <Image src={truePaid} alt="true check"/> : "---"}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                        <div className={styles.monthlyTable}>
                            <h3 className={styles.tableTitle}>По месяцам</h3>
                            <table>
                                <thead>
                                <tr>
                                    <td>Дата</td>
                                    <td>Вступительный взнос</td>
                                    <td>Первоначальный взнос</td>
                                    <td>Инвестиции</td>
                                    <td>Членский взнос</td>
                                    <td>Пополнено</td>
                                </tr>
                                </thead>
                                <tbody>
                                {data.sharers.map(({monthly, summary}, rowIndex) => {
                                    return (
                                        <Fragment key={rowIndex}>
                                            {
                                                monthly.map(({ date, entranceFee, initialFee, investments, membershipFee, isPaid }, i) => (
                                                    <Fragment key={i}>
                                                        <tr>
                                                            <td>{date?.day < 10 ? 0 + date?.day : date?.day}.{date?.month < 10 ? 0 + String(date?.month) : date?.month}.{date?.year}</td>
                                                            <td>{entranceFee}</td>
                                                            <td>{initialFee}</td>
                                                            <td>{investments}</td>
                                                            <td>{membershipFee}</td>
                                                            <td>{isPaid ? <Image src={truePaid} alt="true check"/> : <Image src={falsePaid} alt="false check"/>}</td>
                                                        </tr>
                                                    </Fragment>

                                                ))
                                            }
                                            {
                                                <tr className={styles.totalSumTr}>
                                                    <td className={styles.totalSum}>Итого</td>
                                                    <td>{summary?.entranceFee}</td>
                                                    <td>{summary?.initialFee}</td>
                                                    <td>{summary?.investments}</td>
                                                    <td>{summary?.membershipFee}</td>
                                                    <td>---</td>
                                                </tr>
                                            }
                                        </Fragment>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TableOneCSingle;
