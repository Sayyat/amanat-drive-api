import {getGivenHousesSheet} from "@/backend/googleSheets/givenHousesSheet";

export default async function handler(req, res) {
    const result = await getGivenHousesSheet()
    res.json(result)
}