import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Animes() {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(!token) {
            router.push('/')
        }

    }, [])

    return (
        <p>Essa é a página é PRIVADA</p>
    )
}