import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BiTrophy } from 'react-icons/bi';

class User extends Component {
	render() {
		const { user } = this.props;

		if (user === null) {
			return <p>This user doesn't exist</p>;
		}

		const { name, avatarURL, questions, answers } = user;

		const votes = Object.keys(answers).length;
		const score = this.props.score;

		return (
			<>
				<div className="message-header">
					<p className="is-uppercase">{name}</p>
				</div>
				<div className="box mb-5">
					<article className="media">
						<div className="media-left">
							<figure className="image is-64x64">
								<img
									src={avatarURL}
									alt={`Avatar of ${name}`}
									className="avatar"
								/>
							</figure>
						</div>
						<div className="media-content pr-6">
							<div className="content">
								<div className="field">
									<div className="control">
										<div className="box">
											<div className="level">
												Answered Questions
												<span className="tag is-rounded is-warning level-right">
													{votes}
												</span>
											</div>
										</div>
									</div>
								</div>
								<div className="field">
									<div className="control">
										<div className="box">
											<div className="level">
												Created Questions
												<span className="tag is-rounded is-danger level-right">
													{questions.length}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="media-right pl-4">
							<div className="is-flex is-justify-content-center is-align-items-center score is-flex-direction-column">
								<div className="panel">
									<p className="panel-heading is-size-6">SCORE</p>
									<div className="panel-block">
										{this.props.leaders > this.props.index && (
											<span className="pr-2">
												<BiTrophy />
											</span>
										)}
										<p className="control has-text-centered">
											<span className="tag is-rounded is-success is-large has-text-centered">
												{score}
											</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</article>
				</div>
			</>
		);
	}
}

function mapStateToProps({ users }, { id, index }) {
	const user = users[id];

	return {
		user,
		index,
	};
}

export default connect(mapStateToProps)(User);
