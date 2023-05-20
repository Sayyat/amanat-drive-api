export function splitName(name) {
    let fullname = ""
    name.split("/").map(name => {
        let [lastname, firstname, middlename] = name.trim().split(" ")
        firstname = firstname ? firstname.substring(0, 1) + "." : ""
        middlename = middlename ? middlename.substring(0, 1) + "." : ""
        fullname += `${lastname} ${firstname} ${middlename}\n`
    })
    return fullname
}


export function compareNames(fullname1, fullname2) {
    console.log({fullname1, fullname2})
    let [lastname1, firstname1, middlename1] = fullname1.trim().split(" ")
    let [lastname2, firstname2, middlename2] = fullname2.trim().split(" ")

    return lastname1.trim() === lastname2.trim() &&
        firstname1.trim() === firstname2.trim() &&
        middlename1.trim() === middlename2.trim()
}
