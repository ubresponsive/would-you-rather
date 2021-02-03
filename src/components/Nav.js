import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {
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
		</nav>
	);
}
