import {searchGivenHousesList} from "@/backend/googleSheets/givenHousesSheet";

export default async function handler(req, res) {
    const result = await searchGivenHousesList()
    res.json(result)
}