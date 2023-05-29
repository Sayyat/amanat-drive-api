const {googleSheets} = require("./googleSheetsAuth")

async function whiteListSheet() {
    const sheets = googleSheets()
    // console.log(sheets)
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.WHITELIST_SHEET_ID,
        range: "Список"
    });

    return response.data.values
}

export {whiteListSheet}