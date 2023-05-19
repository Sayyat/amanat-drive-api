import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import TableLoader from "@/components/TableLoader";
import TableTransfer from "@/components/Table/TableTransfer";

export default function Transfer() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const asyncGivenAutos = async () => {
      const response = await fetch(`/api/transfer`);
      const result = await response.json();
      setData(result);
      console.log("result", result);
    };
    asyncGivenAutos();
  }, []);

  return (
    <div className="content">
      <Header />
      <div className="content__info">
        <Banner />
        { data.length <= 0 ? <TableLoader /> : <TableTransfer data={data} /> }
      </div>
    </div>
  );
}
