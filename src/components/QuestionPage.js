import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addVote } from '../actions/shared';
import { formatQuestion } from '../utils/helper';
import { withRouter } from 'react-router-dom';

class QuestionPage extends Component {
	state = {
		enabled: false,
		action: 'VIEW RESULTS',
	};

	handleChange = () => {
		this.setState({
			enabled: true,
			action: 'SUBMIT',
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const voteOption = e.target.option.value;

		const { dispatch, question, authedUser } = this.props;

		dispatch(
			addVote({
				authedUser,
				qid: question.id,
				answer: voteOption,
			})
		);

		this.props.history.push(`/results/${question.id}`);
	};

	render() {
		const { question } = this.props;
		const authedUser = this.props.authedUser;

		if (question === null) {
			return <p>This question doesn't exist</p>;
		}

		const { name, optionOne, optionTwo, avatar, hasVoted } = question;

		return (
			<div className="columns">
				<div className="column is-two-fifths">
					<h1 className="title is-1">Time to Vote</h1>
					<div className="message-header">
						<p>{name} asks:</p>
					</div>
					<div className="box mb-4">
						<article className="media">
							<div className="media-left">
								<figure className="image is-64x64">
									<img
										src={avatar}
										alt={`Avatar of ${name}`}
										className="avatar"
									/>
								</figure>
							</div>
							<div className="media-content">
								<div className="content">
									<div className="field">
										<div className="control">
											<strong>Would you rather</strong>
										</div>
									</div>

									<form onSubmit={this.handleSubmit} className="voteForm">
										<div className="field">
											<div className="control">
												<label className="radio">
													<input
														className="mr-2"
														type="radio"
														name="option"
														value="optionOne"
														onChange={this.handleChange}
														defaultChecked={
															optionOne.votes.includes(authedUser)
																? true
																: false
														}
													/>
													{optionOne.text} {hasVoted}
												</label>
											</div>
										</div>
										<div className="block is-centered mb-3 ml-5">OR </div>
										<div className="field">
											<div className="control">
												<label className="radio">
													<input
														className="mr-2"
														type="radio"
														name="option"
														value="optionTwo"
														onChange={this.handleChange}
														defaultChecked={
															optionTwo.votes.includes(authedUser)
																? true
																: false
														}
													/>
													{optionTwo.text} {hasVoted}
												</label>
											</div>
										</div>

										<div className="field">
											<div className="control">
												<button
													type="submit"
													className="button is-primary is-small has-text-weight-semibold mt-2"
													disabled={hasVoted ? false : !this.state.enabled}
												>
													{hasVoted ? this.state.action : 'SUBMIT'}
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</article>
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

export default withRouter(connect(mapStateToProps)(QuestionPage));
