import React from 'react'
import { Route, Switch } from 'react-router-dom'
import List from './List'


const Categories = () =>{
    return (
       <div> 
            <Switch>
                <Route path="/admin/categories" exact>
                   <List/>
                </Route>
            </Switch>
        </div> 
    );
}

export default Categories;