import {getTransfersSheet} from "@/backend/googleSheets/transferSheet";

export default async function handler(req, res) {
    const result = await getTransfersSheet()
    res.json(result)
}