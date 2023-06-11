const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectionLimit: 5,
})

export default async function executeQuery(query, values) {
    try {
        const conn = await pool.getConnection();
        return  await conn.query(query, values)
    } catch (e) {
        console.error(e)
        return null
    }
}


