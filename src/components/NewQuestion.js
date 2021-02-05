import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPoll } from '../actions/shared';
import { toast } from 'react-toastify';

class NewQuestion extends Component {
	state = {
		optionOne: '',
		optionTwo: '',
	};

	handleChange = (option) => (e) => {
		if (option === 'optionOne') {
			const optionOne = e.target.value;

			this.setState(() => ({
				optionOne,
			}));
		} else {
			const optionTwo = e.target.value;

			this.setState(() => ({
				optionTwo,
			}));
		}
	};

	handleCancel = (e) => {
		e.preventDefault();
		this.setState(() => ({
			optionOne: '',
			optionTwo: '',
		}));
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { optionOne, optionTwo } = this.state;
		const { dispatch } = this.props;
		const { authedUser } = this.props;

		dispatch(
			addPoll({
				optionOneText: optionOne,
				optionTwoText: optionTwo,
				author: authedUser,
			})
		);

		this.setState(() => ({
			optionOne: '',
			optionTwo: '',
		}));

		toast('Your poll has been added');
	};

	render() {
		const { optionOne, optionTwo } = this.state;

		return (
			<div className="columns">
				<div className="column is-two-fifths">
					<h1 className="title is-1">Create a New Poll</h1>
					<div className="message-header">
						<p>Add two options for your poll</p>
					</div>
					<div className="card mb-6">
						<div className="card-content">
							<div className="content">
								<form onSubmit={this.handleSubmit} id="voteForm">
									<div className="field">
										<label className="label">Question One</label>
										<div className="control">
											<input
												className="input"
												placeholder="option one question"
												type="text"
												name="optionOne"
												value={optionOne}
												onChange={this.handleChange('optionOne')}
												required
											/>
										</div>
									</div>
									<div className="block has-text-centered mb-0">
										<strong>OR</strong>
									</div>

									<div className="field">
										<label className="label">Question Two</label>
										<div className="control">
											<input
												className="input"
												placeholder="option two question"
												type="text"
												value={optionTwo}
												name="optionTwo"
												onChange={this.handleChange('optionTwo')}
												required
											/>
										</div>
									</div>

									<div className="field is-grouped mt-5">
										<div className="control">
											<button
												className="button is-small is-primary"
												disabled={optionOne === '' || optionTwo === ''}
											>
												Submit
											</button>
										</div>
										<div className="control">
											<button
												className="button is-small is-light cancel"
												onClick={this.handleCancel}
											>
												Cancel
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ authedUser }) {
	return {
		authedUser,
	};
}

export default connect(mapStateToProps)(NewQuestion);
