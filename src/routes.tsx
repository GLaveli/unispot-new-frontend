import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing'
import SpotsMap from './pages/SpotsMap'
import Spot from './pages/Spot'
import CreateSpot from './pages/CreateSpot'

function Routes() {
 return (
  <BrowserRouter>
   <Switch>
    <Route path="/" exact component={Landing} />
    <Route path="/map" asd component={SpotsMap} />
    <Route path="/create" component={CreateSpot} />
    <Route path="/spot/:id" component={Spot} />
   </Switch>
  </BrowserRouter>
 );
}

export default Routes;