import {searchGivenAutosList} from "@/backend/googleSheets/givenAutosSheet";

export default async function handler(req, res){
    const result = await searchGivenAutosList()
    res.json(result)
}