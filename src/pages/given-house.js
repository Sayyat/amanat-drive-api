import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Table from "@/components/Table";

export default function GivenHouse() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const asyncGivenHouses = async () => {
      const response = await fetch(`/api/iin/givenHouses`);
      const { housesSheet } = await response.json();
      setData(housesSheet);
    };
    asyncGivenHouses();
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
