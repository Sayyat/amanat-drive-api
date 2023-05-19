const {googleSheets} = require("./googleSheetsAuth")

async function getTransfersSheet() {
    const sheets = googleSheets()
    // console.log(sheets)
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.TRANSFER_SHEET_ID,
        range: "ПЕРЕУСТУПКА"
    });

    return response.data.values
}

async function getTrimmedTransferSheet() {
    const sheet = await getTransfersSheet()
    sheet.unshift()
    let needList = []
    sheet.map(row => {
        needList.push({
            index: row[0] || "",
            oldSharer: row[1] || "",
            newSharer: row[2] || "",
            date: row[3] || ""
        })
    })
    return needList
}

export {getTrimmedTransferSheet}