import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helper';
import { Link, withRouter } from 'react-router-dom';

class Question extends Component {
	render() {
		const { question } = this.props;
		const authedUser = this.props.authedUser;

		if (question === null) {
			return <p>This question doesn't exist</p>;
		}

		const { name, optionOne, optionTwo, avatar, id, hasVoted } = question;

		return (
			<>
				<Link
					to={hasVoted ? `/results/${id}` : `/question/${id}`}
					className="question"
				>
					<div className="message-header">
						<p>{name} asks:</p>
					</div>
					<div className="box mb-5">
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
												<span>
													{optionTwo.votes.includes(authedUser)
														? optionTwo.text.slice(0, 20)
														: optionOne.text.slice(0, 20)}
													...
												</span>
											</div>
										</div>

										<div className="field">
											<div className="control">
												<button
													type="submit"
													className="button is-primary is-small has-text-weight-semibold mt-2"
												>
													{hasVoted ? 'VIEW POLL' : 'VOTE'}
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</article>
					</div>
				</Link>
			</>
		);
	}
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
	const question = questions[id];

	return {
		authedUser,
		users,
		question: question
			? formatQuestion(question, users[question.author], authedUser)
			: null,
	};
}

export default withRouter(connect(mapStateToProps)(Question));
