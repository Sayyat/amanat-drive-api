const {google} = require("googleapis")

const GoogleSheetsKey = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC60sPRfgd2y4Lr\nMtb1rdCiqUt+325h9T73JWa/+vgA7lL7f8jgbCciamMf02Hyb8h2F52V/kiFV3ah\n93e/7bHgnJJYTSS1BTCW0jLVcIgIoyeVgUsKs3Z25NLMrIwTBWDwQmVCmhBUPnD9\nOgV20niNFGZ9E+WHWkhQMt1tExiu75JF4KfvnploITqoA6tiSggySLBCFQ6Z9g2G\np2kArcWoinMufP5Fm9uis3eQ0wxBKa4FVu7SqMXwYJyrbFOoMcF6ND2fRiOG5eQf\nUo18xVv8D+VRzDk2kF25G4XB71yb3DJqxcPzScJseskTmo8O/v7gk2OOl8As5mjn\ncITGNv3jAgMBAAECggEARoA99EMOlwZir9Y+J3VB2/huLIEtmxrc+ZAsL7uKNnO5\nbf5BdGtr80FZicuP1VjYubPcvJs6i9M/SgzkrFGLRDthwJ/P/93nAatuEnzGYRgM\n2o7xniauSFy+rg1ZSN5JQDGWG+WezuPHaNAp+rafVoIB0Saegg8QZe9j/wLrWCwb\nu+hxjM5iCacTzbNdVClSXNrXy/IH7Lb/lTAHiTL4gR3UQ8o6ilvBdiy2S5I77uu6\n4OXbcOvthNrnnhJGKJflcKdMpV0Wmh2sMaP9udIr4Sl4aQTzRNzH7JY8uuFYK3Xg\nLeb5R6wU09DGwmQnNk6tG5Qfsl6SzCKesD6NSe5E3QKBgQDqpLGY9rEw34yEdSUD\ncAH9HF/fU7cQuKQ0z3ohbbLC2MGRnSBTP5WS7ye5u3cMddRK/U1Sz09BAvFAWn1W\nhuLgzCqpU0CZUqKDnh0jgL8e+QgB3mqJ+pnjpFmvQSLIaOgx2xJ1lV3ZdoN64CHY\nQumDHWlaT6VjQUVR1PUPYPh/vQKBgQDL09cyu6t6aN0dCja6isH+0U9iY1JXwxMK\n++xK6Pe2R4S292IZWG1aO1X+TtXSdFx+uC5U9bKmDF12tj3YyIkwzXS3Sua63joB\nhjjM2wqavP29CE4qFXixEA0H3Ikeqy54JpUqs036HR+aECTWYluzlWY3CMwFP7+4\nl+FoLAr+HwKBgDD9T8MjBl2w3tKs7pxoH1IsQWwMO3V3R3lrNBGUqLT7snZnet9G\nsEDsQ7wIgtOMKlW5yxIWDHMDXUFVY0PUh7vthJ6zrhIU6a9XLLhD4iNiVSSmvlGu\ni8C2iK8Jh2yWUpxOI+1+0QhdMRhPgWF4nu5sDpn3dQ1jDEkIkF20nk11AoGAeaVX\ndL7Oa4L0G+XBnfk8KGExGI4gUaJp1g9eCaMaW545VZ003d2JfeWVv+267RxnK3Wu\nqSPt1+3fRf8j0CJ2xjqIYu//3hzMz6YUdiZwIMOUR+ISDEm+OyZSMJPs/fG6DRkx\nw0c5zYDeIGtsIMqY4gfS9ht479UJDhkO/MX0VY8CgYBJqqzrAzDpTq0dKSlnzXMu\nsJxNxBHwIFxykwOvahQz1quUeUIEVXbuOGxvtAcMCSMc39R8AcXUFJm0o3dL7ibh\nTJS05DAq1OlSjO2624kTSVsTR95BJQyF3K+Ax9ZKMF3qF77N+IZR7MibZUbqBuqd\nwvm3lPKDF8yZ7tcosg6bwA==\n-----END PRIVATE KEY-----\n"

async function getOriginalSheet() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.CLIENT_EMAIL || "goods-in-shet@checksheet-353507.iam.gserviceaccount.com",
            client_id: process.env.CLIENT_ID || "112041893168891028722",
            private_key: GoogleSheetsKey.replace(/\\n/g, '\n'),
        },
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
        ],
    });
// console.log(auth);
    const sheets = google.sheets({
        auth,
        version: 'v4',
    });
// console.log(sheets)
    const response = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: process.env.GOOGLE_SHEET_ID || "13lPWfo1sNBiBuGX2JdlVJm-yvnMxGq0v4lGmw49ELn0",
        ranges: [
            "МАРАФОН 2021 НОЯБРЬ-ДЕКАБРЬ",
            "марафон 2022",
            "2021 ИЮЛЬ",
            "2021 АВГУСТЬ",
            "2021 СЕНТЯБРЬ",
            "2021 ОКТЯБРЬ",
            "2021 НОЯБРЬ",
            "2021 ДЕКАБРЬ",
            "2022 ЯНВАРЬ",
            "2022 ФЕВРАЛЬ",
            "2022 МАРТ",
            "2022 АПРЕЛЬ",
            "2022 МАЙ",
            "ИЮНЬ 2022",
            "ИЮЛЬ2022",
            "АВГУСТЬ2022",
            "СЕНТЯБРЬ2022",
            "ОКТЯБРЬ2022",
            "НОЯБРЬ2022",
            "ДЕКАБРЬ2022",
            "ЯНВАРЬ 2023",
            "ФЕВРАЛЬ 2023",
            "МАРТ2023",
            "ДЕКАБРЬ2022",
            "ДЕКАБРЬ2022",
            "ДЕКАБРЬ2022",
            "ДЕКАБРЬ2022"
        ],
    });

    return response.data.valueRanges
}


async function getTrimmedSheet() {
    const sheet = await getOriginalSheet();
    let needSheet = []
    sheet.map(list => {
        let needList = []
        list.values.map(row => {
            needList.push({
                index: row[0] || "",
                contractNumber: row[1] || "",
                date: row[3] || "",
                fullname: row[13] || "",
                longIin: row[4] || "",
                shortIin: row[14] || "",
            })
        })
        needSheet.push(needList)
    })
    return needSheet
}

function listContainsIin(list, iin) {
    for (const i in list) {
        let row = list[i]
        if (row.longIin === iin)
            return true
    }
    return false
}


function getUserDataFromListByIin(list, iin) {
    let result = []
    for (const i in list) {
        let row = list[i]
        if (row.longIin === iin)
            result.push(row)
    }
    return result
}

async function findTablesByIin(iin) {
    const sheet = await getTrimmedSheet();
    const needSheet = []
    for (const i in sheet) {
        let list = sheet[i]
        if (listContainsIin(list, iin))
            needSheet.push(list)
    }

    return needSheet
}


async function findUserByIin(iin) {
    const sheet = await getTrimmedSheet();
    let userDataEntries = []
    for (const i in sheet) {
        let list = sheet[i]
        userDataEntries = [...userDataEntries, ...getUserDataFromListByIin(list, iin)]
    }

    return userDataEntries
}


export {findTablesByIin, findUserByIin}