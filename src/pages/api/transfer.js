import {getTrimmedTransferSheet} from "@/backend/googleSheets/transferSheet";

export default async function handler(req, res) {
    const result = await getTrimmedTransferSheet()

    res.setHeader('Cache-Control', 's-maxage=10');
    res.json(result)
}