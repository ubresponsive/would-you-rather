import React from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
	useHistory,
} from 'react-router-dom';
import { handleInitialData, logoutUser } from '../actions/shared';
import Logins from './Login';
import Nav from './Nav';
import Dashboard from './Dashboard';
import NewQuestion from './NewQuestion';
import QuestionPage from './QuestionPage';
import ResultsPage from './ResultsPage';
import LeaderboardPage from './LeaderboardPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AuthButton(props) {
	const history = useHistory();
	const authedUser = props.user;
	const dispatch = props.dispatch;

	return authedUser !== false ? (
		<p>
			Welcome!{' '}
			<button
				onClick={() => {
					dispatch(logoutUser());
					history.push('/');
				}}
			>
				Sign out
			</button>
		</p>
	) : (
		<>
			<p>Signed Out - You are not logged in!!!!</p>
		</>
	);
}

function PrivateRoute({ component: Component, user, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				user !== false ? (
					<>
						<Component {...props} />
					</>
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
}

class App extends React.Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}

	render() {
		return (
			<Router className="App" basename="/">
				<main>
					<LoadingBar />
					{this.props.loading === true ? null : (
						<>
							<AuthButton
								user={this.props.authedUser}
								dispatch={this.props.dispatch}
							/>
							<Nav />

							<ToastContainer />
							<div className="container">
								<Switch>
									<PrivateRoute
										path="/"
										exact
										component={Dashboard}
										user={this.props.authedUser}
									/>
									<Route path="/login" exact component={Logins} />
									<PrivateRoute
										path="/new"
										component={NewQuestion}
										user={this.props.authedUser}
									/>
									<PrivateRoute
										path="/question/:id"
										component={QuestionPage}
										user={this.props.authedUser}
									/>
									<PrivateRoute
										path="/results/:id"
										component={ResultsPage}
										user={this.props.authedUser}
									/>
									<PrivateRoute
										path="/leaderboard"
										component={LeaderboardPage}
										user={this.props.authedUser}
									/>
								</Switch>
							</div>
						</>
					)}
				</main>
			</Router>
		);
	}
}

function mapStateToProps({ authedUser }) {
	return {
		loading: authedUser === null,
		authedUser,
	};
}

export default connect(mapStateToProps)(App);
