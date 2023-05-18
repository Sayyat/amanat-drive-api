import {getGivenAutosSheet} from "@/backend/googleSheets/givenAutosSheet";

export default async function handler(req, res){
    const result = await getGivenAutosSheet()
    res.json(result)
}