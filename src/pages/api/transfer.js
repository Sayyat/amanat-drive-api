import {getTrimmedTransferSheet} from "@/backend/googleSheets/transferSheet";

export default async function handler(req, res) {
    const result = await getTrimmedTransferSheet()
    res.json(result)
}