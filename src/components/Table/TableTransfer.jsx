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
                <td>№</td>
                <td>Ф.И.О.</td>
                <td>№ договора</td>
                <td>Дата заявления</td>
                <td>Дата возврата</td>
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{rowIndex + 1}</td>
                  <td>{row["fullname"]}</td>
                  <td>{row["contractNumber"]}</td>
                  <td>{row["statementDate"]}</td>
                  <td>{row["returnDate"]}</td>
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
