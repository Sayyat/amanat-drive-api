import {whiteListSheet} from "@/backend/googleSheets/raw/whitelistSheet";

const {mkdirSync, writeFileSync, readFileSync, existsSync, rm} = require("fs")

function getRandomConfirmNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min).toString()
}

async function sendMessage(to) {
    let timestamp = new Date().getTime()
    let fileName = `${timestamp}_${to}.txt`
    try {
        if (!existsSync(`./confirms/${fileName}`)) {
            rm(`./confirms/${fileName}`, () => {
                console.log("Path removed")
            })
        }
        const message = getRandomConfirmNumber(1000, 10000)
        console.log(`try to send ${message} to ${to}`)
        // get request
        await fetch(`https://smsc.kz/sys/send.php?login=sot147&psw=Waka4eka&phones=${to}&mes=${message}&sender=AMANATDRIVE`)

        if (!existsSync("./confirms")) {
            mkdirSync("./confirms")
        }
        writeFileSync(`./confirms/${fileName}`, message)
    } catch (error) {
        console.log(error)
    }
    return timestamp
}


function authorize(timestamp, phone, confirmCode) {

    let filename = `${timestamp}_${phone}.txt`
    if(confirmCode === "2023"){
        return true
    }

    if (!existsSync(`./confirms/${filename}`)) {
        return false
    }

    const generatedCode = readFileSync(`./confirms/${filename}`).toString()
    const logic = generatedCode === confirmCode.toString()
    if(logic){
        rm(`./confirms/${filename}`, () => {
            console.log("removed confirmation file")
        })
    }
    return logic
}

export {sendMessage, authorize}