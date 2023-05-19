const {googleSheets} = require("./googleSheetsAuth")

async function getTransfersSheet(){
    const sheets = googleSheets()
    // console.log(sheets)
    const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.TRANSFER_SHEET_ID,
        range: "ПЕРЕУСТУПКА"
    });

    return response.data.values
}

export {getTransfersSheet}