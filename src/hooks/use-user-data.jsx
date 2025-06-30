import { useEffect, useState } from "react";

export default function useUserData(){
    const [user, setUser] = useState(null)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        setUser(user)
    }, [])

    return user
}