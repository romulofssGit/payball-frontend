import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home/index';
import Player from './pages/Player/index';
import Match from './pages/Match/index';
import MatchPlayer from './pages/MatchPlayer/index';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/match-players" component={MatchPlayer} />
			<Route path="/match" component={Match} />
			<Route exact path="/player" component={Player} />
			<Route exact path="/player/:id" component={Player} />
		</Switch>
	</BrowserRouter>
)

export default Routes;