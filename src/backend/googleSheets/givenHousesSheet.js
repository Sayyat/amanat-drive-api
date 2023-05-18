const {googleSheets} = require("./googleSheetsAuth")

async function getGivenHousesSheet(){
    const sheets = googleSheets()
    // console.log(sheets)
    const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GIVEN_HOUSES_SHEET_ID,
        range: "ПОЛУЧИВШИЕ ЖИЛЬЕ"
    });

    return response.data.values
}

export {getGivenHousesSheet}