import {searchGivenAutosList} from "@/backend/googleSheets/givenSheet";

export default async function handler(req, res){
    const result = await searchGivenAutosList()
    res.json(result)
}