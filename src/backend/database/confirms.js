import executeQuery from './db'

export async function sendCode(phone, code) {
    // sql query result has some error, or we did not find user in database
    const result = await executeQuery(`insert into confirms (phone, code) values ('${phone}','${code}');`, [])
    return result.insertId
}

export async function confirmCode(phone, code) {
    // check confirmation
    const selectQuery = await executeQuery(`select * from confirms where phone = '${phone}' and code = '${code}';`, [])

    // sql query result has no error
    if (selectQuery.error) {
        return false;
    }
    // clear the row
    await executeQuery(`delete from confirms where phone = '${phone}';`, [])

    return selectQuery.length > 0
}