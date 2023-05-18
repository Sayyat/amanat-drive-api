import {sendMessage} from "@/backend/smsc/authBySms"

export default function handler(req, res) {
    let body = req.body

    if (typeof body === "string")
        body = JSON.parse(body)

    const {phone} = body

    sendMessage(phone, isSend => {
        res.status(isSend ? 200 : 400)
    })
}
