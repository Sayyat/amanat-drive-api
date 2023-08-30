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

function cellToNumber(cell) {
    let space160 = String.fromCharCode(160)
    return Number((cell || "0").trim()
        .replaceAll(space160, "")
        .replaceAll(",", "."))
}

function addMonths(fromMonth, fromYear, toMonth, toYear) {
    if (!fromMonth || !fromYear) return []
    if (fromMonth === toMonth && fromYear === toYear) return []

    let monthly = []
    let month = fromMonth
    let year = fromYear
    while (year < toYear || month < toMonth) {
        month++
        if (month === 13) {
            month = 1
            year++
        }
        monthly.push({
            date: {
                day: 1,
                month: month,
                year: year
            },
            entranceFee: 0,
            investments: 0,
            initialFee: 0,
            membershipFee: 0,
            isPaid: false
        })
    }
    return monthly
}

function extractSharerData(table, rowIndex, thisData) {
    let row = table[rowIndex]
    let data = {
        fullname: row[1],
        iin: row[2],
        contractNumber: row[3],
        buildingPrice: row[4],
        contributionPercentage: row[5],
        terminationDate: row[6],
        summary: {
            entranceFee: cellToNumber(row[7]),
            investments: cellToNumber(row[8]),
            initialFee: cellToNumber(row[9]),
            membershipFee: cellToNumber(row[10]),
        },
        monthly: [],
        isPaid: true,
        paidCount: 0
    }

    rowIndex++
    let lastMonth = null
    let lastYear = null
    while (rowIndex < table.length && (table[rowIndex][0] || "").trim().split(" ").length > 1) {
        let row = table[rowIndex]
        let entranceFee = cellToNumber(row[7])
        let investments = cellToNumber(row[8])
        let initialFee = cellToNumber(row[9])
        let membershipFee = cellToNumber(row[10])

        let [d, monthRussian, y] = (row[0] || "").split(" ")
        let day = Number(d.trim())
        let month = monthsRussian.indexOf(monthRussian) + 1
        let year = Number(y.substring(0, 4))

        let currentMonth = {
            date: {
                day,
                month,
                year
            },
            entranceFee,
            investments,
            initialFee,
            membershipFee,
            isPaid: entranceFee >= 50000 || initialFee >= 50000 || membershipFee >= 50000
        };

        if (currentMonth.isPaid) {
            data.paidCount++
        }

        let monthly = addMonths(lastMonth, lastYear, month - 1, year)

        if (monthly.length > 0 || !currentMonth.isPaid)
            data.isPaid = false

        data.monthly = [...data.monthly, ...monthly, currentMonth]

        lastYear = year
        lastMonth = month

        rowIndex++
    }
    let monthly = addMonths(lastMonth, lastYear, thisData.thisMonth, thisData.thisYear)
    if (monthly.length > 3) {
        data.isPaid = false
    }
    data.monthly = [...data.monthly, ...monthly]
    return {data, rowIndex}
}


function extractListData(list, thisDate) {
    const values = list.values

    // compare with cache


    const summary = values.pop()
    let sharers = []
    let paidCount = 0

    for (let i = 0; i < values.length; i++) {
        let row = values[i]
        if ((row[0] || "").trim().split(" ").length === 1) {
            const {data, rowIndex} = extractSharerData(values, i, thisDate)
            if (data.isPaid) paidCount++
            sharers.push(data)
            i = rowIndex - 1
        }
    }

    let listName = list.range.split("!")[0]

    // update cache

    return {
        listName: listName.substring(1, listName.length - 1),
        sharers,
        paidCount,
        summary: {
            entranceFee: cellToNumber(summary[7]),
            investments: cellToNumber(summary[8]),
            initialFee: cellToNumber(summary[9]),
            membershipFee: cellToNumber(summary[10])
        }
    }
}

async function getEditedOneCSheetData() {
    console.log("await for sheet")
    const sheet = await getOneCSheet()
    // console.log({sheet})
    const today = new Date()
    const thisDate = {
        thisYear: today.getFullYear(),
        thisMonth: today.getMonth() + 1
    }

    return {
        housesSheet: extractListData(sheet[0], thisDate),
        autosSheet: extractListData(sheet[1], thisDate)
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