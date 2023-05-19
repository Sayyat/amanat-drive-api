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


async function getTrimmedGivenAutosSheet() {
    const sheet = await getGivenAutosSheet()
    sheet.unshift()
    let needList = []
    sheet.map(row => {
        needList.push({
            index: row[0] || "",
            contractNumber: row[3] || "",
            date: row[2] || "",
            fullname: row[1] || "",
            brand: row[4] || "",
            sum: row[6] || ""
        })
    })
    return needList
}


export {getTrimmedGivenAutosSheet}