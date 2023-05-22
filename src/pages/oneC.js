import {getEditedOneCSheet} from "@/backend/googleSheets/oneCSheet";

export default async function handler(req,res){

    const data = await getEditedOneCSheet()
    res.status(200).json(data)
}