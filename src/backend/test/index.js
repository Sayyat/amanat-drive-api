const payload = {
    "root": {
        "rKey": "5A88E858-FD94-40B5-A4AF-0B6E40A93F9E",
        "formuuid": "5a88e858-fd94-40b5-a4af-0b6e40a93f9e",
        "props": {},
        "path": "1",
        "type": 1,
        "begin": 18,
        "end": 138,
        "cur": 0,
        "widthPix": 990,
        "heightPix": 569,
        "brType": 1,
        "compact": false,
        "svgSupported": true,
        "flags": 3,
        "zoom": 100,
        "showRowAndColumnNames": false,
        "showCellNames": false,
        "showGrid": false,
        "showHeaders": false,
        "pointerType": 0,
        "wndWidthPix": 996,
        "maxWndWidthPix": 996,
        "repaginate": false,
        "showComments": false
    }
}

const url = "http://rent3.ordait.kz:35221/Amanat/ru/e1cib/moxel?cmd=getVisualContents"

const login = "Абылай"
const password = "cY5lefew"
const bearer = Buffer.from(`${login}:${password}`).toString("base64")

async function request() {

    console.log({bearer})
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${bearer}`,
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(payload)
    })
    const result = await response.json()
    console.log(Buffer.from(result.exception.inner.data, "base64").toString())

}

request()