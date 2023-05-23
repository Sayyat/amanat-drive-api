import React, {useEffect, useState} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import TableLoader from "@/components/TableLoader";
import TableOneCAll from "@/components/Table/TableOneCAll";
import Search from "@/components/Search";

export default function Index(){
    const [iin, setIin] = useState("");
    const [tableAutos, setTableAutos] = useState([]);
    const [tableHouses, setTableHouses] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [isChangeInput, setIsChangeInput] = useState(false);

    useEffect(() => {
        async function loadSheet (){
            const response = await fetch(`/api/one-c`);
            const {autosSheet, housesSheet} = await response.json();
            console.log({autosSheet})
            setTableAutos(autosSheet);
            setTableHouses(housesSheet);
            setIsChangeInput(!isChangeInput);
        }
        loadSheet()
    }, [])

    useEffect(() => {
        tableAutos.length <= 0 && setActiveTab(1);
        tableHouses.length <= 0 && setActiveTab(0);
        tableAutos.length > 0 && tableAutos.length > 0 && setActiveTab(0);
    }, [tableAutos, tableHouses]);

    const handleTabChange = (index) => {
        setActiveTab(index);
    };

    const findByIIN = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/one-c/${iin}`);
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
                            <TableOneCAll data={tableAutos}/>
                        </TabPanel>
                        <TabPanel>
                            <TableOneCAll data={tableHouses}/>
                        </TabPanel>
                    </Tabs>
                )}
            </div>
        </div>
    );
}