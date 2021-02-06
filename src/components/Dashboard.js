import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class Dashboard extends Component {
	state = {
		activeTab: 0,
	};

	handleClick = (activeTab) => {
		this.setState({
			activeTab: activeTab,
		});
	};

	render() {
		return (
			<div className="columns">
				<div className="column is-two-fifths">
					<h1 className="title is-1">Dashboard</h1>
					<div className="dashboard-list">
						<div className="tabs">
							<ul>
								<li
									className={`${
										this.state.activeTab === 0 ? 'is-active is-primary' : ''
									}`}
								>
									<span data-tab="0" onClick={this.handleClick.bind(this, 0)}>
										Unanswered
									</span>
								</li>
								<li
									className={`${this.state.activeTab === 1 ? 'is-active' : ''}`}
								>
									<span data-tab="1" onClick={this.handleClick.bind(this, 1)}>
										Answered
									</span>
								</li>
							</ul>
						</div>
						<div className="tabs-content">
							<div
								className={`${
									this.state.activeTab === 0 ? 'tab-content is-active' : ''
								}`}
							>
								{this.props.answered !== 0
									? Object.keys(this.props.questionIds).map(
											(id) =>
												this.props.questionIds[id] === true && (
													<Question
														key={id}
														id={id}
														voted={this.props.questionIds[id]}
													/>
												)
									  )
									: 'no answered questions'}
							</div>
							<div
								className={`${
									this.state.activeTab === 1 ? 'tab-content is-active' : ''
								}`}
							>
								{this.props.unAnswered !== 0
									? Object.keys(this.props.questionIds).map(
											(id) =>
												this.props.questionIds[id] === false && (
													<Question
														key={id}
														id={id}
														voted={this.props.questionIds[id]}
													/>
												)
									  )
									: 'no unanswered questions'}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ questions, authedUser }) {
	// get user id and see if they have already voted
	const newUserIds = Object.fromEntries(
		Object.entries(questions)
			.sort((a, b) => b[1].timestamp - a[1].timestamp)
			.map(([k, v]) => [
				k,
				questions[k].optionOne.votes.includes(authedUser) ||
					questions[k].optionTwo.votes.includes(authedUser),
			])
	);

	// lets do a count on how many answered and unanswered questions we have
	const countAnswered = Object.values(newUserIds).filter((x) => x === true)
		.length;
	const countUnAnswered = Object.values(newUserIds).filter((x) => x === false)
		.length;

	return {
		questionIds: newUserIds,
		answered: countAnswered,
		unAnswered: countUnAnswered,
	};
}

export default connect(mapStateToProps)(Dashboard);
