import React from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isTimeExpired } from './core/utils/auth'
import './core/assets/styles/custom.scss';
import './app.scss';
import Routes from './Routes';




const App = () =>{
    isTimeExpired();
    return (
        <>        
            <Routes/>
            <ToastContainer/>
        </>
        
    );
}

export default App;