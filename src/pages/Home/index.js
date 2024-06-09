import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Icone_Logo from "../../components/eletric.png";

function Home() {
    return (
        <div className='container'>
            <div className='home'>
                <img
                    src={Icone_Logo}
                    alt='ftransformador'
                    style={{ height: 100, width: 100 }}
                />
                <h1>MonoPhaseAnalyzer</h1>
                <h2>
                    Bem-vindo ao MonoPhaseAnalyzer! 
                </h2>
                <p>
                    Este sistema web analisa transformadores monofásicos e fornece informações sobre seus parâmetros, regulação de tensão e diagrama fasorial.
                </p>
                <p>
                    Para começar, você pode ir para a página de ensaios clicando no link abaixo:
                </p>
                <Link to='/ensaios'>Ir para Ensaios</Link>
            </div>
        </div>
    );
}

export default Home;
