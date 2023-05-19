import React from "react";
import Image from "next/image";
import empty from "../../assets/images/empty.svg";
import styles from "./table.module.scss";

const TableTransfer = ({ data }) => {
  return (
    <div className={styles.table}>
      <div className={styles.tableWrapper}>
        {data.length <= 0 ? (
          <div className={styles.empty}>
            <Image src={empty} alt="Empty" />
            <div className={styles.empty__title}>Нет данных</div>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <td>1</td>
                <td>Ф.И.О. выбывающего пайщика</td>
                <td>Ф.И.О. нового пайщика</td>
                <td>Таблица</td>
                <td>Дата</td>
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{row["index"]}</td>
                  <td>{row["oldSharer"]}</td>
                  <td>{row["newSharer"]}</td>
                  <td>{row["date"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TableTransfer;
