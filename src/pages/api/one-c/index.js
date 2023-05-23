import {getEditedOneCSheetData} from "@/backend/googleSheets/oneCSheet";

export default async function handler(req,res){
    const data = await getEditedOneCSheetData()
    console.log(data)
    res.status(200).json(data)
}