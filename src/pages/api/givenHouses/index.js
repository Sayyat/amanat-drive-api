import {searchGivenHousesList} from "@/backend/googleSheets/givenSheet";

export default async function handler(req, res) {
    console.log("new attempt")
    const result = await searchGivenHousesList()
    // console.log({result})
    res.json(result)
}