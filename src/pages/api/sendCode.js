import {sendMessage} from "@/backend/smsc/authBySms"

export default async function handler(req, res) {
    let body = req.body

    if (typeof body === "string")
        body = JSON.parse(body)

    const {phone} = body
    console.log(phone)

    const isSend = await sendMessage(phone)
    console.log(isSend)
    res.status(isSend ? 200 : 400).json({isSend})

}
