import {write} from "@/backend/auth/auth";
import {whiteListSheet} from "@/backend/googleSheets/raw/whitelistSheet";
import {register} from "@/backend/database/auth";

export default async function (req, res) {
    const {phone, email, lastname, firstname, middlename, iin, picture} = JSON.parse(req.body)

    const whiteList = await whiteListSheet()

    let isAdmin = false
    for (let i = 0; i < whiteList.length; i++) {
        if (whiteList[i][0].trim() === phone) {
            isAdmin = true
        }
    }

    const result = await register(phone, email, lastname, firstname, middlename, iin, isAdmin, picture)



    console.log(result.data)

    res.status(200).json(result)
}