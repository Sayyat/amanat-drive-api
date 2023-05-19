import React from "react";
import Image from "next/image";
import empty from "../../assets/images/empty.svg";
import styles from "./table.module.scss";

const TableGivenAutos = ({ data }) => {

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
                  <td>Дата</td>
                  <td>Контракт</td>
                  <td>Ф.И.О.</td>
                  <td>Бренд</td>
                  <td>Сумма</td>
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                  >
                    <td>{row["index"]}</td>
                    <td>{row["contractNumber"]}</td>
                    <td>{row["date"]}</td>
                    <td>{row["fullname"]}</td>
                    <td>{row["brand"]}</td>
                    <td>{row["sum"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        )}
      </div>
    </div>
  );
};

export default TableGivenAutos;
