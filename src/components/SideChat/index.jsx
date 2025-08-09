import instance from '@/instance/api';
import { useState, useEffect, useRef } from 'react';
import { HiX, HiChat, HiPaperAirplane, HiUsers, HiEmojiHappy, HiUser } from 'react-icons/hi';
import { toast } from 'react-toastify';

export default function SideChat({ isOpen, onClose, animeTitle, animeId }) {
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([])

    const onSendMessage = async (messageData) => {
        try {
            // Otimistic update - adicionar mensagem localmente primeiro
            const tempMessage = {
                id: Date.now(),
                content: messageData.content,
                senderId: messageData.senderId,
                groupId: messageData.groupId,
                createdAt: new Date()
            };

            setMessages(prev => [...prev, tempMessage]);

            // Enviar para API
            await instance.post('/messages', messageData);
            
            toast.success('Mensagem enviada!');
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            
            // Remover mensagem temporária em caso de erro
            setMessages(prev => prev.filter(msg => msg.id !== Date.now()));
            
            // Para demonstração, vamos manter a mensagem mesmo com erro
            // toast.error('Erro ao enviar mensagem');
        }
    };

    async function loadMessages() {
        try {
            const response = await instance.get(`/messages/${animeId}`)
            setMessages(response.data.messages)
        } catch (error) {
            toast.error("Erro ao carregar mensagens")
        }
    }

    useEffect(() => {
        // Pegar dados do usuário do localStorage
        loadMessages()

        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, [animeId]);

    useEffect(() => {
        // Auto scroll para a última mensagem
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || isLoading) return;

        setIsLoading(true);
        try {
            await onSendMessage({
                content: newMessage,
                groupId: animeId,
                senderId: user?.id
            });
            setNewMessage('');
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatMessageTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            return `Hoje ${date.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })}`;
        } else if (diffDays === 2) {
            return `Ontem ${date.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })}`;
        } else {
            return date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    };

    const isMyMessage = (senderId) => {
        return senderId === user?.id;
    };

    const getUserName = (senderId) => {
        if (isMyMessage(senderId)) {
            return 'Você';
        }
        return `Usuário #${senderId}`;
    };

    const getAvatarColor = (senderId) => {
        if (isMyMessage(senderId)) {
            return 'bg-gradient-to-r from-purple-500 to-blue-500';
        }
        
        // Cores diferentes baseadas no ID do usuário
        const colors = [
            'bg-gradient-to-r from-red-400 to-pink-400',
            'bg-gradient-to-r from-green-400 to-emerald-400',
            'bg-gradient-to-r from-yellow-400 to-orange-400',
            'bg-gradient-to-r from-indigo-400 to-purple-400',
            'bg-gradient-to-r from-teal-400 to-cyan-400',
        ];
        
        return colors[senderId % colors.length];
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Chat Panel */}
            <div className={`
                fixed top-0 right-0 h-full bg-white shadow-2xl border-l border-gray-200 z-50
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                w-full sm:w-96 lg:w-[400px]
            `}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
                    <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-full">
                            <HiChat className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 text-sm">
                                Chat do Grupo
                            </h3>
                            <p className="text-xs text-gray-600 truncate max-w-[200px]">
                                {animeTitle}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                    >
                        <HiX className="w-5 h-5" />
                    </button>
                </div>

                {/* Stats */}
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                            <HiUsers className="w-4 h-4" />
                            <span>{messages.length > 0 ? `${messages.length} mensagem${messages.length !== 1 ? 's' : ''}` : 'Seja o primeiro a comentar!'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-600 font-medium">Online</span>
                        </div>
                    </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100vh-200px)]">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <div className="bg-gray-100 p-4 rounded-full mb-4">
                                <HiEmojiHappy className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-sm text-center">
                                Nenhuma mensagem ainda.
                                <br />
                                Comece a conversa sobre {animeTitle}!
                            </p>
                        </div>
                    ) : (
                        messages.map((message, index) => (
                            <div
                                key={message.id || index}
                                className={`flex items-end space-x-2 ${isMyMessage(message.senderId) ? 'flex-row-reverse space-x-reverse' : 'justify-start'}`}
                            >
                                {/* Avatar */}
                                <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0
                                    ${getAvatarColor(message.senderId)}
                                `}>
                                    {isMyMessage(message.senderId) ? (
                                        <HiUser className="w-4 h-4" />
                                    ) : (
                                        message.senderId.toString().slice(-1)
                                    )}
                                </div>

                                {/* Message Bubble */}
                                <div className={`
                                    max-w-[75%] rounded-2xl px-4 py-3 shadow-sm relative
                                    ${isMyMessage(message.senderId) 
                                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-br-md' 
                                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                                    }
                                `}>
                                    {/* Nome do usuário para mensagens de outros */}
                                    {!isMyMessage(message.senderId) && (
                                        <div className="text-xs font-semibold text-purple-600 mb-1">
                                            {getUserName(message.senderId)}
                                        </div>
                                    )}
                                    
                                    {/* Conteúdo da mensagem */}
                                    <p className="text-sm leading-relaxed break-words">
                                        {message.content}
                                    </p>
                                    
                                    {/* Timestamp */}
                                    <div className={`
                                        text-xs mt-2 flex items-center justify-between
                                        ${isMyMessage(message.senderId) 
                                            ? 'text-purple-100' 
                                            : 'text-gray-500'
                                        }
                                    `}>
                                        <span>{formatMessageTime(message.createdAt)}</span>
                                        {isMyMessage(message.senderId) && (
                                            <div className="flex space-x-1">
                                                <div className="w-1 h-1 bg-purple-200 rounded-full"></div>
                                                <div className="w-1 h-1 bg-purple-200 rounded-full"></div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Tail para as mensagens */}
                                    <div className={`
                                        absolute bottom-0 w-3 h-3
                                        ${isMyMessage(message.senderId) 
                                            ? '-right-1 bg-gradient-to-r from-purple-500 to-blue-500 transform rotate-45' 
                                            : '-left-1 bg-white border-l border-b border-gray-200 transform rotate-45'
                                        }
                                    `}></div>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder={`Comentar sobre ${animeTitle}...`}
                                disabled={isLoading}
                                className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm disabled:opacity-50"
                                maxLength={500}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                                {newMessage.length}/500
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={!newMessage.trim() || isLoading}
                            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-2xl hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <HiPaperAirplane className="w-5 h-5" />
                            )}
                        </button>
                    </form>
                    <div className="text-xs text-gray-500 mt-2 text-center">
                        Pressione Enter para enviar • Seja respeitoso
                    </div>
                </div>
            </div>
        </>
    );
}
