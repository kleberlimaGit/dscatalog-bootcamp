import React, { useEffect, useState } from 'react';
import { ReactComponent as ThreeLineIcon} from '../../assets/images/Union.svg'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { getAccessTokenDecoded, isAllowedByRole, logout } from 'core/utils/auth';

import './styles.scss';

const Navbar = () => {
    const [currentUser, setCurrentUser] = useState('');
    const [collapseNav,setCollapseNav] = useState('');

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
                  <h1>Logout</h1>
                  <p className="mt-2">Quer mesmo fazer logout?</p>
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

    const handleCollapse = () =>{
        if(collapseNav === ''){
            setCollapseNav('three-line')
            document.getElementsByClassName('col-6')
        }
        else{
            setCollapseNav('')
        }
    }

    const handleResetSession = () => window.sessionStorage.removeItem("page")




    return (
        <nav className={`row bg-primary main-nav ${collapseNav}`}>
            <div className="col-3 logo-format">
                <Link to="/" className="nav-log-text">
                    <h4>DS Catalog</h4>
                </Link>

            </div>
            <div className="col-6 menu-format">
                <ul className="main-menu">

                    <li>
                        <NavLink exact to="/" activeClassName="active" className="nav-link" onClick={handleResetSession}>HOME</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" activeClassName="active" className="nav-link" onClick={handleResetSession}>CATÁLOGO</NavLink>
                    </li>
                    <li className={`${isAllowedByRole(['ROLE_ADMIN','ROLE_OPERATOR']) ? 'd-inline' : 'd-none'}`}>
                        <NavLink to="/admin" activeClassName="active" className="nav-link" onClick={handleResetSession}>ADMIN</NavLink>
                    </li>
                </ul>
            </div>
            <div className="col-2 text-right">
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
            <div>
                <ThreeLineIcon className="icon-line" onClick={handleCollapse}/>
            </div>  
        </nav>
    );
}

export default Navbar;  