import { RecoilRoot } from "recoil";
import React from "react";

import ListaParticipantes from "./ListaParticipantes";
import { render, screen } from "@testing-library/react";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";

jest.mock("../state/hook/useListaDeParticipantes", () => {
  return {
    // jest.fn() vai se comportar como uma função
    useListaDeParticipantes: jest.fn(),
  };
});

const renderComponente = () => {
  render(
    <RecoilRoot>
      <ListaParticipantes />
    </RecoilRoot>
  );
};

describe("Uma lista vazia de participantes", () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([]);
  });

  test("Deve ser renderizada sem elementos", () => {
    renderComponente();
    const itens = screen.queryAllByRole("listitem");
    expect(itens).toHaveLength(0);
  });
});

describe("Uma lista preenchida de participantes", () => {
  const listaPreenchida = ["Ana", "Catarina"];

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(listaPreenchida);
  });
  test("Deve ser renderizada sem elementos", () => {
    renderComponente();
    const itens = screen.queryAllByRole("listitem");
    expect(itens).toHaveLength(listaPreenchida.length + 10);
  });
});
