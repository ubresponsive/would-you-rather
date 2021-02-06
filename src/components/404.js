import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
	return (
		<main>
			<div className="container">
				<div className="columns">
					<div className="column is-two-fifths">
						<h1 className="title is-1">404</h1>
						<p>Oopsie!</p>
						<p>Nothing to see here</p>
						<hr />
						<Link to="/">Take me Home</Link>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Error404;
