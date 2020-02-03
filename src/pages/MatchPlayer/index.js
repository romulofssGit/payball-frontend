import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from './../../services/axios-configuration'
import './index.css'

export default class MatchPlayer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			matchList: [],
			playerList: [],
			playerListConfirmed: []
		}
	}

	async componentDidMount() {
		this.getPlayerForList();
		this.getMatchById();
	}

	getMatchById = async () => {
		try {

			const { id_match } = this.props.match.params;
			const objResponse = await api.get(`/match/${id_match}`);

			this.setState({
				matchList: objResponse.data
			});

		} catch (error) {
			console.log(`ERRO AO RECUPERAR a PARTIDA COM O ID ->`, error);
		}
	}

	async getPlayerForList() {
		try {
			const objResponse = await api.get('/player');
			this.setState({ playerList: objResponse.data });
		} catch (error) {
			console.error('Não foi possível retornar os jogadores', error);
		}
	}

	setPlayerConfirmed = (event) => {
		if (this.state.playerListConfirmed.length >= this.state.matchList.qtd_players) {
			alert('Limite máximos de jogadores atingido');
			return;
		}

		const index = (event.target.value);
		let playerList = this.state.playerList;
		playerList = playerList.splice(index, 1);

		let playerListConfirmed = this.state.playerListConfirmed;
		playerListConfirmed.push(playerList[0]);

		this.setState({
			playerListConfirmed: playerListConfirmed
		});
	}

	setPlayerUnConfirmed = (event) => {
		const index = (event.target.value);
		let playerListConfirmed = this.state.playerListConfirmed;
		playerListConfirmed = playerListConfirmed.splice(index, 1);

		let playerList = this.state.playerList;
		playerList.push(playerListConfirmed[0]);

		this.setState({
			playerList: playerList
		});
	}

	sendMatchPlayers = async () => {
		try {

			if (this.state.playerListConfirmed.length < this.state.matchList.qtd_players) {
				window.alert('Confirme os jogadores para o jogo.');
				return
			}

			let arrPlayers = this.state.playerListConfirmed.map(player => (
				player.id
			));

			let objPost = {
				id_match: this.state.matchList.id,
				arrPlayers
			}

			await api.post('/match-player', objPost);

			this.props.history.push({
				pathname: `${this.props.match.url}/shuffle-players`
			});

		} catch (error) {
			console.error('ERRO AO ENVIAR OS JOGADORES CONFIRMADOS NA PARTIDA: ', error);
		}
	}


	render() {

		const { playerList, playerListConfirmed, matchList } = this.state;

		return (
			<div>
				<br />
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<Link className="breadcrumb-item" to="/">Home</Link>
						<li className="breadcrumb-item active" aria-current="page">Adicionar jogadores</li>
					</ol>
				</nav>

				<div className="row">
					<div className="col-sm-8"></div>
					<div className="text-right col-sm-4">
						<button
							type='button'
							className="btn btn-primary"
							onClick={this.sendMatchPlayers}
						>
							<strong>Enviar</strong>
						</button>
					</div>
				</div>
				<br />

				<div className="row">
					<div className="col-sm-6">
						<ul className="list-group">
							<li className="list-group-item list-group-item-warning">
								Não confirmados: ({playerList.length})
							</li>
							{playerList.map((player, player_index) => (
								<li
									key={player_index}
									value={player_index}
									onClick={this.setPlayerConfirmed}
									className="list-group-item click-item-list-match-player">
									{player.name} - {player.position.name}
								</li>
							))}
						</ul>
					</div>

					<div className="col-sm-6">
						<ul className="list-group">
							<li className="list-group-item list-group-item-success">Confirmados: ({playerListConfirmed.length}/{matchList.qtd_players})</li>
							{playerListConfirmed.map((player, player_index) => (
								<li
									key={player_index}
									value={player_index}
									onClick={this.setPlayerUnConfirmed}
									className="list-group-item click-item-list-match-player"
								>
									{player.name} - {player.position.name}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

		);
	}
}