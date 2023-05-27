import {getEditedOneCSheetData} from "@/backend/googleSheets/oneCSheet";
import {getGivenAutosSheet} from "@/backend/googleSheets/raw/givenAutosSheet";
import {getGivenHousesSheet} from "@/backend/googleSheets/raw/givenHousesSheet";

async function getFullnameAndIinColumns(sheet) {
    sheet.shift()
    let needList = []
    sheet.map(row => {
        needList.push({
            fullname: (row[1] || "").trim(),
            iin: (row[4] || "").trim()
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
        listName: sheet.listName,
        sharers: newSharers,
        summary: sheet.summary
    }
}

async function searchGivenAutosList(searchKey) {
    const oneCSheetData = await getEditedOneCSheetData()
    const sheet = await getGivenAutosSheet()
    const filter = await getFullnameAndIinColumns(sheet)
    return filterSheet(oneCSheetData.autosSheet, filter, searchKey)
}

async function searchGivenHousesList(searchKey) {
    const oneCSheetData = await getEditedOneCSheetData()
    const sheet = await getGivenHousesSheet()
    const filter = await getFullnameAndIinColumns(sheet)
    return filterSheet(oneCSheetData.housesSheet, filter, searchKey)
}

export {searchGivenAutosList, searchGivenHousesList}