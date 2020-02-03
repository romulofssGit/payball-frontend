import React, { Component } from 'react';
import api from './../../services/axios-configuration'

export default class NewPlayer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id_match: 0,
			place: '',
			dt_match: '',
			qtd_players: 0
		}

		this.handleChangePlaceMatch = this.handleChangePlaceMatch.bind(this);
		this.handleChangeMatchDate = this.handleChangeMatchDate.bind(this);
		this.handleChangeMatchQtdPlayers = this.handleChangeMatchQtdPlayers.bind(this);
		this.sendForm = this.sendForm.bind(this);
	}

	componentDidMount() {
		const { id_match } = this.props.match.params;

		if (id_match && id_match > 0) {
			this.setState({ id_match: id_match });
			this.getMatchById(id_match);
		}

	}

	getMatchById = async (id_match) => {
		try {
			const objResponse = await api.get(`/match/${id_match}`);

			this.setState({
				id_match: objResponse.data.id,
				place: objResponse.data.place,
				dt_match: objResponse.data.dt_match_us,
				qtd_players: objResponse.data.qtd_players,

			});

		} catch (error) {
			console.log(`ERRO AO RECUPERAR a PARTIDA COM O ID -> ${id_match}`, error);
		}
	}

	async sendForm(event) {
		event.preventDefault();
		try {
			const { place, dt_match, qtd_players } = this.state;

			const objDataResponse = {
				place,
				dt_match,
				qtd_players
			}

			if (this.state.id_match > 0) {
				await api.put(`/match/${this.state.id_match}`, objDataResponse);
			}
			else {
				await api.post('/match', objDataResponse);
			}

			this.props.history.replace('/match');

		} catch (error) {
			console.error('Não foi possível SALVAR os jogadores', error);
		}
	}

	handleChangePlaceMatch(event) {
		this.setState({ 'place': event.target.value });
	}

	handleChangeMatchDate(event) {
		this.setState({ 'dt_match': event.target.value });
	}

	handleChangeMatchQtdPlayers(event) {
		this.setState({ 'qtd_players': event.target.value });
	}

	goBackMatchList = () => {
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
								<label htmlFor="place">Local da partida</label>
								<input
									type="text"
									className="form-control"
									id="place"
									placeholder="Local da partida"
									onChange={this.handleChangePlaceMatch}
									value={this.state.place}
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="dt_match">Data da partida</label>
								<input
									type="date"
									className="form-control"
									id="dt_match"
									placeholder="Data da partida"
									onChange={this.handleChangeMatchDate}
									value={this.state.dt_match}
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="qtd_players">Quantidade de jogadores</label>
								<input
									type="number"
									className="form-control"
									id="qtd_players"
									placeholder="Quantidade de jogadores"
									onChange={this.handleChangeMatchQtdPlayers}
									value={this.state.qtd_players}
									required
								/>
							</div>

							<button type="button" className="btn btn-danger" onClick={this.goBackMatchList}>Cancelar</button>&nbsp;
							<button type="submit" className="btn btn-primary">Salvar</button>
						</form>

					</div>
				</div>
			</div>
		)
	}
}