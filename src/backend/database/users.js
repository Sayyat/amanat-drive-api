import executeQuery from './db'

export async function getUser(id) {
    if (id == null) return []
    // check if user already authorized
    const selectQuery = await executeQuery(`select * from users where id = '${id}';`, [])
    // sql query result has no error
    if (!selectQuery || selectQuery.error) {
        return [];
    }

    return selectQuery[0]
}