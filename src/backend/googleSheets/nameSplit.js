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
    if(fullname1.trim().length === 0 || fullname1.trim().length === 0)
        return ""
    let [lastname1, firstname1, middlename1] = fullname1.trim().split(" ")
    let [lastname2, firstname2, middlename2] = fullname2.trim().split(" ")

    lastname1 = lastname1 ? lastname1.trim() : ""
    firstname1 = firstname1 ? firstname1.trim() : ""
    middlename1 = middlename1 ? middlename1.trim() : ""
    lastname2 = lastname2 ? lastname2.trim() : ""
    firstname2 = firstname2 ? firstname2.trim() : ""
    middlename2 = middlename2 ? middlename2.trim() : ""

    if(middlename1.length === 0 || middlename2.length === 0){
        return similarity(lastname1, lastname2) > 0.7 &&
        similarity(firstname1, firstname2) > 0.7
    }

    return similarity(lastname1, lastname2) > 0.7 &&
        similarity(firstname1, firstname2) > 0.7 &&
        similarity(middlename1, middlename2) > 0.7
}

export function similarity(s1, s2) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    const longerLength = longer.length;
    if (longerLength === 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i === 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}