const {googleSheets} = require("./googleSheetsAuth")

async function getAccessSheet() {
    const sheets = googleSheets()
    // console.log(sheets)
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOSZAKUP_ACCESS_SHEET_ID,
        range: "'Sheet1'!A1:A"
    });

    return response.data.values
}

export {getAccessSheet}