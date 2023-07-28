import { useListaDeParticipantes } from "./useListaDeParticipantes"
import { useSetRecoilState } from "recoil"
import { resultadoAmigoSecreto } from "../atom"
import { realizarSorteio } from "../helpers/realizarSorteio"

export const useSorteador = () => {
    // retorna uma função
    const participantes = useListaDeParticipantes()

    const setResultado = useSetRecoilState(resultadoAmigoSecreto)

    return () => {
        const resultado = realizarSorteio(participantes)
        setResultado(resultado)
    }
}