import { parseWebSocketMessage, validateMessageFormat, SUPPORTED_MESSAGE_FORMATS } from './messageParser';

/**
 * Testa diferentes formatos de mensagem WebSocket
 */
export const testMessageFormats = () => {
    console.log('🧪 Testando formatos de mensagem WebSocket...');
    
    // Teste com formatos válidos
    console.log('\n✅ Testando formatos VÁLIDOS:');
    Object.entries(SUPPORTED_MESSAGE_FORMATS).forEach(([formatName, payload]) => {
        console.log(`\n📋 Testando ${formatName}:`);
        console.log('Payload:', payload);
        
        const validation = validateMessageFormat(payload);
        const parsed = parseWebSocketMessage(payload, 456);
        
        console.log('Validação:', validation);
        console.log('Resultado:', parsed);
    });
    
    // Teste com formatos inválidos
    console.log('\n❌ Testando formatos INVÁLIDOS:');
    
    const invalidFormats = [
        { name: 'null payload', payload: null },
        { name: 'string payload', payload: 'apenas uma string' },
        { name: 'sem message/content', payload: { sender: 123, groupId: 456 } },
        { name: 'sem sender', payload: { message: 'teste', groupId: 456 } },
        { name: 'sem groupId', payload: { message: 'teste', sender: 123 } },
        { name: 'groupId diferente', payload: { message: 'teste', sender: 123, groupId: 999 } },
    ];
    
    invalidFormats.forEach(({ name, payload }) => {
        console.log(`\n📋 Testando ${name}:`);
        console.log('Payload:', payload);
        
        const validation = validateMessageFormat(payload);
        const parsed = parseWebSocketMessage(payload, 456);
        
        console.log('Validação:', validation);
        console.log('Resultado:', parsed);
    });
    
    console.log('\n🏁 Teste concluído!');
};

/**
 * Simula recebimento de mensagens com diferentes formatos
 */
export const simulateIncomingMessages = (callback) => {
    console.log('🎭 Simulando mensagens recebidas...');
    
    const messages = [
        // Formato da sua API
        {
            sender: 123,
            message: 'Mensagem formato API',
            timestamp: new Date().toISOString(),
            groupId: '456'
        },
        
        // Formato alternativo 1
        {
            content: 'Mensagem formato alternativo 1',
            sender: { id: 124 },
            createdAt: new Date().toISOString(),
            groupId: 456
        },
        
        // Formato alternativo 2
        {
            message: 'Mensagem formato alternativo 2',
            senderId: 125,
            group_id: 456,
            timestamp: Date.now()
        },
        
        // Formato inválido (será ignorado)
        {
            text: 'Mensagem com formato inválido',
            user: 126,
            room: 456
        }
    ];
    
    messages.forEach((message, index) => {
        setTimeout(() => {
            console.log(`📨 Simulando mensagem ${index + 1}:`, message);
            callback(message);
        }, (index + 1) * 1000);
    });
};

/**
 * Função para testar no console do navegador
 * Execute: window.testWebSocketMessages()
 */
window.testWebSocketMessages = () => {
    testMessageFormats();
    
    // Simular callback de mensagem
    const mockCallback = (payload) => {
        console.log('\n🔄 Processando mensagem simulada...');
        const parsed = parseWebSocketMessage(payload, 456);
        console.log('Resultado final:', parsed);
    };
    
    simulateIncomingMessages(mockCallback);
};

export default testMessageFormats; 