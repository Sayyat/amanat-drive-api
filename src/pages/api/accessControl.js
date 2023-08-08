import {getAccessSheet} from "@/backend/googleSheets/raw/accessControlSheet";

export default async function handler(req, res) {
    const accessSheet = await getAccessSheet()

    res.status(200).json({access: accessSheet[0][0]})
}