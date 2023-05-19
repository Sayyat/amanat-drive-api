import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import TableGivenAutos from "@/components/Table/TableGivenAutos";
import TableLoader from "@/components/TableLoader";

export default function GivenAuto() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const asyncGivenAutos = async () => {
      const response = await fetch(`/api/givenAutos`);
      const result = await response.json();
      console.log(result);
      setData(result);
    };
    asyncGivenAutos();
  }, []);

  return (
    <div className="content">
      <Header />
      <div className="content__info">
        <Banner />
        {data.length <= 0 ? <TableLoader /> : <TableGivenAutos data={data} />}
      </div>
    </div>
  );
}
