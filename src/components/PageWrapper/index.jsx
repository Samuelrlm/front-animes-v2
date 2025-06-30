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
               const response = await instance.get('/profile')

               localStorage.setItem('user', JSON.stringify(response.data))
            } catch (error) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
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