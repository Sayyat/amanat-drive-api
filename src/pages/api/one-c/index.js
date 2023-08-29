import {getEditedOneCSheetData} from "@/backend/googleSheets/oneCSheet";

export default async function handler(req,res){
    const data = await getEditedOneCSheetData()
    // res.setHeader('Cache-Control', 's-maxage=20');
    res.status(200).json(data)
}