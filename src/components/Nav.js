import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../actions/shared';
import { useHistory } from 'react-router-dom';

function AuthButton(props) {
	const history = useHistory();
	const authedUser = props.user;
	const dispatch = props.dispatch;

	return authedUser !== false ? (
		<div className="authButton">
			<button
				className="button is-dark"
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
						<NavLink to={'/new'} exact activeClassName="is-active">
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
							dispatch={this.props.dispatch}
						/>
					</div>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ authedUser }) {
	return {
		authedUser,
	};
}

export default connect(mapStateToProps)(Nav);
