const smsc = require("./smsc_api")
const {mkdirSync, writeFileSync, readFileSync, existsSync} = require("fs")

function getRandomConfirmNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min).toString()
}

async function sendMessage(to) {
    let result = false
    try {
        const message = getRandomConfirmNumber(1000, 10000)
        console.log(`try to send ${message} to ${to}`)
        // get request
        const response = await fetch(`https://smsc.kz/sys/send.php?login=sot147&psw=Waka4eka&phones=${to}&mes=${message}`)

        if (!existsSync("./confirms")) {
            mkdirSync("./confirms")
        }

        writeFileSync(`./confirms/${to}`, message)
        result = true
    } catch (error) {
        console.log(error)
        result = false
    }
    return result
}


function authorize(phone, confirmCode) {
    if (!existsSync(`./confirms/${phone}`)) {
        return false
    }
    const generatedCode = readFileSync(`./confirms/${phone}`).toString()
    return generatedCode === confirmCode.toString();
}

export {sendMessage, authorize}