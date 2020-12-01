import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { getAccessTokenDecoded, isAllowedByRole, logout } from 'core/utils/auth';

import './styles.scss';

const Navbar = () => {
    const [currentUser, setCurrentUser] = useState('');

    const location = useLocation();

    useEffect(()=>{
        const currentUserData = getAccessTokenDecoded();
        setCurrentUser(currentUserData.user_name);
    },[location])

    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>{
        event.preventDefault();
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='modal-logout'>
                  <h1>Você esta certo disso?</h1>
                  <p>Quer mesmo fazer logout?</p>
                  <div className="button-config">
                  <button onClick={onClose} className="button-2" >Não</button>
                  <button 
                    onClick={() => {
                        logout();
                      onClose();
                    }}
                  >
                    Sim, Fazer Logout!
                  </button>
                  </div>

                </div>
              );
            }
          });
        
    }




    return (
        <nav className="row bg-primary main-nav">
            <div className="col-3">
                <Link to="/" className="nav-log-text">
                    <h4>DS Catalog</h4>
                </Link>

            </div>
            <div className="col-6">
                <ul className="main-menu">

                    <li>
                        <NavLink exact to="/" activeClassName="active" className="nav-link">HOME</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" activeClassName="active" className="nav-link">CATÁLOGO</NavLink>
                    </li>
                    <li className={`${isAllowedByRole(['ROLE_ADMIN','ROLE_OPERATOR']) ? 'd-inline' : 'd-none'}`}>
                        <NavLink to="/admin" activeClassName="active" className="nav-link">ADMIN</NavLink>
                    </li>
                </ul>
            </div>
            <div className="col-3 text-right">
                {currentUser && (
                    <>
                    <span className ="main-user-name">
                        {currentUser}
                    </span>
                <a href="#logout" 
                className="nav-link active d-inline"
                onClick={handleLogout}>
                    LOGOUT
                </a>
                    </>
                )

                }
                {!currentUser && (
                <Link to ="/auth/login" className="nav-link active">
                LOGIN
               </Link>)}
            </div>
        </nav>
    );
}

export default Navbar;  