import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing'
import SpotsMap from './pages/SpotsMap'

function Routes() {
 return (
  <BrowserRouter>
   <Switch>
    <Route path="/" exact component={Landing} />
    <Route path="/map" component={SpotsMap} />
   </Switch>
  </BrowserRouter>
 );
}

export default Routes;