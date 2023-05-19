import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Table from "@/components/Table";
import Banner from "@/components/Banner";

export default function Transfer() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const asyncGivenAutos = async () => {
      const response = await fetch(`/api/transfer`);
      const result = await response.json();
      // setData(autosSheet);
      console.log("result", result);
    };
    asyncGivenAutos();
  }, []);

  return (
    <div className="content">
      <Header />
      <div className="content__info">
        <Banner />
        <Table data={data} />
      </div>
    </div>
  );
}
