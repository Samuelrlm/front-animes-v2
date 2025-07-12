import instance from "@/instance/api"
import { useRouter } from "next/router"
import { useEffect } from "react"
import SideMenu from "../SideMenu"

export default function PageWrapper({ children, title, description }) {
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
            <div className="w-full h-full flex">
                <SideMenu />
                <div className="w-full ml-[300px] h-full p-8">
                    <div className="w-full h-full flex flex-col gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <h1 className="text-2xl font-bold">
                                {title}
                            </h1>
                            <p className="text-gray-500">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}