import {findTablesByIin} from "@/backend/google";

export default async function handler(req, res){
    const {iin} = req.query

    const result = await findTablesByIin(iin)

    res.json(result)
}