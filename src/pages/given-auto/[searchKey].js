import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import Header from "@/components/Header";
import TableLoader from "@/components/TableLoader";
import TableOneCSingle from "@/components/Table/TableOneCSingle";
import backIcon from "@/assets/images/back.svg"

export default function Index() {
    const {query, back} = useRouter()
    const {searchKey} = query
    const [tableItem, setTableItem] = useState([]);

    useEffect(() => {
        const fetchAllOneCData = async () => {
            setTableItem([])
            const res = await fetch(`/api/givenAutos/${searchKey}`)
            if (!ignore) {
                const result = await res.json()
                setTableItem(result)
            }
        }
        let ignore = false;
        fetchAllOneCData()
        return () => {
            ignore = true;
        }
    }, [searchKey])

    const handleGoBack = () => {
        back();
    };

    return (
        <div className="content__info">
            <button onClick={handleGoBack} className="back-btn"><Image src={backIcon} alt="back icon"></Image><span>Назад к списку</span>
            </button>
            {tableItem?.length <= 0 ? (
                <TableLoader/>
            ) : (
                <TableOneCSingle data={tableItem}/>
            )}
        </div>
    )
}