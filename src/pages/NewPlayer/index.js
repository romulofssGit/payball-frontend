import React, { Component } from 'react';
import api from './../../services/axios-configuration'

export default class NewPlayer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id_player: 0,
			player_name: '',
			player_skills: '',
			player_position: 0
		}

		this.handleChangePlayerName = this.handleChangePlayerName.bind(this);
		this.handleChangePlayerSkills = this.handleChangePlayerSkills.bind(this);
		this.handleChangePlayerPosition = this.handleChangePlayerPosition.bind(this);
		this.sendForm = this.sendForm.bind(this);
	}

	componentDidMount() {
		const { id_player } = this.props.match.params;

		if (id_player && id_player > 0) {
			this.setState({ id_player: id_player });
			this.getPlayerById(id_player);
		}
	}

	getPlayerById = async (id_player) => {
		try {
			const objResponse = await api.get(`/player/${id_player}`);

			this.setState({
				id_player: objResponse.data.id,
				player_name: objResponse.data.name,
				player_skills: objResponse.data.skills,
				player_position: objResponse.data.id_position
			});

		} catch (error) {
			console.log(`ERRO AO RECUPERAR O JOGADOR COM O ID -> ${id_player}`, error);
		}
	}

	async sendForm(event) {
		event.preventDefault();
		try {
			const { player_name: name, player_skills: skills, player_position: id_position } = this.state;

			const objDataResponse = {
				name,
				skills,
				id_position
			}

			if (this.state.id_player > 0) {
				await api.put(`/player/${this.state.id_player}`, objDataResponse);
			}
			else {
				await api.post('/player', objDataResponse);
			}

			this.props.history.replace('/player');

		} catch (error) {
			console.error('Não foi possível SALVAR os jogadores', error);
		}
	}

	handleChangePlayerName(event) {
		this.setState({ 'player_name': event.target.value });
	}

	handleChangePlayerSkills(event) {
		this.setState({ 'player_skills': event.target.value });
	}

	handleChangePlayerPosition(event) {
		this.setState({ 'player_position': event.target.value });
	}

	goBackPlayerList = () => {
		this.props.history.goBack();
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-12 offset-md-3 col-md-6">
						<form onSubmit={this.sendForm}>
							<br />
							<div className="form-group">
								<label htmlFor="player_name">Nome do jogador</label>
								<input
									type="text"
									className="form-control"
									id="player_name"
									placeholder="Nome do Jogador"
									onChange={this.handleChangePlayerName}
									value={this.state.player_name}
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="player_skills">Nota</label>
								<input
									type="number"
									className="form-control"
									id="player_skills"
									placeholder="Nota de 1 a 10"
									min="1" max="10" maxLength="2"
									onChange={this.handleChangePlayerSkills}
									value={this.state.player_skills}
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="select-position">Posição</label>
								<select
									className="form-control"
									id="select-position"
									value={this.state.player_position}
									onChange={this.handleChangePlayerPosition}
									required
								>
									<option value="">Selecione ...</option>
									<option value="1">Atacante</option>
									<option value="2">Goleiro</option>
									<option value="3">Zagueiro</option>
								</select>
							</div>


							<button type="button" className="btn btn-danger" onClick={this.goBackPlayerList}>Cancelar</button>&nbsp;
							<button type="submit" className="btn btn-primary">Salvar</button>
						</form>

					</div>
				</div>
			</div>
		)
	}
}