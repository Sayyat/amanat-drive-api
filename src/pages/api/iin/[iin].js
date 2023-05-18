import {findHouseAndAutoTablesByIin} from "@/backend/googleSheets/sheetsList";

export default async function handler(req, res){
    const {iin} = req.query

    const result = await findHouseAndAutoTablesByIin(iin)
    console.log(result)
    res.json(result)
}