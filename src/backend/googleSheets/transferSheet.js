import {getTransfersSheet} from "@/backend/googleSheets/raw/rawTransferSheet";

async function getTrimmedTransferSheet() {
    const sheet = await getTransfersSheet()
    let needList = []
    sheet.map(row => {
        needList.push({
            index: row[0] || "",
            fullname: row[1] || "",
            contractNumber: row[2] || "",
            statementDate: row[3] || "",
            returnDate: row[4] || ""
        })
    })
    return needList
}

export {getTrimmedTransferSheet}