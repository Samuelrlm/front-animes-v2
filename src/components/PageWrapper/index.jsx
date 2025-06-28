import instance from "@/instance/api"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Header from "../Header"

export default function PageWrapper({ children }) {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(!token) {
            router.push('/')
        }

        async function validateToken(){
            try {
                await instance.get('/heartbeat')
            } catch (error) {
                localStorage.removeItem('token')
                router.push('/')
            }
        }

        validateToken()
    }, [])

    return (
        <div className="flex w-full min-h-screen flex-col">
            <Header />
            <div className="w-full h-full p-8">
                {children}
            </div>
        </div>
    )
}