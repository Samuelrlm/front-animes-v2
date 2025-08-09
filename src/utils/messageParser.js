/**
 * Utilitário para parsear e validar mensagens recebidas via WebSocket
 */

/**
 * Valida e padroniza o formato de uma mensagem recebida via WebSocket
 * @param {*} payload - Dados recebidos do WebSocket
 * @param {number} expectedGroupId - ID do grupo esperado
 * @returns {Object|null} - Mensagem padronizada ou null se inválida
 */
export const parseWebSocketMessage = (payload, expectedGroupId = null) => {
    console.log('🔍 Parsing mensagem WebSocket:', payload);

    try {
        // Validação básica
        if (!payload || typeof payload !== 'object') {
            console.error('❌ Payload inválido - não é um objeto:', payload);
            return null;
        }

        // Extrair conteúdo da mensagem
        const content = extractContent(payload);
        if (!content) {
            console.error('❌ Conteúdo da mensagem não encontrado:', payload);
            return null;
        }

        // Extrair ID do remetente
        const senderId = extractSenderId(payload);
        if (!senderId) {
            console.error('❌ ID do remetente não encontrado:', payload);
            return null;
        }

        // Extrair ID do grupo
        const groupId = extractGroupId(payload);
        if (!groupId) {
            console.error('❌ ID do grupo não encontrado:', payload);
            return null;
        }

        // Validar se é para o grupo correto
        if (expectedGroupId && parseInt(groupId) !== parseInt(expectedGroupId)) {
            console.log(`ℹ️ Mensagem para grupo ${groupId}, esperado ${expectedGroupId}. Ignorando.`);
            return null;
        }

        // Extrair timestamp
        const timestamp = extractTimestamp(payload);

        // Criar mensagem padronizada
        const standardMessage = {
            id: generateTempId(),
            content: content.trim(),
            senderId: parseInt(senderId),
            groupId: parseInt(groupId),
            createdAt: timestamp,
            source: 'websocket'
        };

        console.log('✅ Mensagem parseada com sucesso:', standardMessage);
        return standardMessage;

    } catch (error) {
        console.error('❌ Erro ao parsear mensagem WebSocket:', error);
        console.error('Payload original:', payload);
        return null;
    }
};

/**
 * Extrai o conteúdo da mensagem de diferentes formatos possíveis
 */
const extractContent = (payload) => {
    // Possíveis campos para o conteúdo
    const contentFields = ['message', 'content', 'text', 'body'];
    
    for (const field of contentFields) {
        if (payload[field] && typeof payload[field] === 'string') {
            return payload[field];
        }
    }
    
    return null;
};

/**
 * Extrai o ID do remetente de diferentes formatos possíveis
 */
const extractSenderId = (payload) => {
    // Formato 1: { sender: { id: 123 } }
    if (payload.sender && typeof payload.sender === 'object' && payload.sender.id) {
        return payload.sender.id;
    }
    
    // Formato 2: { sender: 123 }
    if (payload.sender && (typeof payload.sender === 'number' || typeof payload.sender === 'string')) {
        return payload.sender;
    }
    
    // Formato 3: { senderId: 123 }
    if (payload.senderId) {
        return payload.senderId;
    }
    
    // Formato 4: { user: { id: 123 } }
    if (payload.user && typeof payload.user === 'object' && payload.user.id) {
        return payload.user.id;
    }
    
    // Formato 5: { userId: 123 }
    if (payload.userId) {
        return payload.userId;
    }
    
    return null;
};

/**
 * Extrai o ID do grupo de diferentes formatos possíveis
 */
const extractGroupId = (payload) => {
    // Possíveis campos para o ID do grupo
    const groupFields = ['groupId', 'group_id', 'roomId', 'room_id', 'channelId', 'channel_id'];
    
    for (const field of groupFields) {
        if (payload[field] !== undefined && payload[field] !== null) {
            return payload[field];
        }
    }
    
    return null;
};

/**
 * Extrai o timestamp de diferentes formatos possíveis
 */
const extractTimestamp = (payload) => {
    // Possíveis campos para timestamp
    const timestampFields = ['timestamp', 'createdAt', 'created_at', 'time', 'date'];
    
    for (const field of timestampFields) {
        if (payload[field]) {
            const date = new Date(payload[field]);
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
    }
    
    // Se não encontrou timestamp válido, usar data atual
    return new Date();
};

/**
 * Gera um ID temporário único para a mensagem
 */
const generateTempId = () => {
    return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Valida formatos comuns de mensagens WebSocket
 */
export const validateMessageFormat = (payload) => {
    const tests = {
        hasContent: !!extractContent(payload),
        hasSender: !!extractSenderId(payload),
        hasGroup: !!extractGroupId(payload),
        hasValidTimestamp: !!extractTimestamp(payload),
        isObject: typeof payload === 'object' && payload !== null
    };
    
    console.log('🧪 Validação do formato da mensagem:', tests);
    return tests;
};

/**
 * Exemplos de formatos suportados
 */
export const SUPPORTED_MESSAGE_FORMATS = {
    format1: {
        message: "Conteúdo da mensagem",
        sender: { id: 123 },
        groupId: 456,
        timestamp: "2023-12-01T10:00:00Z"
    },
    format2: {
        content: "Conteúdo da mensagem",
        sender: 123,
        groupId: 456,
        createdAt: "2023-12-01T10:00:00Z"
    },
    format3: {
        message: "Conteúdo da mensagem",
        senderId: 123,
        group_id: 456,
        timestamp: 1701424800000
    }
};

export default parseWebSocketMessage; 