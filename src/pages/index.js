import {useState} from "react";

export default function Home() {

    const [iin, setIin] = useState("")
    const [tables, setTables] = useState([])

    async function findByIIN(event) {
        event.preventDefault()

        const response = await fetch(`/api/iin/${iin}`)
        const result = await response.json()
        console.log(result)
        setTables(result)
    }

    function handleInput(event) {
        event.preventDefault()
        setIin(event.target.value)
    }

    return (
        <>
            <input type="text" onChange={handleInput}/>
            <button onClick={findByIIN}>Find</button>


            {tables.map((table, tableIndex) => (
                <table key={tableIndex}>
                    {table.map((row, rowIndex) => (
                        <tr key={rowIndex}
                            className={row["longIin"] === iin ? "me" : ""}
                        >
                            <td>{row["index"]}</td>
                            <td>{row["contractNumber"]}</td>
                            <td>{row["date"]}</td>
                            <td>{row["fullname"]}</td>
                            <td>{row["longIin"] === iin ? row["longIin"] : row["shortIin"].padStart(12, "#")}</td>
                        </tr>
                    ))}
                </table>
            ))}
        </>
    )
}
