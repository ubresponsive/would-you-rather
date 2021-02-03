import React from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import Nav from './Nav';
import Dashboard from './Dashboard';
import NewQuestion from './NewQuestion';
import QuestionPage from './QuestionPage';
import ResultsPage from './ResultsPage';
import LeaderboardPage from './LeaderboardPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
							<Nav />
							<ToastContainer />
							<div className="container">
								<Switch>
									<Route path="/" exact component={Dashboard} />
									<Route path="/new" component={NewQuestion} />
									<Route path="/question/:id" component={QuestionPage} />
									<Route path="/results/:id" component={ResultsPage} />
									<Route path="/leaderboard" component={LeaderboardPage} />
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
	};
}

export default connect(mapStateToProps)(App);
