import {getEditedOneCSheetData} from "@/backend/googleSheets/oneCSheet";
import {getGivenAutosSheet} from "@/backend/googleSheets/raw/givenAutosSheet";
import {getGivenHousesSheet} from "@/backend/googleSheets/raw/givenHousesSheet";

async function getFullnameAndIinColumns(sheet) {
    let needList = []
    sheet.forEach(row => {
        needList.push({
            fullname: (row[0] || "").trim(),
            iin: (row[1] || "").trim()
        })
    })
    return needList
}

function filterContains(filterList = [], sharer = {}) {
    return filterList.filter(filter => {
        return filter[0].toLowerCase() === sharer.fullname.toLowerCase()
            || filter[1] === sharer.iin
    }).length > 0
}

function filterSheet(sheet, filter, searchKey = "") {
    if (sheet.sharers.length === 0) return []
    let paidCount = 0
    let sharers = []
    let summary = {
        entranceFee: 0,
        investments: 0,
        initialFee: 0,
        membershipFee: 0,
    }
    sheet.sharers.map(sharer => {
        if (searchKey === "" && filterContains(filter, sharer)) {
            if (sharer.isPaid) paidCount++
            sharers.push(sharer)
            summary.entranceFee += sharer.summary.entranceFee
            summary.investments += sharer.summary.investments
            summary.initialFee += sharer.summary.initialFee
            summary.membershipFee += sharer.summary.membershipFee
            return
        }
        if (filterContains(filter, sharer)
            && (sharer.iin === searchKey
                || encodeURI(sharer.fullname.toLowerCase()) === encodeURI(searchKey.toLowerCase()))) {
            if (sharer.isPaid) paidCount++
            summary.entranceFee += sharer.summary.entranceFee
            summary.investments += sharer.summary.investments
            summary.initialFee += sharer.summary.initialFee
            summary.membershipFee += sharer.summary.membershipFee
            sharers.push(sharer)
        }
    })

    return {
        listName: sheet.listName,
        sharers,
        paidCount,
        summary
    }
}

async function searchGivenAutosList(searchKey) {
    const oneCSheetData = await getEditedOneCSheetData()
    const sheet = await getGivenAutosSheet()
    return filterSheet(oneCSheetData.autosSheet, sheet, searchKey)
}

async function searchGivenHousesList(searchKey) {
    const oneCSheetData = await getEditedOneCSheetData()
    const sheet = await getGivenHousesSheet()
    return filterSheet(oneCSheetData.housesSheet, sheet, searchKey)
}

export {searchGivenAutosList, searchGivenHousesList}