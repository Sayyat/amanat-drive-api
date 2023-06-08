import {read} from "@/backend/auth/auth";

export default async function (req, res) {
    const {email} = JSON.parse(req.body)

    const row = await read("", email);

    if(!row){
        res.status(200).json({
            data: null
        })
        return
    }

    const data = {
        email: row[0],
        lastname: row[1],
        firstname: row[2],
        middlename: row[3],
        iin: row[4],
        role: row[5],
        picture: row[6],
    }

    res.status(200).json({
        data
    })
}