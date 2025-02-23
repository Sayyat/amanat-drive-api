import React, {useEffect, useState} from "react";
import Banner from "@/components/Banner";
import TableLoader from "@/components/TableLoader";
import TableOneCAll from "@/components/Table/TableOneCAll";

export default function Index() {
    const [iin, setIin] = useState("");
    const [tableHouses, setTableHouses] = useState([]);

    useEffect(() => {
        async function loadSheet() {
            const response = await fetch(`/api/givenHouses`);
            const result =  await response.json();
            console.log({result})
            setTableHouses(result)
        }

        loadSheet().catch(e => console.error(e))
    }, [])

    const findByIIN = async (e) => {

        console.log("Finding Sheet")
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