import {confirmMessage} from "@/backend/smsc/authBySms"
import {login} from "@/backend/database/auth";

export default async function handler(req, res) {
    let body = req.body

    if (typeof body === "string")
        body = JSON.parse(body)

    const {timestamp, phone, confirmCode} = body


    const isConfirmed = confirmMessage(timestamp, phone, confirmCode)

    const row = await login(phone, "");

    if(!row){
        res.status(isConfirmed ? 200 : 400).json({
            data: null
        })
        return
    }

    const data = {
        phone: row[0],
        lastname: row[1],
        firstname: row[2],
        middlename: row[3],
        iin: row[4],
        role: row[5],
        picture: row[6],
    }

    res.status(isConfirmed ? 200 : 400).json({
        data
    })
}
