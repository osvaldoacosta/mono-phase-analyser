import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import TransformerForm from './components/TransformerForm';
import Result from './components/Result';
import Erro from './pages/Erro';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home/>} />
                <Route path='/ensaios' element={ <TransformerForm/>} />
                <Route path='/resultado' element={ <Result/>} />

                <Route path='*' element= { <Erro/> }/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;