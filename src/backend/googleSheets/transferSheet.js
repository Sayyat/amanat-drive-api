import {splitName} from "@/backend/googleSheets/nameSplit";
import {getTransfersSheet} from "@/backend/googleSheets/raw/rawTransferSheet";

async function getTrimmedTransferSheet() {
    const sheet = await getTransfersSheet()
    sheet.shift()
    let needList = []
    sheet.map(row => {
        needList.push({
            index: row[0] || "",
            oldSharer: splitName(row[1] || ""),
            newSharer: splitName(row[2] || ""),
            date: row[4] || ""
        })
    })
    return needList
}

export {getTrimmedTransferSheet}