import {findHouseAndAutoTablesByIin} from "@/backend/googleSheets/searchByIinSheet";

export default async function handler(req, res){
    const {iin} = req.query

    const result = await findHouseAndAutoTablesByIin(iin)
    res.json(result)
}