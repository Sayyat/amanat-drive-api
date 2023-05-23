const {googleSheets} = require("./googleSheetsAuth")
const numberRegex = /^[0-9]+$/g
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

async function getOneCSheet() {
    const sheets = googleSheets()
    const response = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: process.env.ONE_C_SHEET_ID,
        ranges: [
            "ЖИЛЬЕ_1С",
            "АВТО_1С",
        ],
    });

    return response.data.valueRanges
}

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
            entranceFee: row[7],
            investments: row[8],
            initialFee: row[9],
            membershipFee: row[10],
        },
        monthly: [],

    }
    rowIndex++

    while (rowIndex < table.length && (table[rowIndex][0] || "").trim().split(" ").length > 1) {
        row = table[rowIndex]
        let [day, monthRussian, year] = (row[0] || "").split(" ")
        data.monthly.push({
            date: {
                day,
                month: monthsRussian.indexOf(monthRussian) + 1,
                year
            },
            entranceFee: row[7],
            investments: row[8],
            initialFee: row[9],
            membershipFee: row[10],
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
            entranceFee: summary[7],
            investments: summary[8],
            initialFee: summary[9],
            membershipFee: summary[10],
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