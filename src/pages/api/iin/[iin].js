import {findByIin} from "@/backend/google";

export default async function handler(req, res){
    const {iin} = req.query

    const result = await findByIin(iin)

    res.json(result)
}