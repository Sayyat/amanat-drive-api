import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Menu from "../components/Menu";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Table from "../components/Table";

export default function Home() {
  const [iin, setIin] = useState("");
  const [tableAutos, setTableAutos] = useState([]);
  const [tableHouses, setTableHouses] = useState([]);

  const [isChnageInput, setIsChnageInput] = useState(false);

  const findByIIN = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/iin/${iin}`);
    const { autosSheet, housesSheet } = await response.json();
    setTableAutos(autosSheet);
    setTableHouses(housesSheet);
    setIsChnageInput(!isChnageInput)
    console.log(autosSheet);
  };

  function handleInput(e) {
    e.preventDefault();
    setIin(e.target.value);
  }

  return (
    <div className="wrapper">
      <Menu />
      <div className="content">
        <Header />
        <div className="content__info">
          <Banner iin={iin} handleInput={handleInput} findByIIN={findByIIN} />
          <Tabs>
            <TabList>
              <Tab>Авто</Tab>
              <Tab>Жилье</Tab>
            </TabList>
            <TabPanel>
              <Table data={tableAutos} iin={iin} />
            </TabPanel>
            <TabPanel>
              <Table data={tableHouses} iin={iin} />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
