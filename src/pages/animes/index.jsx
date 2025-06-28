import CardAnime from "@/components/CardAnime";
import PageWrapper from "@/components/PageWrapper";
import instance from "@/instance/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Animes() {
    const [animes, setAnimes] = useState([])
    
    useEffect(() => {
        async function getAnimes(){
            try {
                const response = await instance.get('/animes')

                setAnimes(response.data)
            } catch (error) {
                console.log(error)
                toast.error("Erro ao buscar animes")
            }
        }

        getAnimes()
    }, [])

    return (
        <PageWrapper>
            <div className="w-full flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Adicionar Anime
                </button>
            </div>
            <div className="flex flex-wrap gap-4">
                {animes.map((anime) => {
                    return <CardAnime 
                                anime={anime} 
                                key={anime.id} 
                            />
                })}
            </div>
        </PageWrapper>
    )
}