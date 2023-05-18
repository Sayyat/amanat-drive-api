import { getHousesSheet } from "@/backend/googleSheets/housesSheet";
import { getAutosSheet } from "@/backend/googleSheets/autosSheet";

function getTrimmedSheet(sheet) {
  let needSheet = [];
  sheet.map((list) => {
    let needList = [];
    list.values.map((row) => {
      needList.push({
        index: row[0] || "",
        contractNumber: row[1] || "",
        date: row[3] || "",
        fullname: row[13] || "",
        longIin: row[4] || "",
        shortIin: row[14] || "",
      });
    });
    needSheet.push(needList);
  });
  return needSheet;
}

function listContainsIin(list, iin) {
  for (const i in list) {
    let row = list[i];
    if (row.longIin === iin) return true;
  }
  return false;
}

function getUserDataFromListByIin(list, iin) {
  let result = [];
  for (const i in list) {
    let row = list[i];
    if (row.longIin === iin) result.push(row);
  }
  return result;
}

async function findTablesByIin(sheet, iin) {
  const needSheet = [];
  for (const i in sheet) {
    let list = sheet[i];
    if (listContainsIin(list, iin)) needSheet.push(list);
  }

  return needSheet;
}

async function findHouseAndAutoTablesByIin() {
  const housesSheet = await getHousesSheet();
  const autosSheet = await getAutosSheet();
  const trimmedHousesSheet = getTrimmedSheet(housesSheet);
  const trimmedAutosSheet = getTrimmedSheet(autosSheet);
  return {
    houseSheet: trimmedHousesSheet,
    autosSheet: trimmedAutosSheet,
  };
}

export { findHouseAndAutoTablesByIin };
