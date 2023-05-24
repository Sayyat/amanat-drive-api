import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import Header from "@/components/Header";
import TableLoader from "@/components/TableLoader";
import TableOneCSingle from "@/components/Table/TableOneCSingle";
import backIcon from "@/assets/images/back.svg"

export default function Index() {
    const {query, back} = useRouter()
    const {searchKey, type} = query

    const [tableAutos, setTableAutos] = useState([]);
    const [tableHouses, setTableHouses] = useState([]);

    useEffect(() => {
        const fetchAllOneCData = async () => {
            setTableHouses([])
            setTableAutos([])
            const res = await fetch(`/api/one-c/${searchKey}`)
            if (!ignore) {
                const {autosSheet, housesSheet} = await res.json();
                if (type === "auto") {
                    setTableAutos(autosSheet)
                    console.log(autosSheet)
                } else {
                    setTableHouses(housesSheet)
                    console.log(housesSheet)
                }
            }
        }

        let ignore = false;
        fetchAllOneCData();
        return () => {
            ignore = true;
        }
    }, [type, searchKey])

    const handleGoBack = () => {
        back();
    };

    return (<div className="content">
            <Header/>
            <div className="content__info">
                <button onClick={handleGoBack} className="back-btn"><Image src={backIcon} alt="back icon"></Image><span>Назад</span></button>
                {tableAutos.length <= 0 && tableHouses.length <= 0 ? (
                    <TableLoader/>
                ) : (
                    <TableOneCSingle data={type === "auto" ? tableAutos : tableHouses}/>
                )}
            </div>
        </div>
    )
}