export function splitName(name){
    let fullname = ""
    name.split("/").map(name => {
        let [lastname, firstname, middlename] = name.trim().split(" ")
        firstname = firstname ? firstname.substring(0, 1) + "." : ""
        middlename = middlename ? middlename.substring(0, 1) + "." : ""
        fullname += `${lastname} ${firstname} ${middlename}\n`
    })
    return fullname
}
