const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectionLimit: 5,
    connectTimeout: 10000

})

export default async function executeQuery(query, values) {
    let conn, result
    try {
        conn = await pool.getConnection();
        result = await conn.query(query, values)
    } catch (e) {
        console.error(e)
        result = null
    } finally {
        if(conn)
            await conn.release()
    }

    return result
}


