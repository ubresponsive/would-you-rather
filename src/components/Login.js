import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BiUserMinus } from 'react-icons/bi';
import { Link, withRouter } from 'react-router-dom';

class Login extends Component {
	handleDropdown = (e) => {
		e.currentTarget.closest('.dropdown').classList.toggle('is-active');
	};

	handleUser = (k) => (e) => {
		e.currentTarget.closest('.dropdown').classList.toggle('is-active');
		console.log(k);
	};

	render() {
		return (
			<main>
				<nav
					className="navbar is-primary pl-4"
					role="navigation"
					aria-label="main navigation"
				/>
				<div className="container">
					<div className="columns">
						<div className="column is-two-fifths">
							<h1 className="title is-1">LOGIN</h1>
							<div className="message-header">
								<p>{this.props.authedUser}</p>
							</div>
							<div className="card mb-6">
								<div className="card-content">
									<div className="content">
										<div className="dropdown">
											<div className="dropdown-trigger">
												<button
													className="button"
													aria-haspopup="true"
													aria-controls="dropdown-menu"
													onClick={this.handleDropdown}
												>
													<span>Select User</span>
													<span className="icon is-small">
														<i
															className="fas fa-angle-down"
															aria-hidden="true"
														></i>
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

function mapStateToProps({ authedUser, users }) {
	const newUsers = Object.fromEntries(
		Object.entries(users)
			.map(([k, v]) => [k, users[k].name])
			.sort()
	);

	console.log(newUsers, 'newusers');

	return {
		authedUser,
		//users: Object.values(users).sort(),
		users: newUsers,
	};
}

export default connect(mapStateToProps)(Login);
