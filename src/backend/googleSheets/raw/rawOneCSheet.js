const {googleSheets} = require("./googleSheetsAuth")

async function getOneCSheet() {
    const sheets = googleSheets()
    const response = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: process.env.ONE_C_SHEET_ID,
        ranges: [
            "ЖИЛЬЕ_1С",
            "АВТО_1С",
        ],
    });

    return response.data.valueRanges
}

export {getOneCSheet}