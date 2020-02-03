import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home/index';
import Player from './pages/Player/index';
import Match from './pages/Match/index';
import NewMatch from './pages/NewMatch/NewMatch';
import MatchPlayer from './pages/MatchPlayer/index';
import Menu from './components/Menu/index';
import NewPlayer from './pages/NewPlayer';
import ShuffleMatchPlayer from './pages/ShuffleMatchPlayer/index';


const Routes = () => (
	<BrowserRouter>
		<Menu  />
		<div className="container-fluid">

			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/match-players/:id_match" component={MatchPlayer} />
				<Route exact path="/match-players/:id_match/shuffle-players" component={ShuffleMatchPlayer} />

				{/* Routes for Players */}
				<Route path="/match/new-match" exact component={NewMatch} />
				<Route path="/match/:id_match" exact component={NewMatch} />
				<Route path="/match" component={Match} />

				{/* Routes for Players */}
				<Route path="/player/:id_player" exact component={NewPlayer} />
				<Route path="/player/new-player" exact component={NewPlayer} />
				<Route path="/player" exact component={Player} />

			</Switch>
		</div>
	</BrowserRouter>
)

export default Routes;