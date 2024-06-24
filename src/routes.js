import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import TransformerForm from './components/TransformerForm';
import Result from './components/Result';
import Erro from './pages/Erro';
import Parametros from './pages/Parametros/Parametros';
import ParametrosResults from './pages/Parametros/ParametrosResults';
import CalculateForm from './pages/Parametros/CalculateForm';
import RegulacaoResults from './pages/Parametros/RegulacaoResults';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home/>} />
                <Route path='/ensaios' element={ <TransformerForm/>} />
                <Route path='/resultado' element={ <Result/>} />
                <Route path='/parametros' element={ <Parametros/>} />
                <Route path='/results' element={ <ParametrosResults/>} />
                <Route path='/calculate-regulacao' element={ <CalculateForm/>} />
                <Route path='/regulacao-results' element={ <RegulacaoResults/>} />

                <Route path='*' element= { <Erro/> }/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;