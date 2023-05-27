import {searchGivenHousesList} from "@/backend/googleSheets/givenSheet";

export default async function handler(req, res) {
    const result = await searchGivenHousesList()
    res.json(result)
}