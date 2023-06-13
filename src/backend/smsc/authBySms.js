import {confirmCode, sendCode} from "@/backend/database/confirms";

function getRandomConfirmNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min).toString()
}

async function sendMessage(to) {
    try {
        const message = getRandomConfirmNumber(1000, 10000).toString()
        console.log(`try to send ${message} to ${to}`)
        // get request
        await fetch(`https://smsc.kz/sys/send.php?login=sot147&psw=Waka4eka&phones=${to}&mes=${message}&sender=AMANATDRIVE`)
        await sendCode(to, message)
        return true
    } catch (error) {
        console.log(error)
    }
    return false
}


async function confirmMessage(phone, code) {
    return await confirmCode(phone, code)
}

export {sendMessage, confirmMessage}