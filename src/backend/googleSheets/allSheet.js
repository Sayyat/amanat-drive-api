import {getHousesSheet} from "@/backend/googleSheets/raw/housesSheet";
import {getAutosSheet} from "@/backend/googleSheets/raw/autosSheet";
import {compareNames, splitName} from "@/backend/googleSheets/nameSplit";

async function filterSheet(sheet, searchKey) {
    let isIin = /[0-9]{12}/gm.test(searchKey) && searchKey.length === 12
    let needSheet = []
    sheet.map(list => {
        let needList = []
        let need = false
        list.values?.map(row => {
            let isMe = isIin ? compareIin(row[4] || "", searchKey) : compareNames(row[2] || "", searchKey)
            let index = row[0] || ""
            let contractNumber = row[1] || ""
            let fullname = splitName(row[2] || "")
            let iin = isMe ? (row[4] || "").slice(0, 7).padEnd(12, "#") : "############"
            if (isMe)
                need = true

            let data = {
                index, contractNumber, fullname, iin, isMe
            }
            needList.push(data)
        })

        let listName = list.range.split("!")[0]
        if (need)
            needSheet.push({
                listName: listName.substring(1, listName.length - 1),
                data: needList
            })
    })
    return needSheet
}

function compareIin(iin1, iin2) {
    return iin1.trim() === iin2.trim()
}

async function findHouseAndAutoTablesBy(searchKey) {
    const rawHousesSheet = await getHousesSheet();
    const rawAutosSheet = await getAutosSheet();
    const allHousesSheet = await filterSheet(rawHousesSheet, searchKey);
    const allAutosSheet = await filterSheet(rawAutosSheet, searchKey);
    // const needHousesSheet = findTablesBy(allHousesSheet, searchKey);
    // const needAutosSheet = findTablesBy(allAutosSheet, searchKey);
    return {
        housesSheet: allHousesSheet,
        autosSheet: allAutosSheet,
    };
}

export {findHouseAndAutoTablesBy};
