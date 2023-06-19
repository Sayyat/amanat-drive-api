import {getHousesSheet} from "@/backend/googleSheets/raw/housesSheet";
import {getAutosSheet} from "@/backend/googleSheets/raw/autosSheet";
import {compareNames, splitName} from "@/backend/googleSheets/nameSplit";

async function addKeysToSheet(sheet) {
    let needSheet = []
    sheet.map(list => {
        let needList = []
        list.values?.map(row => {
            needList.push({
                index: row[0] || "",
                contractNumber: row[1] || "",
                fullname: row[2] || "",
                iin: row[4] || ""
            })
        })

        let listName = list.range.split("!")[0]
        needSheet.push({
            listName: listName.substring(1, listName.length - 1),
            data: needList
        })
    })
    return needSheet
}

function compareIinAndShortenIin(list, iin) {
    let logic = false
    for (const i in list) {
        let row = list[i];
        if (row.iin === iin) {
            logic = true
            row.isMe = true
        } else {
            row.iin = row.iin.substring(0, 7).padEnd(12, "#")
        }
    }
    return logic;
}

function compareFullnameAndShortenIin(list, fullname) {

    let logic = false
    for (const i in list) {
        let row = list[i];
        if (compareNames(row.fullname, fullname)) {
            logic = true
            row.isMe = true
        }

        row.iin = row.iin.substring(0, 7).padEnd(12, "#")
        row.fullname = splitName(row.fullname)
    }
    return logic;
}


function findTablesBy(sheet, searchKey) {
    let isIin = /[0-9]{12}/gm.test(searchKey) && searchKey.length === 12

    const needSheet = [];
    for (const i in sheet) {
        let list = sheet[i];
        if (isIin && compareIinAndShortenIin(list.data, searchKey))
            needSheet.push(list);

        if (!isIin && compareFullnameAndShortenIin(list.data, searchKey))
            needSheet.push(list);
    }

    return needSheet;
}

async function findHouseAndAutoTablesBy(searchKey) {
    const rawHousesSheet = await getHousesSheet();
    const rawAutosSheet = await getAutosSheet();
    const allHousesSheet = await addKeysToSheet(rawHousesSheet);
    const allAutosSheet = await addKeysToSheet(rawAutosSheet);
    const needHousesSheet = findTablesBy(allHousesSheet, searchKey);
    const needAutosSheet = findTablesBy(allAutosSheet, searchKey);
    return {
        housesSheet: needHousesSheet,
        autosSheet: needAutosSheet,
    };
}

export {findHouseAndAutoTablesBy};
