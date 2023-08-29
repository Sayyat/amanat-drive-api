import {useEffect, useState} from "react";

export function useUserData() {
    const [userId, setUserId] = useState(null)
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        loadUserId()
    }, [])

    useEffect(() => {
        saveUserId(userId)
    }, [userId])

    function loadUserId() {
        const id = Buffer.from(localStorage.getItem("userId") || "", "base64").toString()
        fetchUserData(id).then((userData) => {
            setUserId(id)
            setUserData(userData)
        })
    }

    function removeUserId() {
        localStorage.removeItem("userId")
        setUserId(null)
    }


    function saveUserId(userId) {
        if (!userId) return
        localStorage.setItem("userId", Buffer.from(`${userId}`).toString("base64"))
        setUserId(userId)
    }

    async function fetchUserData(userId) {
        if (!userId) return null
        const response = await fetch("/api/auth/getData", {
            method: "POST",
            body: JSON.stringify({
                userId
            })
        })
        return await response.json()

    }

    return {userData, userId, saveUserId, removeUserId}
}