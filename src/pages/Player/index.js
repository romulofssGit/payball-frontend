import React, { Component } from 'react';
import api from './../../services/axios-configuration'
import { Link } from 'react-router-dom'

class Player extends Component {

	constructor(props) {
		super(props);
		this.state = {
			playerList: []
		}
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

	removePlayer = async (event) => {
		try {

			const is_delete = window.confirm("Deseja remover esse jogador? ");

			if (!is_delete) { return; }

			let id_player = event.target.value;
			await api.delete(`/player/${id_player}`);
			this.getPlayerForList();

		} catch (error) {
			console.error('Não foi possível REMOVER os jogadores', error);
		}
	}

	render() {

		const { playerList } = this.state;

		return (
			<div >

				<br />

				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<Link className="breadcrumb-item" to="/">Home</Link>
						<li className="breadcrumb-item active" aria-current="page">Jogadores</li>
					</ol>
				</nav>

				<div className="row">
					<div className="col-sm-7"></div>
					<div className="text-right col-sm-3">
						<Link
							to={`${this.props.match.url}/new-player`}
							className="btn btn-primary"
						>
							<strong>+ Novo Jogador</strong>
						</Link>
					</div>
				</div>

				<br />

				<div className="row">
					<div className="col-sm-12 col-md-8 offset-md-2">
						<div className="table-responsive">
							<table className="table table-striped table-dark">
								<thead>
									<tr>
										<th scope="col">Nome</th>
										<th scope="col">Classificação</th>
										<th scope="col">Posição</th>
										<th scope="col">Ações</th>
									</tr>
								</thead>
								<tbody>
									{playerList.map((player) => (
										<tr key={player.id} >
											<td>{player.name}</td>
											<td>{player.skills}</td>
											<td>{player.position.name}</td>
											<td>
												<Link className="btn btn-warning" to={`${this.props.match.url}/${player.id}`}>
													Editar
												</Link>
												&nbsp;
												<button type="button" className="btn btn-danger" value={player.id} onClick={this.removePlayer}>
													Excluir
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div >
		)
	}
}
export default Player;