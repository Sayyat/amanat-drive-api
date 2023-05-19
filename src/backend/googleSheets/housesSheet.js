const {googleSheets} = require("./googleSheetsAuth")

async function getHousesSheet(){
    const sheets = googleSheets()
    // console.log(sheets)
    const response = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: process.env.HOUSES_SHEET_ID,
        ranges: [
            "МАРАФОН 2021 НОЯБРЬ-ДЕКАБРЬ",
            "марафон 2022",
            "2021 ИЮЛЬ",
            "2021 АВГУСТЬ",
            "2021 СЕНТЯБРЬ",
            "2021 ОКТЯБРЬ",
            "2021 НОЯБРЬ",
            "2021 ДЕКАБРЬ",
            "2022 ЯНВАРЬ",
            "2022 ФЕВРАЛЬ",
            "2022 МАРТ",
            "2022 АПРЕЛЬ",
            "2022 МАЙ",
            "ИЮНЬ 2022",
            "ИЮЛЬ2022",
            "АВГУСТЬ2022",
            "СЕНТЯБРЬ2022",
            "ОКТЯБРЬ2022",
            "НОЯБРЬ2022",
            "ДЕКАБРЬ2022",
            "ЯНВАРЬ 2023",
            "ФЕВРАЛЬ 2023",
            "МАРТ2023",
            "ДЕКАБРЬ2022",
            "ДЕКАБРЬ2022",
            "ДЕКАБРЬ2022",
            "ДЕКАБРЬ2022"
        ],
    });

    return response.data.valueRanges
}


async function getTrimmedHousesSheet() {
    const sheet = await getHousesSheet()
    let needSheet = []
    sheet.map(list => {
        let needList = []
        list.values.map(row => {
            needList.push({
                index: row[0] || "",
                contractNumber: row[1] || "",
                date: row[3] || "",
                fullname: row[13] || "",
                iin: row[4] || ""
            })
        })
        needSheet.push(needList)
    })
    return needSheet
}

// getTrimmedHousesSheet()
export {getTrimmedHousesSheet}