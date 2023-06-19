const {googleSheets} = require("./googleSheetsAuth")

async function getAutosSheet() {
    const sheets = googleSheets()
    const response = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: process.env.AUTOS_SHEET_ID,
        ranges: [
            "'2021 МАРАФОН'!A2:E",
            "'2022 МАРАФОН'!A2:E",
            "'2020 декабрь'!A2:E",
            "'2021 ЯНВАРЬ'!A2:E",
            "'2021 ФЕВРАЛЬ'!A2:E",
            "'2021 МАРТ'!A2:E",
            "'2021 АПРЕЛЬ'!A2:E",
            "'2021 МАЙ'!A2:E",
            "'2021 ИЮНЬ'!A2:E",
            "'2021 ИЮЛЬ'!A2:E",
            "'2021 АВГУСТ'!A2:E",
            "'2021 СЕНТЯБРЬ'!A2:E",
            "'2021 ОКТЯБРЬ'!A2:E",
            "'2021 НОЯБРЬ'!A2:E",
            "'2021 ДЕКАБРЬ'!A2:E",
            "'2022 ЯНВАРЬ'!A2:E",
            "'2022 ФЕВРАЛЬ'!A2:E",
            "'2022 МАРТ'!A2:E",
            "'2022 АПРЕЛЬ'!A2:E",
            "'2022 МАЙ'!A2:E",
            "'2022 ИЮНЬ'!A2:E",
            "'2022 АВГУСТ'!A2:E",
            "'2022 СЕНТЯБРЬ'!A2:E",
            "'2022 ОКТЯБРЬ'!A2:E",
            "'2022 НОЯБРЬ'!A2:E",
            "'2022 ДЕКАБРЬ'!A2:E",
            "'2023 ЯНВАРЬ'!A2:E",
            "'2023 ФЕВРАЛЬ'!A2:E",
            "'2023 МАРТ'!A2:E",
            "'2023 АПРЕЛЬ'!A2:E",
            "'2023 МАЙ'!A2:E",
            "'2023 ИЮНЬ'!A2:E",
            "'2023 АВГУСТ'!A2:E",
            "'2023 СЕНТЯБРЬ'!A2:E",
            "'2023 ОКТЯБРЬ'!A2:E",
            "'2023 НОЯБРЬ'!A2:E",
            "'2023 ДЕКАБРЬ'!A2:E",
        ],
    });

    return response.data.valueRanges
}

export {getAutosSheet}