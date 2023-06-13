import {sendMessage} from "@/backend/smsc/authBySms"

export default async function handler(req, res) {
    let body = req.body

    if (typeof body === "string")
        body = JSON.parse(body)

    const {phone} = body
    console.log(phone)

    const success = await sendMessage(phone)

    res.status(200).json({success})
}
