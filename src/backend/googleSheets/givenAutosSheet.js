import {getEditedOneCSheetData, searchEditedOneCSheet} from "@/backend/googleSheets/oneCSheet";

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

async function getFullnameAndIinColumns() {
    const sheet = await getGivenAutosSheet()
    sheet.shift()
    let needList = []
    sheet.map(row => {
        needList.push({
            fullname: (row[1] || "").trim(),
            iin: (row[8] || "").trim()
        })
    })
    return needList
}


function filterContains(filterList = [], sharer = {}) {
    return filterList.filter(filter => {
        return filter.fullname.toLowerCase() === sharer.fullname.toLowerCase()
            || filter.iin === sharer.iin
    }).length > 0
}

function filterSheet(sheet, filter, searchKey = "") {
    if (sheet.sharers.length === 0) return []
    let newSharers = sheet.sharers.filter(sharer => {
        if (searchKey === "")
            return filterContains(filter, sharer)

        return filterContains(filter, sharer)
            && sharer.iin === searchKey
            && sharer.fullname.toLowerCase() === searchKey.toLowerCase()
    })

    return {
        listName : sheet.listName,
        sharers : newSharers,
        summary: sheet.summary
    }
}

async function searchGivenAutosList(searchKey) {
    const oneCSheetData = await getEditedOneCSheetData()
    const filter = await getFullnameAndIinColumns()
    return filterSheet(oneCSheetData.autosSheet, filter, searchKey)
}

export {searchGivenAutosList}