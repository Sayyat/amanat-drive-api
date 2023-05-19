
import { getTrimmedHousesSheet } from "@/backend/googleSheets/housesSheet";
import { getTrimmedAutosSheet } from "@/backend/googleSheets/autosSheet";

function compareAndShortenIin(list, iin) {
  let logic = false
  for (const i in list) {
    let row = list[i];
    if (row.iin === iin){
      logic = true
    } else {
      row.iin = row.iin.substring(6).padStart(12, "#")
    }
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
  const needSheet = [];
  for (const i in sheet) {
    let list = sheet[i];
    if (compareAndShortenIin(list.data, iin)) needSheet.push(list);
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

export { findHouseAndAutoTablesByIin };
