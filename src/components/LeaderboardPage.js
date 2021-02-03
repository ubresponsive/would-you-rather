import React, { Component } from 'react';
import { connect } from 'react-redux';
import User from './User';
import { withRouter } from 'react-router-dom';

class LeaderboardPage extends Component {
	render() {
		return (
			<div className="columns">
				<div className="column is-two-fifths">
					<h1 className="title is-1">Leaderboard</h1>
					{Object.keys(this.props.userIds).map((id, index) => (
						<User
							key={index}
							id={id}
							index={index}
							score={this.props.userIds[id]}
							leaders={this.props.leaders}
						/>
					))}
				</div>
			</div>
		);
	}
}

function mapStateToProps({ users }) {
	// get user id and scores from users object then sort by score
	const newUsers = Object.fromEntries(
		Object.entries(users)
			.map(([k, v]) => [
				k,
				users[k].questions.length + Object.keys(users[k].answers).length,
			])
			.sort((a, b) => b[1] - a[1])
	);
	// what is the highest score
	const highScore = Object.values(newUsers)[0];
	// how many leaders do we have to show the trophy icon?
	const leaders = Object.values(newUsers).filter((x) => x === highScore).length;

	return {
		userIds: newUsers,
		leaders: leaders,
	};
}

export default withRouter(connect(mapStateToProps)(LeaderboardPage));
