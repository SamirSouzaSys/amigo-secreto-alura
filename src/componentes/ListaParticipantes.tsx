import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";

const ListaParticipantes = () => {
  //   const participantes: string[] = [];
  const participantes: string[] = useListaDeParticipantes();

  return (
    <ul>
      {participantes.map((participante) => (
        // Não precisa de role - semântica já garantida pela LI
        <li key={participante}>{participante}</li>
      ))}
    </ul>
  );
};

export default ListaParticipantes;
