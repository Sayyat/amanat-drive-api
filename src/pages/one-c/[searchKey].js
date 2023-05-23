import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import TableLoader from "@/components/TableLoader";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import TableOneCSingle from "@/components/Table/TableOneCSingle";

export default function Index(){
    const router = useRouter()
    const {searchKey} = router.query

    const [data, setData] = useState()

    const [tableAutos, setTableAutos] = useState([]);
    const [tableHouses, setTableHouses] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        async function fetchAllOneCData(){
            console.log("try to fetch")
            const response = await fetch(`/api/one-c/${searchKey}`)
            // const result = await response.json()

            const {autosSheet, housesSheet} = await response.json();
            console.log("ded",{autosSheet})
            console.log({housesSheet})
                return {autosSheet, housesSheet}
            // console.log(result)
            // setData(result)
        }

        fetchAllOneCData().then(({autosSheet, housesSheet}) => {
            setTableHouses(housesSheet)
            setTableAutos(autosSheet)
        })
    }, [])

    const handleTabChange = (index) => {
        setActiveTab(index);
    };

    return(        <div className="content">
            <Header/>
            <div className="content__info">
                {/*<Banner iin={iin} handleInput={handleInput} findByIIN={findByIIN}/>*/}
                {tableAutos.length <= 0 && tableHouses.length <= 0 ? (
                    <TableLoader/>
                ) : (
                    <TableOneCSingle data={tableAutos}/>
                )}
            </div>
        </div>
    )
}