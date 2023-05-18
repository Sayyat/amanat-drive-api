import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Table from "@/components/Table";

export default function GivenAuto() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const asyncGivenAutos = async () => {
      const response = await fetch(`/api/iin/givenAutos`);
      const { autosSheet } = await response.json();
      setData(autosSheet);
    };
    asyncGivenAutos();
  }, []);

  return (
    <div className="wrapper">
      <Menu />
      <div className="content">
        <Header />
        <div className="content__info">
          <Table data={data} />
        </div>
      </div>
    </div>
  );
}
