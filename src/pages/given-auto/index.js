import React, {useEffect, useState} from "react";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import TableLoader from "@/components/TableLoader";
import TableOneCAll from "@/components/Table/TableOneCAll";

export default function Index() {
    const [iin, setIin] = useState("");
    const [tableAutos, setTableAutos] = useState([]);

    useEffect(() => {
        async function loadSheet() {
            const response = await fetch(`/api/givenAutos`);
            return await response.json();
        }
        loadSheet().then(r => setTableAutos(r)).catch(e => console.error(e))
    }, [])

    const findByIIN = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/givenAutos/${iin}`);
        const result = await response.json();
        setTableAutos(result);
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
                {tableAutos.length <= 0 ? (
                    <TableLoader/>
                ) : (
                    <TableOneCAll data={tableAutos} pathIndex="given-auto"/>
                )}
            </div>
        </div>
    );
}