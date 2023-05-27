const {googleSheets} = require("./googleSheetsAuth")

async function getGivenAutosSheet() {
    const sheets = googleSheets()
    // console.log(sheets)
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GIVEN_AUTOS_SHEET_ID,
        range: "ПОЛУЧИВШИЕ АВТО"
    });

    return response.data.values
}

export {getGivenAutosSheet}