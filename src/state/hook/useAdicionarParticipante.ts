import { useRecoilValue, useSetRecoilState } from "recoil"
import { erroState, listaParticipantesState } from "../atom"

// método capaz de adicionar nomes na lista
// Hook customizado

// Vamos testar comportamento
export const useAdicionarParticipante = () => {
    // useSetRecoilState - função que define um novo estado
    const setLista = useSetRecoilState(listaParticipantesState)
    const lista = useRecoilValue(listaParticipantesState)
    const setErro = useSetRecoilState(erroState)

    // retorno de uma função
    return (nomeDoParticipante: string) => {
        if(lista.includes(nomeDoParticipante)){
            setErro('Nomes duplicados não são permitidos!')
            setTimeout(() => {
                setErro("")
            },4000)
            return
        }
        
        // item atual - listaAtual
        return setLista(listaAtual => [ ...listaAtual, nomeDoParticipante])
    }
}