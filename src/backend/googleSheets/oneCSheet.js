import {getOneCSheet} from "@/backend/googleSheets/raw/rawOneCSheet";

const monthsRussian = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
]


function extractSharerData(table, rowIndex) {
    let row = table[rowIndex]
    let data = {
        fullname: row[1],
        iin: row[2],
        contractNumber: row[3],
        buildingPrice: row[4],
        contributionPercentage: row[5],
        terminationDate: row[6],
        summary: {
            entranceFee: parseInt((row[7] || "0").replace(/\s/, "")),
            investments: parseInt((row[8] || "0").replace(/\s/, "")),
            initialFee: parseInt((row[9] || "0").replace(/\s/, "")),
            membershipFee: parseInt((row[10] || "0").replace(/\s/, "")),
        },
        monthly: [],
        isPaid: true

    }
    rowIndex++
    while (rowIndex < table.length && (table[rowIndex][0] || "").trim().split(" ").length > 1) {
        row = table[rowIndex]
        let entranceFee = parseInt((row[7] || "0").replace(/\s/, ""))
        let investments = parseInt((row[8] || "0").replace(/\s/, ""))
        let initialFee = parseInt((row[9] || "0").replace(/\s/, ""))
        let membershipFee = parseInt((row[10] || "0").replace(/\s/, ""))
        if (entranceFee < 50000 && initialFee < 50000) {
            data.isPaid = false
        }
        let [day, monthRussian, year] = (row[0] || "").split(" ")
        data.monthly.push({
            date: {
                day,
                month: monthsRussian.indexOf(monthRussian) + 1,
                year
            },
            entranceFee,
            investments,
            initialFee,
            membershipFee,
            isPaid: entranceFee >= 50000 || initialFee >= 50000
        })
        rowIndex++
    }
    return data
}


function extractListData(list) {
    const values = list.values
    const summary = values.pop()
    let sharersData = []

    for (let i = 5; i < values.length; i++) {
        let row = values[i]
        if ((row[0] || "").trim().split(" ").length === 1) {
            const sharerData = extractSharerData(values, i)
            sharersData.push(sharerData)
            i += sharerData.monthly.length
        }
    }

    let listName = list.range.split("!")[0]
    return {
        listName: listName.substring(1, listName.length - 1),
        sharers: sharersData,
        summary: {
            entranceFee: parseInt((summary[7] || "0").replace(/\s/, "")),
            investments: parseInt((summary[8] || "0").replace(/\s/, "")),
            initialFee: parseInt((summary[9] || "0").replace(/\s/, "")),
            membershipFee: parseInt((summary[10] || "0").replace(/\s/, "")),
        }
    }
}

async function getEditedOneCSheetData() {
    const sheet = await getOneCSheet()
    return {
        housesSheet: extractListData(sheet[0]),
        autosSheet: extractListData(sheet[1])
    }
}

function searchList(list, searchKey) {
    return {
        listName: list.listName,
        sharers: list.sharers.filter(sharer => {
            return sharer.iin.includes(searchKey) ||
                sharer.fullname.toLowerCase().includes(searchKey.toLowerCase())
        }),
        summary: list.summary
    }
}

async function searchEditedOneCSheet(searchKey) {
    const data = await getEditedOneCSheetData()
    return {
        housesSheet: searchList(data.housesSheet, searchKey),
        autosSheet: searchList(data.autosSheet, searchKey)
    }
}

export {getEditedOneCSheetData, searchEditedOneCSheet}