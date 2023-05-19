import {getTrimmedGivenHousesSheet} from "@/backend/googleSheets/givenHousesSheet";

export default async function handler(req, res) {
    const result = await getTrimmedGivenHousesSheet()
    res.json(result)
}