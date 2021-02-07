import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../actions/shared';
import { useHistory } from 'react-router-dom';

function AuthButton(props) {
	const history = useHistory();
	const authedUser = props.user;
	const dispatch = props.dispatch;
	const avatar = props.avatar;
	const name = props.name;

	return authedUser !== false ? (
		<div className="authButton is-flex is-flex-direction-row is-align-items-flex-start is-justify-content-center is-align-items-center">
			<figure className="image is-32x32 mr-4">
				<img src={avatar} alt={`Avatar of ${name}`} className="is-rounded" />
			</figure>
			<button
				className="button is-link"
				onClick={() => {
					dispatch(logoutUser());
					history.push('/');
				}}
			>
				Sign out
			</button>
		</div>
	) : (
		<>
			<div className="authButton">Signed Out</div>
		</>
	);
}

class Nav extends Component {
	render() {
		return (
			<nav
				className="navbar is-primary pl-4"
				role="navigation"
				aria-label="main navigation"
			>
				<div className="navbar-start">
					<div className="navbar-item has-text-weight-bold">
						<NavLink to={'/'} exact activeClassName="is-active">
							HOME
						</NavLink>
					</div>
					<div className="navbar-item has-text-weight-bold">
						<NavLink to={'/add'} exact activeClassName="is-active">
							NEW
						</NavLink>
					</div>
					<div className="navbar-item has-text-weight-bold">
						<NavLink to={'/leaderboard'} exact activeClassName="is-active">
							LEADERBOARD
						</NavLink>
					</div>
				</div>
				<div className="navbar-end">
					<div className="navbar-item">
						<AuthButton
							user={this.props.authedUser}
							name={this.props.userId.name}
							avatar={this.props.userId.avatarURL}
							dispatch={this.props.dispatch}
						/>
					</div>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ authedUser, users }) {
	let userId = '';
	authedUser !== false
		? (userId = Object.values(users).filter(
				(user) => user.id === authedUser
		  )[0])
		: (userId = '');

	return {
		authedUser,
		userId: userId,
	};
}

export default connect(mapStateToProps)(Nav);
