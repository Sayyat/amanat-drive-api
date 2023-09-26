import {whiteListSheet} from "@/backend/googleSheets/raw/whitelistSheet";
import {register} from "@/backend/database/auth";

export default async function (req, res) {
    const {phone, email, lastname, firstname, middlename, iin, picture} = JSON.parse(req.body)

    const whiteList = await whiteListSheet()

    let role = "user"
    for (let i = 0; i < whiteList.length; i++) {
        if (whiteList[i][0].trim() === phone) {
            role = "admin"
        }
    }

    const userId = await register(phone, email, lastname, firstname, middlename, iin, role, picture)

    res.status(200).json({userId: userId.toString()})
}