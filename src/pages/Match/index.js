import React, { Component } from 'react';
import api from './../../services/axios-configuration'
import { Link } from 'react-router-dom'

class Match extends Component {

	constructor(props) {
		super(props);
		this.state = {
			matchList: []
		}
	}

	async componentDidMount() {
		this.getMatchForList();
	}

	async getMatchForList() {
		try {
			const objResponse = await api.get('/match');

			this.setState({ matchList: objResponse.data });
		} catch (error) {
			console.error('Não foi possível retornar as partidas cadastradas', error);
		}
	}

	removeMatch = async (event) => {
		try {

			const is_delete = window.confirm("Deseja remover essa partida?");

			if (!is_delete) { return; }
			debugger
			let id_match = event.target.value;
			await api.delete(`/match/${id_match}`);
			this.getMatchForList();

		} catch (error) {
			console.error('Não foi possível REMOVER essa partida', error);
		}
	}

	render() {

		const { matchList } = this.state;

		return (
			<div >

				<br />

				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<Link className="breadcrumb-item" to="/">Home</Link>
						<li className="breadcrumb-item active" aria-current="page">Partidas</li>
					</ol>
				</nav>

				<div className="row">
					<div className="col-sm-7"></div>
					<div className="text-right col-sm-3">
						<Link
							to={`${this.props.match.url}/new-match`}
							className="btn btn-primary"
						>
							<strong>+ Nova partida</strong>
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
										<th scope="col">Onde?</th>
										<th scope="col">Data</th>
										<th scope="col">Ações</th>
									</tr>
								</thead>
								<tbody>
									{matchList.map((match) => (
										<tr key={match.id} >
											<td>{match.place}</td>
											<td>{match.dt_match_br}</td>
											<td>
												<Link className="btn btn-warning" to={`${this.props.match.url}/${match.id}`}>
													Editar
												</Link>
												&nbsp;
												<br />
												<br />
												<button type="button" className="btn btn-danger" value={match.id} onClick={this.removeMatch}>
													Excluir
												</button>
												&nbsp;
												<br />
												<br />
												<Link className="btn btn-primary" to={`match-players/${match.id}`}>
													Add Jogadores
												</Link>
												<br />
												<br />
												<Link className="btn btn-success" to={`match-players/${match.id}/shuffle-players`}>
													Sortear times
												</Link>
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
export default Match;