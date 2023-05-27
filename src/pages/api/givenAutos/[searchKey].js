import {searchGivenAutosList} from "@/backend/googleSheets/givenAutosSheet";

export default async function handler(req, res){
    const {searchKey} = req.query
    const result = await searchGivenAutosList(searchKey)
    res.json(result)
}