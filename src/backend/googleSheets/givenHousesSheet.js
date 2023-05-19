import {splitName} from "@/backend/googleSheets/nameSplit";

const {googleSheets} = require("./googleSheetsAuth")

async function getGivenHousesSheet() {
    const sheets = googleSheets()
    // console.log(sheets)
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GIVEN_HOUSES_SHEET_ID,
        range: "ПОЛУЧИВШИЕ ЖИЛЬЕ"
    });

    return response.data.values
}

async function getTrimmedGivenHousesSheet() {
    const sheet = await getGivenHousesSheet()
    sheet.shift()
    let needList = []
    sheet.map(row => {
        needList.push({
            index: row[0] || "",
            contractNumber: row[3] || "",
            date: row[2] || "",
            fullname: splitName(row[1]),
            sum: row[5] || ""
        })
    })
    return needList
}


export {getTrimmedGivenHousesSheet}