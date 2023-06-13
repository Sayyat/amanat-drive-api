import {confirmMessage} from "@/backend/smsc/authBySms"
import {login} from "@/backend/database/auth";

export default async function handler(req, res) {
    let body = req.body

    if (typeof body === "string")
        body = JSON.parse(body)

    const {phone, confirmCode} = body

    const isConfirmed = await confirmMessage(phone, confirmCode)

    const rows = await login(phone, "");

    res.status(isConfirmed ? 200 : 400).json({
        id: rows.length === 0 ? null : rows[0]?.id
    })
}
