const {googleSheets} = require("./googleSheetsAuth")

async function getAutosSheet() {
    const sheets = googleSheets()
    const response = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: process.env.AUTOS_SHEET_ID,
        ranges: [
            "'2020 декабрь'!A2:E",
            "'марафон 2021'!A2:E",
            "'марафон 2022'!A2:E",
            "'ЯНВАРЬ 2021'!A2:E",
            "'ФЕВРАЛЬ 2021'!A2:E",
            "'МАРТ 2021'!A2:E",
            "'АПРЕЛЬ 2021'!A2:E",
            "'МАЙ 2021'!A2:E",
            "'ИЮНЬ 2021'!A2:E",
            "'ИЮЛЬ 2021'!A2:E",
            "'АВГУСТЬ 2021'!A2:E",
            "'СЕНТЯБРЬ2021'!A2:E",
            "'ОКТЯБРЬ2021'!A2:E",
            "'НОЯБРЬ2021'!A2:E",
            "'ДЕКАБРЬ2021'!A2:E",
            "'ЯНВАРЬ2022'!A2:E",
            "'ФЕВРАЛЬ 2022'!A2:E",
            "'МАРТ 2022'!A2:E",
            "'АПРЕЛЬ2022'!A2:E",
            "'МАЙ 2022'!A2:E",
            "'ИЮНЬ 2022'!A2:E",
            "'ИЮЛЬ 2022'!A2:E",
            "'АВГУСТЬ 2022'!A2:E",
            "'СЕНТЯБРЬ 2022'!A2:E",
            "'ОКТЯБРЬ 2022'!A2:E",
            "'НОЯБРЬ 2022'!A2:E",
            "'ДЕКАБРЬ 2022'!A2:E"
        ],
    });

    return response.data.valueRanges
}

export {getAutosSheet}