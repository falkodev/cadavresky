import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Layout from './Layout';
import WhosWho from './pages/WhosWho';
import Projectology from './pages/Projectology';
import Error404 from './pages/Error404';

ReactDom.render((
  <Router history = {browserHistory}>
      <Route path = "/" component = {Layout}>
          <IndexRoute component={WhosWho} />
          <Route path = "whoswho" component = {WhosWho} />
          <Route path = "projectology" component = {Projectology} />
      </Route>
      <Route path="*" component={Error404}/>
   </Router>
), document.getElementById('app'));
