import {searchEditedOneCSheet} from "@/backend/googleSheets/oneCSheet";

export default async function handler(req,res){
    const {searchKey} = req.query
    const data = await searchEditedOneCSheet(searchKey)
    res.status(200).json(data)
}