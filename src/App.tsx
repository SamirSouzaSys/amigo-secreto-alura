import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
// import Formulario from './componentes/Formulario';
import Configuracao from "./paginas/Configuracao";
import Sorteio from "./paginas/Sorteio";

function App() {
  // acessos ao estado da applicação
  //   acesso as rotas da applicação
  //     rota principal
  return (
    <BrowserRouter>
      {/* gerir rotas - aplicação inteira envolvida por ele */}
      <RecoilRoot>
        {/* componentes internos terão acesso ao estado */}
        <Routes>
          {/* todas as rotas */}
          {/* <Route path="/" element={Formulario} /> */}
          <Route path="/" element={<Configuracao />} />
          <Route path="/sorteio" element={<Sorteio />} />

          {/* Na raiz, renderizar o Formulário */}
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
