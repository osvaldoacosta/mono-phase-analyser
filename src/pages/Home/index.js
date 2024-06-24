import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <div className="container">
      <div className="home">
        <img
          src={"eletric.png"}
          alt="ftransformador"
          style={{ height: 100, width: 100 }}
        />
        <h1>MonoPhaseAnalyzer</h1>
        <h2>Bem-vindo ao MonoPhaseAnalyzer!</h2>
        <p>
          No MonoPhaseAnalyzer estão disponíveis as funcionalidades de calcular os parâmetros do transformador monofásico, calcular regulação de tensão e gerar diagrama fasorial.
        </p>
        <p>
          Para começar, você pode ir para a página de ensaios clicando no link
          abaixo:
        </p>
        <Link to="/parametros">Ir para Calcular Parâmetros</Link>
        <br></br>
        <Link to="/calculate-regulacao">Ir para Calcular Regulação de Tensão</Link>
      </div>
    </div>
  );
}

export default Home;
