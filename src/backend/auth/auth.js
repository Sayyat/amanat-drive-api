import {googleSheets} from "@/backend/googleSheets/raw/googleSheetsAuth";

async function write(phone, email, firstname, lastname, middlename, iin, isAdmin, picture) {
    try {
        const sheets = googleSheets()
        const result = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.AUTH_SHEET_ID,
            range: phone ? "'По номеру'" : "'По email'",
            valueInputOption: "RAW",
            resource: {
                values: [
                    [
                        phone ? phone : email,
                        lastname,
                        firstname,
                        middlename,
                        iin,
                        isAdmin ? "admin" : "user",
                        picture
                    ]
                ]
            }
        });
        return result;
    } catch (err) {
        // TODO (Developer) - Handle exception
        throw err;
    }
}


async function read(phone, email) {
    const sheets = googleSheets()
    const response = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: process.env.AUTH_SHEET_ID,
        ranges: [
            "'По номеру'!A2:G",
            "'По email'!A2:G"
        ],
    });

    const [byPhoneList, byEmailList] = response.data.valueRanges

    return phone ? searchInList(byPhoneList, phone) : searchInList(byEmailList, email)
}

function searchInList(list, key) {
    if (!list.values) return null
    return list.values.filter(row => row[0] === key)[0]
}

export {write, read}