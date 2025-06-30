import { useState } from 'react';

export default function ModalCreateAnime({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        episodes: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Limpar erro do campo quando o usuário começar a digitar
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Validação do título
        if (!formData.title.trim()) {
            newErrors.title = 'O título é obrigatório';
        } else if (formData.title.trim().length < 2) {
            newErrors.title = 'O título deve ter pelo menos 2 caracteres';
        }

        // Validação da descrição
        if (formData.description && formData.description.length > 500) {
            newErrors.description = 'A descrição deve ter no máximo 500 caracteres';
        }

        // Validação dos episódios
        if (formData.episodes) {
            const episodesNum = parseInt(formData.episodes);
            if (isNaN(episodesNum) || episodesNum < 1) {
                newErrors.episodes = 'O número de episódios deve ser um número positivo';
            }
        }

        // Validação da URL da imagem
        if (formData.image && !isValidUrl(formData.image)) {
            newErrors.image = 'Por favor, insira uma URL válida';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Preparar dados para envio
            const animeData = {
                title: formData.title.trim(),
                description: formData.description.trim() || null,
                image: formData.image.trim() || null,
                episodes: formData.episodes ? parseInt(formData.episodes) : null
            };

            await onSubmit(animeData);
            
            // Limpar formulário após sucesso
            setFormData({
                title: '',
                description: '',
                image: '',
                episodes: ''
            });
            setErrors({});
            onClose();
        } catch (error) {
            console.error('Erro ao criar anime:', error);
            setErrors({ submit: 'Erro ao criar anime. Tente novamente.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setFormData({
                title: '',
                description: '',
                image: '',
                episodes: ''
            });
            setErrors({});
            onClose();
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
            handleClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-indigo-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-2xl">
                    <h2 className="text-xl font-bold text-gray-800">
                        ✨ Cadastrar Novo Anime
                    </h2>
                    <button
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="text-gray-500 hover:text-red-500 transition-colors duration-200 disabled:opacity-50 p-1 rounded-full hover:bg-red-50"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Erro geral */}
                    {errors.submit && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm shadow-sm">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.submit}
                            </div>
                        </div>
                    )}

                    {/* Título */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                            🎬 Título <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                                errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                            }`}
                            placeholder="Digite o título do anime"
                            disabled={isSubmitting}
                        />
                        {errors.title && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Descrição */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                            📝 Descrição
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                            maxLength={500}
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none ${
                                errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                            }`}
                            placeholder="Digite uma descrição (opcional, máximo 500 caracteres)"
                            disabled={isSubmitting}
                        />
                        <div className="flex justify-between items-center mt-2">
                            {errors.description && (
                                <p className="text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {errors.description}
                                </p>
                            )}
                            <p className="text-xs text-gray-500 ml-auto">
                                {formData.description.length}/500
                            </p>
                        </div>
                    </div>

                    {/* URL da Imagem */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                            🖼️ URL da Imagem
                        </label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                                errors.image ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                            }`}
                            placeholder="https://exemplo.com/imagem.jpg"
                            disabled={isSubmitting}
                        />
                        {errors.image && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.image}
                            </p>
                        )}
                    </div>

                    {/* Número de Episódios */}
                    <div>
                        <label htmlFor="episodes" className="block text-sm font-semibold text-gray-700 mb-2">
                            📺 Número de Episódios
                        </label>
                        <input
                            type="number"
                            id="episodes"
                            name="episodes"
                            value={formData.episodes}
                            onChange={handleInputChange}
                            min="1"
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                                errors.episodes ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                            }`}
                            placeholder="Ex: 12"
                            disabled={isSubmitting}
                        />
                        {errors.episodes && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.episodes}
                            </p>
                        )}
                    </div>

                    {/* Botões */}
                    <div className="flex space-x-3 pt-6">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 font-medium flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Criando...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Criar Anime
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
