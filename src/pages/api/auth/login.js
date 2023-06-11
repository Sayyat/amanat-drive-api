import {login} from "@/backend/database/auth";

export default async function (req, res) {
    const {email} = JSON.parse(req.body)

    const result = await login("", email);
    res.status(200).json({
        id : result ? result[0]?.id : null
    })
}