import {login} from "@/backend/database/auth";

export default async function handler(req, res) {
    const {email} = JSON.parse(req.body)

    const result = await login("", email);
    res.status(200).json({
        id: result.length === 0 ? null : result[0]?.id
    })
}