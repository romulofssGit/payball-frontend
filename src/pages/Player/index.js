import React, { Component } from 'react';
import api from './../../services/axios-configuration'
import Menu from './../../components/Menu/index'
import { Link } from 'react-router-dom'

class Player extends Component {

	constructor(props) {
		super(props);
		this.state = {
			player_name: '',
			player_skills: '',
			player_position: '',
			playerList: []
		}

		this.handleChangePlayerName = this.handleChangePlayerName.bind(this);
		this.handleChangePlayerSkills = this.handleChangePlayerSkills.bind(this);
		this.handleChangePlayerPosition = this.handleChangePlayerPosition.bind(this);
		this.sendForm = this.sendForm.bind(this);
	}

	async componentDidMount() {
		this.getPlayerForList();
	}

	async getPlayerForList() {
		try {
			const objResponse = await api.get('/player');
			this.setState({ playerList: objResponse.data });
		} catch (error) {
			console.error('Não foi possível retornar os jogadores', error);
		}
	}

	async sendForm(event) {
		event.preventDefault();
		try {
			const { player_name: name, player_skills: skills, player_position: id_position } = this.state;

			const objPost = {
				name,
				skills,
				id_position
			}

			await api.post('/player', objPost);

			this.getPlayerForList();
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

	render() {

		const { playerList } = this.state;

		return (
			<div>
				<Menu />
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-12 col-md-6">
							<form onSubmit={this.sendForm}>
								<br />
								<div className="form-group">
									<label htmlFor="exampleInputEmail1">Nome do jogador</label>
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
									<label htmlFor="exampleInputEmail1">Qualidade</label>
									<input
										type="number"
										className="form-control"
										id="player_skills"
										placeholder="Qualidade"
										min="1" max="10" maxLength="2"
										onChange={this.handleChangePlayerSkills}
										value={this.state.player_skills}
										required
									/>
								</div>
								<div className="form-group">
									<label htmlFor="exampleFormControlSelect1">Posição</label>
									<select
										className="form-control"
										id="exampleFormControlSelect1"
										value={this.state.value}
										onChange={this.handleChangePlayerPosition}
										required
									>
										<option value="">Selecione ...</option>
										<option value="1">Atacante</option>
										<option value="2">Goleiro</option>
										<option value="3">Zagueiro</option>
									</select>
								</div>


								<button type="submit" className="btn btn-primary">Salvar</button>
							</form>

						</div>
					</div>
				</div>

				<br />
				<div className="row">
					<div className="col-sm-12 col-md-6">
						<table className="table table-striped table-dark">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Nome</th>
									<th scope="col">Classificação</th>
									<th scope="col">Posição</th>
									<th scope="col">Detalhes</th>
								</tr>
							</thead>
							<tbody>
								{playerList.map((player) => (
									<tr key={player.id} >
										<th scope="row">{player.id}</th>
										<td>{player.name}</td>
										<td>{player.skills}</td>
										<td>{player.id_position}</td>
										<td>
											<Link to={`player/${player.id}`}>Detalhes</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}
export default Player;