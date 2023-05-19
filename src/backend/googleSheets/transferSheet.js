import {splitName} from "@/backend/googleSheets/nameSplit";

const {googleSheets} = require("./googleSheetsAuth")

async function getTransfersSheet() {
    const sheets = googleSheets()
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.TRANSFER_SHEET_ID,
        range: "ПЕРЕУСТУПКА"
    });

    return response.data.values
}

async function getTrimmedTransferSheet() {
    const sheet = await getTransfersSheet()
    sheet.shift()
    let needList = []
    sheet.map(row => {
        needList.push({
            index: row[0] || "",
            oldSharer: splitName(row[1]),
            newSharer: splitName(row[2]),
            date: row[4] || ""
        })
    })
    return needList
}

export {getTrimmedTransferSheet}