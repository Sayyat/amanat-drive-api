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
    let needSheet = []
    sheet.map(list => {
        let needList = []
        list.values.map(row => {
            needList.push({
                index: row[0] || "",
                oldSharer: row[1] || "",
                newSharer: row[2] || "",
                date: row[3] || ""
            })
        })
        needSheet.push(needList)
    })
    return needSheet
}

export {getTrimmedTransferSheet}