import React from 'react';
import { Switch } from 'react-router-dom';
import Products from './components/Products';
import PrivateRoute from 'core/components/Routes/PrivateRoute';
import Navbar from './components/Products/navbar';
import './styles.scss'
import Categories from './components/Categories';
import Users from './components/Users';

const Admin = () => (

<div className="admin-container">
    <Navbar/>
    <div className="admin-content">
        <Switch>
            <PrivateRoute path="/admin/products">
                <Products/>
            </PrivateRoute>

            <PrivateRoute path="/admin/categories">
                <Categories/>
            </PrivateRoute>

            <PrivateRoute path="/admin/users" allowedRoutes={['ROLE_ADMIN']}>
                <Users/>
            </PrivateRoute>

        </Switch>
    </div>
</div>

);

export default Admin;
