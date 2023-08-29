import React, {useEffect, useState} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Banner from "../components/Banner";
import Table from "../components/Table";
import TableLoader from "@/components/TableLoader";
import styles from "@/components/Table/table.module.scss";
import Image from "next/image";
import empty from "@/assets/images/empty.svg";

export default function Home({userData}) {
    const [iin, setIin] = useState("");
    const [tableAutos, setTableAutos] = useState([]);
    const [tableHouses, setTableHouses] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isNoData, setIsNoData] = useState(false);
    useEffect(() => {
        setIsLoading(true)
        if (!userData) {
            setIsLoading(false)
            return
        }
        search(`${userData.lastname} ${userData.firstname} ${userData.middlename} `)
    }, [])

    useEffect(() => {
        tableAutos.length <= 0 && setActiveTab(1);
        tableHouses.length <= 0 && setActiveTab(0);
        tableAutos.length > 0 && tableHouses.length > 0 && setActiveTab(0);
    }, [tableAutos, tableHouses]);

    const handleTabChange = (index) => {
        setActiveTab(index);
    };

    async function search(searchKey) {
        if (!searchKey) return
        setIsLoading(true)
        const response = await fetch(`/api/iin/${encodeURI(searchKey)}`);
        const {autosSheet, housesSheet} = await response.json();
        setTableAutos(autosSheet);
        setTableHouses(housesSheet);
        setIsNoData(autosSheet.length === 0 && housesSheet.length === 0)
        setIsLoading(false)
    }

    const findByIIN = async (e) => {
        e.preventDefault();
        await search(iin);
    };

    function handleInput(e) {
        e.preventDefault();
        setIin(e.target.value);
    }

    return (
        <div className="content__info">
            <Banner iin={iin} handleInput={handleInput} findByIIN={findByIIN}/>
            {isLoading ? (
                <TableLoader/>
            ) : isNoData ?
                <div className="empty-data">
                    <div className={styles.empty}>
                        <Image src={empty} alt="Empty"/>
                        <div className={styles.empty__title}>Нет данных</div>
                    </div>
                </div>:
                (
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
    );
}
