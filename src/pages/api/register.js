import {authorize} from "@/backend/smsc/authBySms"

export default function handler(req, res) {
    let body = req.body

    if (typeof body === "string")
        body = JSON.parse(body)

    const {iin, phone, confirmCode} = body

    const isAuthorized = authorize(iin, phone, confirmCode)

    res.status(isAuthorized ? 200 : 400)
}
