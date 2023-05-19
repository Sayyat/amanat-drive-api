import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import TableGivenHouses from "@/components/Table/TableGivenHouses";

export default function GivenHouse() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const asyncGivenHouses = async () => {
      const response = await fetch(`/api/givenHouses`);
      const result = await response.json();
      console.log("TableGivenHouses",result)
      setData(result);
    };
    asyncGivenHouses();
  }, []);

  return (
    <div className="content">
      <Header />
      <div className="content__info">
        <Banner />
        <TableGivenHouses data={data} />
      </div>
    </div>
  );
}
