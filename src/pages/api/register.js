import {authorize} from "@/backend/smsc/authBySms"

export default async function handler(req, res) {
    let body = req.body

    if (typeof body === "string")
        body = JSON.parse(body)

    const {phone, confirmCode} = body
    const isAuthorized = authorize(phone, confirmCode)
    res.status(isAuthorized ? 200 : 400).json({isAuthorized})
}
