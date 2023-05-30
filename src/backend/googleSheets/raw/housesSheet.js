const {googleSheets} = require("./googleSheetsAuth")

async function getHousesSheet(){
    const sheets = googleSheets()
    const response = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: process.env.HOUSES_SHEET_ID,
        ranges: [
            "'МАРАФОН 2021 НОЯБРЬ-ДЕКАБРЬ'!A2:E",
            "'марафон 2022'!A2:E",
            "'ПЕРЕУСТУПКА'!A2:E",
            "'ЖИНАҚТАУШЫЛАР'!A2:E",
            "'2021 ИЮЛЬ'!A2:E",
            "'2021 АВГУСТЬ'!A2:E",
            "'2021 СЕНТЯБРЬ'!A2:E",
            "'2021 ОКТЯБРЬ'!A2:E",
            "'2021 НОЯБРЬ'!A2:E",
            "'2021 ДЕКАБРЬ'!A2:E",
            "'2022 ЯНВАРЬ'!A2:E",
            "'2022 ФЕВРАЛЬ'!A2:E",
            "'2022 МАРТ'!A2:E",
            "'2022 АПРЕЛЬ'!A2:E",
            "'2022 МАЙ'!A2:E",
            "'ИЮНЬ 2022'!A2:E",
            "'ИЮЛЬ2022'!A2:E",
            "'АВГУСТЬ2022'!A2:E",
            "'СЕНТЯБРЬ2022'!A2:E",
            "'ОКТЯБРЬ2022'!A2:E",
            "'НОЯБРЬ2022'!A2:E",
            "'ДЕКАБРЬ2022'!A2:E",
            "'ЯНВАРЬ 2023'!A2:E",
            "'ФЕВРАЛЬ 2023'!A2:E",
            "'МАРТ2023'!A2:E",
        ],
    });

    return response.data.valueRanges
}

export {getHousesSheet}