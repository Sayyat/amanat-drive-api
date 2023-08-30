import {useEffect, useState} from "react";

export function useUserData() {
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        loadUserId()
    }, [])

    useEffect(() => {
        setLoading(true)
        if(userId === null) return
        fetchUserData(userId).then((userData) => {
            setUserId(userId)
            setUserData(userData)
            setLoading(false)
        })
    }, [userId])

    function loadUserId() {
        setLoading(true)
        const id = Buffer.from(localStorage.getItem("userId") || "", "base64").toString()
        fetchUserData(id).then((userData) => {
            setUserId(id)
            setUserData(userData)
            setLoading(false)
        })
    }

    async function fetchUserData(userId) {
        const response = await fetch("/api/auth/getData", {
            method: "POST",
            body: JSON.stringify({
                userId
            })
        })
        return await response.json()
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


    return {userData, loading, saveUserId, removeUserId}
}