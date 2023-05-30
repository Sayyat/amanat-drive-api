import {findHouseAndAutoTablesBy} from "@/backend/googleSheets/allSheet";

export default async function handler(req, res){
    const {searchKey} = req.query
    const result = await findHouseAndAutoTablesBy(searchKey)
    console.log(result)
    res.json(result)
}