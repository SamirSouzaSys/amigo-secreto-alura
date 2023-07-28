import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Rodape from "./Rodape";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";

jest.mock("../state/hook/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

const mockSorteio = jest.fn();
const mockNavegacao = jest.fn();

jest.mock("../state/hook/useSorteador", () => {
  return {
    useSorteador: () => mockSorteio,
  };
});

jest.mock("react-router-dom", () => {
  return {
    // useNavigate: mockNavegacao,
    // ERROR -> ReferenceError: Cannot access 'mockNavegacao' before initialization
    // - Precisa retornar uma função que retorna uma função - Todo hook que evoca uma função deve ser mockado dessa forma
    useNavigate: () => mockNavegacao,
  };
});

const renderComponent = () => {
  render(
    <RecoilRoot>
      <Rodape />
    </RecoilRoot>
  );
};

describe("Quando não existem participantes suficientes", () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([]);
  });

  test("a brincadeira não pode ser iniciada", () => {
    renderComponent();
    const botao = screen.getByRole("button");

    expect(botao).toBeDisabled();
  });
});

describe("Quando existem participantes suficientes", () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([
      "nome1",
      "nome2",
      "nome3",
    ]);
  });
  test("a brincadeira pode ser iniciada", () => {
    renderComponent();
    const botao = screen.getByRole("button");
    expect(botao).not.toBeDisabled();
  });

  test("A brincadeira foi iniciada", () => {
    renderComponent();
    const botao = screen.getByRole("button");
    fireEvent.click(botao);

    // expect(mockNavegacao).toHaveBeenCalled();
    expect(mockNavegacao).toHaveBeenCalledTimes(1);
    expect(mockNavegacao).toHaveBeenCalledWith("/sorteio");
    expect(mockSorteio).toHaveBeenCalledTimes(1);
  });
});
