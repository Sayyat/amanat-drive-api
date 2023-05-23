import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function Index(){
    const router = useRouter()
    const {searchKey} = router.query

    const [data, setData] = useState()

    useEffect(() => {
        async function fetchAllOneCData(){
            console.log("try to fetch")
            const response = await fetch(`/api/one-c/${searchKey}`)
            const result = await response.json()
            console.log(result)
            setData(result)
        }

        fetchAllOneCData()
    }, [])



    return(
        <div className="content">
            OneC
        </div>
    )
}