import {getTrimmedGivenAutosSheet} from "@/backend/googleSheets/givenAutosSheet";

export default async function handler(req, res){
    const result = await getTrimmedGivenAutosSheet()
    res.json(result)
}