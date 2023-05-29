import {findHouseAndAutoTablesBy} from "@/backend/googleSheets/allSheet";

export default async function handler(req, res){
    const {searchKey} = req.query
    console.log( {searchKey})
    const result = await findHouseAndAutoTablesBy(searchKey)

    res.json(result)
}