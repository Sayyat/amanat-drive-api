import {searchGivenHousesList} from "@/backend/googleSheets/givenHousesSheet";

export default async function handler(req, res){
    const {searchKey} = req.query
    const result = await searchGivenHousesList(searchKey)
    res.json(result)
}