import React, {Fragment} from "react";
import Image from "next/image";
import empty from "@/assets/images/empty.svg";
import truePaid from "@/assets/images/done.svg";
import falsePaid from "@/assets/images/no-check.svg";
import styles from "./table.module.scss";

const TableOneCSingle = ({data}) => {

    return (<div className={styles.table}>
        <div className={styles.tableWrapperPerson}>
            {data.sharers.length <= 0 ? (<div className={styles.empty}>
                    <Image src={empty} alt="Empty"/>
                    <div className={styles.empty__title}>Нет данных</div>
                </div>) : (<>
                {data.sharers.map((row, rowIndex) => {
                    let rowNum = rowIndex + 1
                    return (<div className={styles.tableRow} key={rowIndex + row["iin"]}>
                        <h3 className={styles.oneCInfoGridTitle}>Информация о <span style={{color: "#e92d45"}}>{row["fullname"]}</span> в таблице «{data?.listName}»</h3>
                        <div className={styles.oneCInfoGrid}>
                            <div className={styles.oneCInfoGridColumn}>
                                <div className={styles.oneCInfoGridColumnCaption}>№</div>
                                <div className={styles.oneCInfoGridColumnItem}>{rowNum}</div>
                            </div>
                            <div className={styles.oneCInfoGridColumn}>
                                <div className={styles.oneCInfoGridColumnCaption}>Ф.И.О.</div>
                                <div className={styles.oneCInfoGridColumnItem}>{row["fullname"]}</div>
                            </div>
                            <div className={styles.oneCInfoGridColumn}>
                                <div className={styles.oneCInfoGridColumnCaption}>ИИН</div>
                                <div className={styles.oneCInfoGridColumnItem}>{row["iin"]}</div>
                            </div>
                            <div className={styles.oneCInfoGridColumn}>
                                <div className={styles.oneCInfoGridColumnCaption}>Договор</div>
                                <div className={styles.oneCInfoGridColumnItem}>{row["contractNumber"]}</div>
                            </div>
                            <div className={styles.oneCInfoGridColumn}>
                                <div className={styles.oneCInfoGridColumnCaption}>Пополнено</div>
                                <div className={styles.oneCInfoGridColumnItem}>{row["isPaid"] ?
                                    <Image src={truePaid} alt="true check"/> : "---"}</div>
                            </div>
                        </div>
                        <h3 className={`${styles.oneCInfoGridTitle} ${styles.oneCInfoGridTitleSecond}`}>По месяцам</h3>
                        <div className={styles.monthlyTable}>
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
                                {row["monthly"].map(({date, entranceFee, initialFee, investments, membershipFee, isPaid}, monthlyIndex) => {
                                    const dateDay = date.day === null ? "~" : date.day
                                    return (
                                        <Fragment key={monthlyIndex}>
                                            <tr>
                                                <td>{dateDay < 10 ? 0 + String(dateDay) : dateDay}.{date?.month < 10 ? 0 + String(date?.month) : date?.month}.{date?.year}</td>
                                                <td>{entranceFee}</td>
                                                <td>{initialFee}</td>
                                                <td>{investments}</td>
                                                <td>{membershipFee}</td>
                                                <td>{isPaid ? <Image src={truePaid} alt="true check"/> : <Image src={falsePaid} alt="false check"/>}</td>
                                            </tr>
                                        </Fragment>)
                                })}
                                <tr className={styles.totalSumTr}>
                                    <td className={styles.totalSum}>Итого</td>
                                    <td>{row["summary"]?.entranceFee || 0}</td>
                                    <td>{row["summary"]?.initialFee || 0}</td>
                                    <td>{row["summary"]?.investments || 0}</td>
                                    <td>{row["summary"]?.membershipFee || 0}</td>
                                    <td><span style={{color: "#33e92d"}}>{row["paidCount"]}</span> / {row["monthly"].length}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>)
                })}
            </>)}
        </div>
    </div>);
};

export default TableOneCSingle;
