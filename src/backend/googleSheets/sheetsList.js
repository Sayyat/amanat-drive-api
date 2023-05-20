import {getTrimmedHousesSheet} from "@/backend/googleSheets/housesSheet";
import {getTrimmedAutosSheet} from "@/backend/googleSheets/autosSheet";
import {compareNames, splitName} from "@/backend/googleSheets/nameSplit";

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

function getUserDataFromListByIin(list, iin) {
    let result = [];
    for (const i in list) {
        let row = list[i];
        if (row.iin === iin) result.push(row);
    }
    return result;
}

function findTablesByIin(sheet, iin) {
    let isIin = /[0-9]{12}/gm.test(iin) && iin.length === 12

    const needSheet = [];
    for (const i in sheet) {
        let list = sheet[i];
        if (isIin && compareIinAndShortenIin(list.data, iin))
            needSheet.push(list);

        if (!isIin && compareFullnameAndShortenIin(list.data, iin))
            needSheet.push(list);
    }

    return needSheet;
}

async function findHouseAndAutoTablesByIin(iin) {
    const allHousesSheet = await getTrimmedHousesSheet();
    const allAutosSheet = await getTrimmedAutosSheet();

    const housesSheet = findTablesByIin(allHousesSheet, iin);
    const autosSheet = findTablesByIin(allAutosSheet, iin);
    return {
        housesSheet: housesSheet,
        autosSheet: autosSheet,
    };
}

export {findHouseAndAutoTablesByIin};
