import { atom } from "recoil";
// state - estado global da aplicação - // lista de participante
export const listaParticipantesState = atom<string[]>({
    // Chave, identificador único
    key: 'listaParticipantesState',
    // estado padrão - lista vazia
    default: []
})

export const resultadoAmigoSecreto = atom<Map<string, string>>({
    key: 'resultadoAmigoSecreto',
    default: new Map()
})

export const erroState = atom<string>({
    key: 'erroState',
    default: ''
})

