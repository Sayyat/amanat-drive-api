import executeQuery from './db'

export async function register(phone, email, lastname, firstname, middlename, iin, role, picture) {
    // sql query result has some error, or we did not find user in database
    const result = await executeQuery(`insert into users (phone, email, lastname, firstname, middlename, iin, role, picture)
                                                        values ('${phone}','${email}','${lastname}','${firstname}','${middlename}','${iin}', '${role}', '${picture}');`, [])
    return result.insertId
}

export async function login(phone, email) {
    if (!phone && !email)
        return []
    let clause = phone.length > 0 ? `phone = '${phone}'` : `email = '${email}'`

    return await executeQuery(`select id from users where ${clause};`, [])
}