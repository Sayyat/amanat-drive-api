import React, {useEffect, useState} from "react";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import TableLoader from "@/components/TableLoader";
import TableOneCAll from "@/components/Table/TableOneCAll";

export default function Index() {
    const [iin, setIin] = useState("");
    const [tableHouses, setTableHouses] = useState([]);

    useEffect(() => {
        async function loadSheet() {
            const response = await fetch(`/api/givenHouses`);
            return await response.json();
        }
        loadSheet().then(r => setTableHouses(r)).catch(e => console.error(e))
    }, [])

    const findByIIN = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/givenHouses/${iin}`);
        const result = await response.json();
        setTableHouses(result);
    };

    function handleInput(e) {
        e.preventDefault();
        setIin(e.target.value);
    }

    return (
        <div className="content__info">
            <Banner iin={iin} handleInput={handleInput} findByIIN={findByIIN}/>
            {tableHouses.length <= 0 ? (
                <TableLoader/>
            ) : (
                <TableOneCAll data={tableHouses} pathIndex="given-house"/>
            )}
        </div>
    );
}