const {googleSheets} = require("./googleSheetsAuth")

async function getTransfersSheet() {
    const sheets = googleSheets()
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.TRANSFER_SHEET_ID,
        range: "'ЗАЯВЛЕНИЯ О ВЫХОДЕ'!A2:E"
    });

    return response.data.values
}

export {getTransfersSheet}