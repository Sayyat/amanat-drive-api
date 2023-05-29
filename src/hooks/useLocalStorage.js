import {useEffect} from "react";

export function useLocalStorage() {
    function getUserData () {
        let userData = localStorage.getItem("userData") || ""
        userData = Buffer.from(userData, "base64").toString()
        try {
            return JSON.parse(userData)
        } catch (err) {
            return null
        }
    }

    return {getUserData}
}