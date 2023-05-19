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
            oldSharer: (row[1] || "").split("/")[0],
            newSharer: (row[2] || "").split("/")[0],
            date: row[3] || ""
        })
    })
    return needList
}

export {getTrimmedTransferSheet}