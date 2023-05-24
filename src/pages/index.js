import {useEffect, useState} from "react";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Table from "../components/Table";
import TableLoader from "@/components/TableLoader";

export default function Home() {
    const [iin, setIin] = useState("");
    const [tableAutos, setTableAutos] = useState([]);
    const [tableHouses, setTableHouses] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [isChangeInput, setIsChangeInput] = useState(false);

    useEffect(() => {
        tableAutos.length <= 0 && setActiveTab(1);
        tableHouses.length <= 0 && setActiveTab(0);
        tableAutos.length > 0 && tableHouses.length > 0 && setActiveTab(0);
    }, [tableAutos, tableHouses]);

    const handleTabChange = (index) => {
        setActiveTab(index);
    };

    const findByIIN = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/iin/${iin}`);
        const {autosSheet, housesSheet} = await response.json();
        setTableAutos(autosSheet);
        setTableHouses(housesSheet);
        setIsChangeInput(!isChangeInput);
    };

    function handleInput(e) {
        e.preventDefault();
        setIin(e.target.value);
    }

    return (
        <div className="content">
            <Header/>
            <div className="content__info">
                <Banner iin={iin} handleInput={handleInput} findByIIN={findByIIN}/>
                {tableAutos.length <= 0 && tableHouses.length <= 0 ? (
                    <TableLoader/>
                ) : (
                    <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
                        <TabList>
                            <Tab>Авто</Tab>
                            <Tab>Жилье</Tab>
                        </TabList>
                        <TabPanel>
                            <Table data={tableAutos} iin={iin}/>
                        </TabPanel>
                        <TabPanel>
                            <Table data={tableHouses} iin={iin}/>
                        </TabPanel>
                    </Tabs>
                )}
            </div>
        </div>
    );
}
