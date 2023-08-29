import {getUser} from "@/backend/database/users";

export default async function (req, res) {
    const {userId} = JSON.parse(req.body)

    const result = await getUser(userId);
    res.status(200).json(result)
}