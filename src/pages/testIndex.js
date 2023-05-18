import { useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Table from "../components/Table";

export default function Home() {
  const [iin, setIin] = useState("");
  const [tables, setTables] = useState([]);

  const findByIIN = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/iin/${iin}`);
    const result = await response.json();
    console.log(result.housesSheet);
    setTables(result.housesSheet);
  };

  function handleInput(event) {
    event.preventDefault();
    setIin(event.target.value);
  }

  return (
      <div className="wrapper">
        <Menu />
        <div className="content">
          <Header />
          <div className="content__info">
            <Banner iin={iin} handleInput={handleInput} findByIIN={findByIIN} />
            <Table data={tables} iin={iin} />
          </div>
        </div>

      {/* <>
      <input type="text" onChange={handleInput} />
      <button onClick={findByIIN}>Find</button>

      {tables.map((table, tableIndex) => (
        <table key={tableIndex}>
          {table.map((row, rowIndex) => (
            <tr key={rowIndex} className={row["longIin"] === iin ? "me" : ""}>
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
      ))}
    </> */}
    </div>
  );
}
