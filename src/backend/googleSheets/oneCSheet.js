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


function extractSharerData(list, rowIndex){
    let row = list[rowIndex]
    let data = {
        fullname: row[1],
        iin: row[2],
        contractNumber: row[3],
        buildingPrice: row[4],
        contributionPercentage: row[5],
        terminationDate: row[6],
        entranceFee: row[7],
        investments: row[8],
        initialFee: row[9],
        membershipFee: row[10],
        monthly: []
    }

    rowIndex ++

    while (!numberRegex.test(row[rowIndex])){
        row = list[rowIndex]
        let [day, monthRussian, year] = row[1].split(" ")
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
        rowIndex ++
    }

    return data
}


async function getEditedOneCSheet() {
    const sheet = await getOneCSheet()
    let needSheet = []
    sheet.map(list => {
        const values = list.values
        const summary = values.pop()
        let needList = []

        for(let i = 0; i < values.length; i++){
            let row = values[i]
            if(numberRegex.test(row[0])) {
                const sharerData = extractSharerData(list, i)
                needList.push(sharerData)
                i += sharerData.monthly.length
            }
        }

        let listName = list.range.split("!")[0]
        needSheet.push({
            listName: listName.substring(1, listName.length - 1),
            data: needList,
            summary:{
                entranceFee: summary[7],
                investments: summary[8],
                initialFee: summary[9],
                membershipFee: summary[10],
            }
        })
    })
    return needSheet
}


export {getEditedOneCSheet}