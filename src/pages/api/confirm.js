import {authorize} from "@/backend/smsc/authBySms"
import {whiteListSheet} from "@/backend/googleSheets/raw/whitelistSheet";

export default async function handler(req, res) {
    let body = req.body

    if (typeof body === "string")
        body = JSON.parse(body)

    const {timestamp, phone, confirmCode} = body

    const whiteList = await whiteListSheet()

    let isAdmin = false
    for (let i = 0; i < whiteList.length; i++) {
        if(whiteList[i][0].trim() === phone){
            isAdmin = true
        }
    }

    const isAuthorized = authorize(timestamp, phone, confirmCode)
    res.status(isAuthorized ? 200 : 400).json({isAuthorized, isAdmin})
}
