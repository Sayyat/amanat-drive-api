import executeQuery from './db'

export async function register(phone, email, lastname, firstname, middlename, iin, isAdmin, picture) {
    // sql query result has some error, or we did not find user in database
    const result = await executeQuery(`insert into users (phone, email, lastname, firstname, middlename, iin, isAdmin, picture)
                                                        values ('${phone}','${email}','${lastname}','${firstname}','${middlename}','${iin}', '${isAdmin}', '${picture}');`, [])
    return result.insertId
}

export async function login(phone, email) {
    // check if user already authorized
    return await executeQuery(`select id from users where phone = '${phone}' or email = '${email}';`, [])
}