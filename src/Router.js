import React from 'react'
import {Route, Router, Redirect, browserHistory} from 'react-router'
import App from './App';
import Login from './Login';
import Dashboard from './Dashboard';
import Import from './import/Import';
import NewOrder from './newOrder/NewOrder';
import Orders from './orders/Orders';

let router =
    <Router history={browserHistory}>
        <Route path="/login" component={Login}/>
        <Route component={App}>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/new" component={NewOrder}/>
            <Route path="/edit/:id" component={NewOrder}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/import" component={Import}/>
            <Redirect from="*" to="/login"/>
        </Route>
    </Router>;
export default router
