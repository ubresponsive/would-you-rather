import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helper';

class ResultsPage extends Component {
	render() {
		const { question } = this.props;
		const authedUser = this.props.authedUser;

		if (question === null) {
			return <p>This question doesn't exist</p>;
		}

		const { name, optionOne, optionTwo, avatar, id } = question;

		const optionOneVotes = optionOne.votes.length;
		const optionTwoVotes = optionTwo.votes.length;
		const totalVotes = optionOneVotes + optionTwoVotes;
		const optionOneP = (optionOneVotes / totalVotes) * 100;
		const optionTwoP = (optionTwoVotes / totalVotes) * 100;

		return (
			<div className="columns">
				<div className="column is-two-fifths">
					<h1 className="title is-1">Vote Results</h1>
					<div className="card mb-6">
						<div className="card-header">
							<div className="card-header-title">Asked by {name}</div>
						</div>
						<div className="card-image is-flex is-justify-content-center">
							<figure className="image is-128x128 m-4">
								<img src={avatar} alt={`Avatar of ${name}`} className="" />
							</figure>
						</div>
						<div className="card-content">
							<div className="content">
								<h3>
									<strong>Results:</strong>
								</h3>
								<div
									className={`notification ${
										question.optionOne.votes.includes(authedUser) &&
										'is-primary'
									}`}
								>
									{question.optionOne.votes.includes(authedUser) && (
										<>
											<div className="block">
												<div className="tags has-addons">
													<span className="tag">
														<Link to={`/question/${id}`}>Change</Link>
													</span>
													<span className="tag is-warning">Your Vote</span>
												</div>
											</div>
										</>
									)}
									<div className="subtitle">{optionOne.text}</div>
									<progress
										className="progress is-info"
										value={optionOneP}
										max="100"
									>
										{optionOneP}%
									</progress>
									<div className="has-text-weight-bold has-text-centered">
										{optionOneVotes} out of {totalVotes} votes
									</div>
								</div>
								<div
									className={`notification ${
										question.optionTwo.votes.includes(authedUser) &&
										'is-primary'
									}`}
								>
									{question.optionTwo.votes.includes(authedUser) && (
										<>
											<div className="block">
												<div className="tags has-addons">
													<span className="tag">
														<Link to={`/question/${id}`}>Change</Link>
													</span>
													<span className="tag is-warning">Your Vote</span>
												</div>
											</div>
										</>
									)}
									<div className="subtitle">{optionTwo.text}</div>
									<progress
										className="progress is-info"
										value={optionTwoP}
										max="100"
									>
										{optionTwoP}%
									</progress>
									<div className="has-text-weight-bold has-text-centered">
										{optionTwoVotes} out of {totalVotes} votes
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ authedUser, users, questions }, props) {
	const { id } = props.match.params;
	const question = questions[id];

	return {
		authedUser,
		users,
		question: question
			? formatQuestion(question, users[question.author], authedUser)
			: null,
	};
}

export default connect(mapStateToProps)(ResultsPage);
