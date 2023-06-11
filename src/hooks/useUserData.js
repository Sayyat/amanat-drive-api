import {useEffect, useState} from "react";

export function useUserData() {
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        setUserId(loadUserId())
    }, [])

    useEffect(() => {
        saveUserId(userId)
    }, [userId])

    function loadUserId() {
        return Buffer.from(localStorage.getItem("userId") || "", "base64").toString()
    }

    function saveUserId(userId) {
        if(!userId) return
        console.log(`Saving id: ${userId}`)
        localStorage.setItem("userId", Buffer.from(`${userId}`).toString("base64"))
    }

    async function fetchUserData(userId) {
        if (!userId) return null
        return fetch("/api/auth/getData", {
            method: "POST",
            body: JSON.stringify({
                userId
            })
        }).then((res) => res.json())
    }

    return {fetchUserData, userId, setUserId}
}