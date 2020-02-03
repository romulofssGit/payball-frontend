import React, { Component } from 'react';
import api from './../../services/axios-configuration';

export default class ShuffleMatchPlayer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			matchPlayerList: [],
			listTeams: [],
			listGoalKepper: []
		}
	}

	async componentDidMount() {
		this.makeTeams();
	}

	makeTeams = async () => {
		await this.getMatchPlayer();
		this.shufflePlayer();
	}

	getMatchPlayer = async () => {
		try {
			const { id_match } = this.props.match.params;
			const objResponse = await api.get(`/match-player/${id_match}`);


			this.setState({ matchPlayerList: objResponse.data });
		} catch (error) {
			console.error('Não foi possível retornar os dados', error);
		}
	}

	shuffle(array) {
		return array.sort(() => Math.random() - 0.5);
	}


	setGoalKeeper = () => {
		let { matchPlayerList } = this.state;

		let listOfGoalKeppers = [];
		let index_remove = [];
		let count_goal_keeper = 0;

		matchPlayerList.forEach((objPlayer, index) => {
			if (objPlayer.player.id_position === 2 && count_goal_keeper < 2) {
				objPlayer.player.name = `${objPlayer.player.name} - GK`;
				listOfGoalKeppers.push(objPlayer);
				index_remove.push(index);
				count_goal_keeper++;
			}
		});

		for (let i = index_remove.length -1; i >=0; i--) {
			matchPlayerList.splice(index_remove[i], 1);
		}

		this.setState({
			listGoalKepper: listOfGoalKeppers
		});
	}

	shufflePlayer = () => {
		this.setGoalKeeper();

		const { matchPlayerList } = this.state;

		const team1 = this.shuffle(matchPlayerList);
		const team2 = team1.splice(0, (matchPlayerList.length / 2));

		let index_goalkeeper = Math.floor(Math.random() * 2);
		const { listGoalKepper } = this.state;
		let goalKepperTeam2 = listGoalKepper.splice(index_goalkeeper, 1);

		team1.push(listGoalKepper[0]);
		team2.push(goalKepperTeam2[0]);

		this.setState({
			listTeams: [this.shuffle(team1), this.shuffle(team2)]
		});

	}

	render() {
		const { listTeams } = this.state;
		return (
			<div>
				<br />
				<div className="row">
					<div className="col-sm-8"></div>
					<div className="text-right col-sm-4">
						<button
							type='button'
							className="btn btn-primary"
							onClick={this.makeTeams}
						>
							<strong>Gerar times</strong>
						</button>
					</div>
				</div>
				<br />

				<div className="row">
					{listTeams.map((teams, index) => (
						<div className="col-sm-6">
							<ul className="list-group">

								<li key={index} className="list-group-item list-group-item-success">
									Time {index + 1}
								</li>

								{teams.map((team, index_team) => (
									<li key={index_team} className="list-group-item">
										{team.player.name}
									</li>

								))}
								<br />
							</ul>

						</div>
					))}
				</div>

			</div>

		);
	}
}