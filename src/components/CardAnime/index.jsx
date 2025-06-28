import { useState } from 'react';

export default function CardAnime({ anime }) {
    const [isImageError, setIsImageError] = useState(false);

    const handleImageError = () => {
        setIsImageError(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
            {/* Imagem do Anime */}
            <div className="relative h-48 bg-gray-100">
                {anime.image && !isImageError ? (
                    <img
                        src={anime.image}
                        alt={anime.title}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                        <div className="text-center">
                            <svg 
                                className="w-16 h-16 mx-auto text-gray-400 mb-2" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                />
                            </svg>
                            <p className="text-gray-500 text-sm">Sem imagem</p>
                        </div>
                    </div>
                )}
                
                {/* Badge de ID */}
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    #{anime.id}
                </div>
            </div>

            {/* Conteúdo do Card */}
            <div className="p-4">
                {/* Título */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {anime.title}
                </h3>

                {/* Descrição */}
                {anime.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {anime.description}
                    </p>
                )}

                {/* Episódios */}
                {anime.episodes && (
                    <div className="flex items-center mb-3">
                        <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-600">
                            {anime.episodes} episódio{anime.episodes !== 1 ? 's' : ''}
                        </span>
                    </div>
                )}

                {/* Datas */}
                <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Criado em: {formatDate(anime.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Atualizado em: {formatDate(anime.updatedAt)}</span>
                    </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex space-x-2 mt-4">
                    <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200">
                        Ver Detalhes
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-md transition-colors duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
