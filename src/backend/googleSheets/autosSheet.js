const {googleSheets} = require("./googleSheetsAuth")

async function getAutosSheet(){
    const sheets = googleSheets()
    // console.log(sheets)
    const response = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: process.env.AUTOS_SHEET_ID,
        ranges: [
            "2020 декабрь",
            "марафон 2021",
            "марафон 2022",
            "ЯНВАРЬ 2021",
            "ФЕВРАЛЬ 2021",
            "МАРТ 2021",
            "АПРЕЛЬ 2021",
            "МАЙ 2021",
            "ИЮНЬ 2021",
            "ИЮЛЬ 2021",
            "АВГУСТЬ 2021",
            "СЕНТЯБРЬ2021",
            "ОКТЯБРЬ2021",
            "НОЯБРЬ2021",
            "ДЕКАБРЬ2021",
            "ЯНВАРЬ2022",
            "ФЕВРАЛЬ 2022",
            "МАРТ 2022",
            "АПРЕЛЬ2022",
            "МАЙ 2022",
            "ИЮНЬ 2022",
            "ИЮЛЬ 2022",
            "АВГУСТЬ 2022",
            "СЕНТЯБРЬ 2022",
            "ОКТЯБРЬ 2022",
            "НОЯБРЬ 2022",
            "ДЕКАБРЬ 2022"
        ],
    });

    return response.data.valueRanges
}



async function getTrimmedAutosSheet() {
    const sheet = await getAutosSheet()
    let needSheet = []
    sheet.map(list => {
        list.values.shift()
        let needList = []
        list.values.map(row => {
            needList.push({
                index: row[0] || "",
                contractNumber: row[1] || "",
                date: "",
                fullname: row[2] || "",
                iin: row[4] || ""
            })
        })
        needSheet.push(needList)
    })
    return needSheet
}
export {getTrimmedAutosSheet}