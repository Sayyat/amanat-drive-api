import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import TableLoader from "@/components/TableLoader";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import TableOneCSingle from "@/components/Table/TableOneCSingle";
import TableOneCAll from "@/components/Table/TableOneCAll";

export default function Index() {
    const {query} = useRouter()
    const {searchKey} = query
    console.log("searchKey", searchKey)



    const [tableAutos, setTableAutos] = useState([]);
    const [tableHouses, setTableHouses] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const fetchAllOneCData = async () => {
                setTableHouses([])
                setTableAutos([])
                const res = await fetch(`/api/one-c/${searchKey}`)
            if(!ignore) {
                const {autosSheet, housesSheet} = await res.json();
                setTableHouses(housesSheet)
                setTableAutos(autosSheet)
                console.log(housesSheet)
                console.log(autosSheet)
            }
        }

        let ignore = false;
        fetchAllOneCData();
        return () => {
            ignore = true;
        }
    }, [searchKey])

    const handleTabChange = (index) => {
        setActiveTab(index);
    };

    return (<div className="content">
            <Header/>
            <div className="content__info">
                {/*<Banner iin={iin} handleInput={handleInput} findByIIN={findByIIN}/>*/}

                {tableAutos.length <= 0 && tableHouses.length <= 0 ? (
                    <TableLoader/>
                ) : (
                    <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
                        <TabList>
                            <Tab>Авто</Tab>
                            <Tab>Жилье</Tab>
                        </TabList>
                        <TabPanel>
                            <TableOneCSingle data={tableAutos}/>
                        </TabPanel>
                        <TabPanel>
                            <TableOneCAll data={tableHouses}/>
                        </TabPanel>
                    </Tabs>
                )}
            </div>
        </div>
    )
}