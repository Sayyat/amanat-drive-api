const smsc = require("./smsc_api")
const {mkdirSync, writeFileSync, readFileSync, existsSync} = require("fs")

function getRandomConfirmNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min).toString()
}

function sendMessage(to, isSend) {
    const message = getRandomConfirmNumber(1000, 10000)
    // get request
    // return  await fetch(`https://smsc.kz/sys/send.php?login=sot147&psw=Waka4eka&phones=${to}&mes=${message}`)
    smsc.configure({
        login: 'sot147',
        password: "Waka4eka",
        ssl: true
    })
    // Отправка SMS
    smsc.send_sms({
        phones: [to],
        mes: message
    }, function (data, raw, err, code) {
        if (err) {
            isSend(false)
            return
        }

        if (!existsSync("/confirms")) {
            mkdirSync("/confirms")
        }

        writeFileSync(`/confirms/${to}`, message)
        isSend(true)
    });
}


function authorize(phone, confirmCode) {
    if (!existsSync(`/confirms/${phone}`)) {
        return false
    }

    return readFileSync(`/confirms/${phone}`).toString() === confirmCode.toString();
}

export {sendMessage, authorize}