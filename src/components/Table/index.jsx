import React from "react";
import Image from "next/image";
import empty from "../../assets/images/empty.svg";

import styles from "./table.module.scss";

const Table = ({ data, iin }) => {

  return (

    <div className={styles.table}>
      <div className={styles.tableWrapper}>
        {data.length <= 0 ? (
          <div className={styles.empty}>
            <Image src={empty} alt="Empty" />
            <div className={styles.empty__title}>Нет данных</div>
          </div>
        ) : (
          data.map((table, index) => (
            <table key={index}>
              {table.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={row["longIin"] === iin ? styles.me : ""}
                >
                  <td>{row["index"]}</td>
                  <td>{row["contractNumber"]}</td>
                  <td>{row["date"]}</td>
                  <td>{row["fullname"]}</td>
                  <td>
                    {row["longIin"] === iin
                      ? row["longIin"]
                      : row["shortIin"].padStart(12, "#")}
                  </td>
                </tr>
              ))}
            </table>
          ))
        )}
      </div>
    </div>
  );
};

export default Table;
