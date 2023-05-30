const {googleSheets} = require("./googleSheetsAuth")

async function getOneCSheet() {
    const sheets = googleSheets()
    const response = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: process.env.ONE_C_SHEET_ID,
        ranges: [
            "'ЖИЛЬЕ_1С'!A6:K",
            "'АВТО_1С'!A6:K",
        ],
    });

    return response.data.valueRanges
}

export {getOneCSheet}