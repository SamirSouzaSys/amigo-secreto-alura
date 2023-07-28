import { fireEvent, render, screen } from "@testing-library/react";
// import React from 'react'
import Formulario from "./Formulario";
import { RecoilRoot } from "recoil";
import { act } from "react-dom/test-utils";

let input: HTMLElement;
let botao: HTMLElement;

const renderComponent = () => {
  // Formulario dentro do RecoilRoot semelhante ao estado real
  render(
    <RecoilRoot>
      <Formulario />
    </RecoilRoot>
  );
};

const defaultTests = () => {
  // Encontrar no DOM o input
  input = screen.getByPlaceholderText("Insira os nomes dos participantes");

  // encontrar o botão
  botao = screen.getByRole("button");
};

const adicionarAlguem = (nome?: string) => {
  fireEvent.change(input, {
    target: {
      value: nome ? nome : "Nome do Participante",
    },
  });
  fireEvent.click(botao);
};

describe("O comportamento do Formulario.tsx", () => {
  test("Quando o input está vazio, novos participantes não podem ser adicionados", () => {
    renderComponent();
    defaultTests();

    // garantir que o input esteja no documento
    expect(input).toBeInTheDocument();

    // garantir que o botão esteja desabilitado
    expect(botao).toBeDisabled();
  });

  test("Adicionar um participante caso exista um nome preenchido", () => {
    renderComponent();
    defaultTests();

    adicionarAlguem();

    expect(input).toHaveFocus();
    expect(input).toHaveValue("");
  });

  test("Nomes duplicados não podem ser adicionados na lista", () => {
    renderComponent();
    defaultTests();

    adicionarAlguem();
    adicionarAlguem();

    const mensagemDeErro = screen.getByRole("alert");

    expect(mensagemDeErro.textContent).toBe(
      "Nomes duplicados não são permitidos!"
    );
  });

  test("A mensagem de erro deve sumir após os timers", () => {
    jest.useFakeTimers();

    renderComponent();
    defaultTests();

    adicionarAlguem();
    adicionarAlguem();
    let mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    //espera N segundos
    mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeNull();
  });
});
