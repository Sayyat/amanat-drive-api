import {authorize} from "@/backend/smsc/authBySms"

export default async function handler(req, res) {
    let body = req.body

    if (typeof body === "string")
        body = JSON.parse(body)

    const {timestamp, phone, confirmCode} = body
    console.log({timestamp, phone, confirmCode})
    const isAuthorized = authorize(timestamp, phone, confirmCode)
    res.status(isAuthorized ? 200 : 400).json({isAuthorized})
}
