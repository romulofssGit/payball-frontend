import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Menu extends Component {

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<Link className="navbar-brand" to="/">PayBall</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavDropdown">
					<ul className="navbar-nav">
						{/* <li className="nav-item">
							<Link className="nav-link" to="/match-players">Histórico de jogos </Link>
						</li> */}
						<li className="nav-item">
							<Link className="nav-link" to="/match">Novo Jogo</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/player">Jogadores</Link>
						</li>
					</ul>
				</div>
			</nav>
		)
	}
}