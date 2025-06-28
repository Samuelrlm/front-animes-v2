# Componente CardAnime

Um componente React moderno e responsivo para exibir informações de animes em formato de card.

## Características

- ✅ Design responsivo com Tailwind CSS
- ✅ Tratamento de imagens ausentes ou com erro
- ✅ Formatação de datas em português brasileiro
- ✅ Exibição condicional de informações
- ✅ Animações e transições suaves
- ✅ Ícones SVG integrados
- ✅ Botões de ação (Ver Detalhes e Favoritar)

## Como usar

```jsx
import CardAnime from './components/CardAnime';

// Dados do anime
const anime = {
    "id": 1,
    "title": "Pepa Pig",
    "description": "Bacon",
    "image": null,
    "episodes": null,
    "createdAt": "2025-06-04T00:14:41.291Z",
    "updatedAt": "2025-06-04T00:14:41.291Z"
};

// Uso do componente
<CardAnime anime={anime} />
```

## Props

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `anime` | `object` | ✅ | Objeto contendo os dados do anime |

### Estrutura do objeto `anime`

```typescript
interface Anime {
    id: number;           // ID único do anime
    title: string;        // Título do anime
    description?: string; // Descrição (opcional)
    image?: string;       // URL da imagem (opcional)
    episodes?: number;    // Número de episódios (opcional)
    createdAt: string;    // Data de criação (ISO string)
    updatedAt: string;    // Data de atualização (ISO string)
}
```

## Funcionalidades

### Tratamento de Imagens
- Se `image` for `null` ou vazio, exibe um placeholder com ícone
- Se a imagem falhar ao carregar, automaticamente exibe o placeholder
- Placeholder com gradiente e ícone de imagem

### Formatação de Datas
- Datas formatadas no padrão brasileiro (dd/mm/aaaa hh:mm)
- Exibe tanto data de criação quanto de atualização

### Exibição Condicional
- Descrição só aparece se existir
- Episódios só aparecem se o valor for diferente de `null`
- Badge com ID sempre visível

### Responsividade
- Grid responsivo que se adapta a diferentes tamanhos de tela
- Cards com altura consistente
- Texto com truncamento para evitar overflow

## Estilização

O componente usa Tailwind CSS com as seguintes classes principais:

- **Container**: `bg-white rounded-lg shadow-md hover:shadow-lg`
- **Imagem**: `h-48 bg-gray-100 object-cover`
- **Título**: `text-lg font-semibold text-gray-900`
- **Descrição**: `text-gray-600 text-sm`
- **Botões**: `bg-blue-500 hover:bg-blue-600 text-white`

## Exemplo Completo

Veja o arquivo `example.jsx` para exemplos de uso com diferentes cenários de dados. 