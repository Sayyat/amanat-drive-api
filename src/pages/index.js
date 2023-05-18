import { useEffect, useState } from "react";
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
    console.log(result.autosSheet);
    setTables(result.autosSheet);
  };

  function handleInput(event) {
    event.preventDefault();
    setIin(event.target.value);
  }

  useEffect(() => {
    const asyncGivenAutos = async () => {
      const response = await fetch(`/api/iin/givenHouses`);
      const result = await response.json();
      console.log("response", result);
    };
    asyncGivenAutos();
  }, []);

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
    </div>
  );
}
