import CardAnime from "@/components/CardAnime";
import ModalCreateAnime from "@/components/ModalCreateAnime";
import PageWrapper from "@/components/PageWrapper";
import useUserData from "@/hooks/use-user-data";
import instance from "@/instance/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Animes() {
    const [animes, setAnimes] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const user = useUserData()


    async function createAnime(data){
        try {
            const response = await instance.post('/animes', data)

            setAnimes(prev => [...prev, response.data])
            toast.success("Anime criado com sucesso")
            setOpenModal(false)
        } catch (error) {
            console.log(error)
            toast.error("Erro ao criar anime")
        }
    }

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
        <PageWrapper 
            title="Animes"
            description="Gerencie seus animes"
        >
            {
                user?.role == "admin" && (
                        <button
                            onClick={() => setOpenModal(true)}
                            className="absolute right-8 top-8 bg-blue-500 text-white px-4 py-2 rounded-md">
                            Adicionar Anime
                        </button>
                )
            }
            <div className="flex flex-wrap gap-4">
                {animes.map((anime) => {
                    return <CardAnime 
                                anime={anime} 
                                key={anime.id} 
                            />
                })}
            </div>
            <ModalCreateAnime 
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={createAnime}
            />
        </PageWrapper>
    )
}