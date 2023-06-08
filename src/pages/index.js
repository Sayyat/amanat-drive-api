import {useEffect, useState} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Banner from "../components/Banner";
import Table from "../components/Table";
import TableLoader from "@/components/TableLoader";
import {useLocalStorage} from "@/hooks/useLocalStorage";

export default function Home() {
    const [iin, setIin] = useState("");
    const [tableAutos, setTableAutos] = useState([]);
    const [tableHouses, setTableHouses] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [isChangeInput, setIsChangeInput] = useState(false);
    const {getUserData} = useLocalStorage()
    useEffect(() => {
        let userData = getUserData()
        if(!userData) return
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
        const response = await fetch(`/api/iin/${encodeURI(searchKey)}`);
        const {autosSheet, housesSheet} = await response.json();
        setTableAutos(autosSheet);
        setTableHouses(housesSheet);
        setIsChangeInput(!isChangeInput);

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
    );
}
