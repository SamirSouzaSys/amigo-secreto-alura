import { realizarSorteio } from "./realizarSorteio"

describe('dado um sorteio de um amigo secreto', () => {
    test('cada participante não sorteie o próprio nome', () => {
        const participantes = ['person1','person22','person33','person4', 'person5', 'person6']

        const sorteio = realizarSorteio(participantes)
        participantes.forEach(participante => {
            const amigoSecreto = sorteio.get(participante)
            expect(amigoSecreto).not.toEqual(participante)
        })
    })
})