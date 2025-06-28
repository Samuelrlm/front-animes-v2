import CardAnime from './index';

export default function CardAnimeExample() {
    // Exemplo de dados do anime conforme fornecido
    const animeExample = {
        "id": 1,
        "title": "Pepa Pig",
        "description": "Bacon",
        "image": null,
        "episodes": null,
        "createdAt": "2025-06-04T00:14:41.291Z",
        "updatedAt": "2025-06-04T00:14:41.291Z"
    };

    // Exemplo com mais dados para demonstrar todas as funcionalidades
    const animeExample2 = {
        "id": 2,
        "title": "Naruto Shippuden",
        "description": "Naruto Uzumaki é um jovem ninja que busca se tornar o Hokage, o líder de sua vila. Acompanhe suas aventuras e batalhas épicas neste anime de ação e amizade.",
        "image": "https://example.com/naruto-image.jpg",
        "episodes": 500,
        "createdAt": "2025-01-15T10:30:00.000Z",
        "updatedAt": "2025-06-01T14:20:00.000Z"
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Exemplos do Componente CardAnime</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card com dados mínimos */}
                    <CardAnime anime={animeExample} />
                    
                    {/* Card com dados completos */}
                    <CardAnime anime={animeExample2} />
                    
                    {/* Card com imagem que pode dar erro */}
                    <CardAnime anime={{
                        ...animeExample2,
                        image: "https://invalid-url.com/image.jpg"
                    }} />
                </div>
            </div>
        </div>
    );
} 