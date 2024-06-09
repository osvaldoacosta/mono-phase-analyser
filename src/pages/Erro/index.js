import { Link } from 'react-router-dom';
import './erro.css';

function Erro(){
    return(
        <div className="not-found">
            <h1>404</h1>
            <h2>Página não encontrada.</h2>
            <Link to='/'>Volte para o início...</Link>
        </div>
    )
}

export default Erro;