import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import Table from '@/components/Table';
import React, { useEffect, useState } from 'react'

export default function GivenAuto() {

  const [data, setData] = useState([])

  useEffect(() => {
    const asyncGivenAutos = async () => {
      const response = await fetch(`/api/iin/givenHouses`);
      const {autosSheet} = await response.json();
      setData(autosSheet)
      console.log("autosSheet", autosSheet);
    }
    asyncGivenAutos()
  }, [])

  return (
    <div className="wrapper">
    <Menu />
    <div className="content">
      <Header />
      <div className="content__info">
        {/* <Banner iin={iin} handleInput={handleInput} findByIIN={findByIIN} /> */}
        <Table data={data} iin={"610802401051"} />
      </div>
    </div>
  </div>
  )
}
