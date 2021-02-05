import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAuthedUser } from '../actions/shared';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';

class Logins extends Component {
	state = {
		arrow: true,
	};

	handleDropdown = (e) => {
		e.currentTarget.closest('.dropdown').classList.toggle('is-active');
		e.currentTarget.classList.toggle('is-black');
		this.setState((prevState) => ({
			arrow: !prevState.arrow,
		}));
	};

	handleUser = (k) => (e) => {
		e.currentTarget.closest('.dropdown').classList.toggle('is-active');

		const { dispatch } = this.props;

		dispatch(
			addAuthedUser({
				authedUser: k,
			})
		);
	};

	render() {
		const { from } = this.props.location.state || { from: { pathname: '/' } };

		if (this.props.authedUser !== false) {
			return <Redirect to={from} />;
		}

		return (
			<main>
				<div className="container">
					<div className="columns">
						<div className="column is-two-fifths">
							<h1 className="title is-1">LOGIN</h1>
							<div className="message-header">
								<p>Select your user</p>
							</div>
							<div className="card mb-6">
								<div className="card-content">
									<div className="content">
										<div className="dropdown">
											<div className="dropdown-trigger">
												<button
													className="button is-black"
													aria-haspopup="true"
													aria-controls="dropdown-menu"
													onClick={this.handleDropdown}
												>
													<span>Select User</span>
													<span className="icon is-small">
														{this.state.arrow ? <FaAngleDown /> : <FaAngleUp />}
													</span>
												</button>
											</div>
											<div
												className="dropdown-menu"
												id="dropdown-menu"
												role="menu"
											>
												<div className="dropdown-content">
													{Object.keys(this.props.users).map((id, key) => (
														<div key={key} onClick={this.handleUser(id)}>
															{this.props.users[id]}
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		);
	}
}

function mapStateToProps({ users, authedUser }) {
	const newUsers = Object.fromEntries(
		Object.entries(users)
			.map(([k, v]) => [k, users[k].name])
			.sort()
	);

	console.log('Login Page - mapStatetoProps - authedUser', authedUser);

	return {
		authedUser,
		users: newUsers,
	};
}

export default connect(mapStateToProps)(Logins);
