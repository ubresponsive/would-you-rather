import {
	RECEIVE_USERS,
	ADD_USER_VOTE,
	ADD_USER_QUESTION,
} from '../actions/users';

export default function users(state = {}, action) {
	switch (action.type) {
		case RECEIVE_USERS:
			return {
				...state,
				...action.users,
			};
		case ADD_USER_VOTE:
			const answers = state[action.authedUser].answers;
			return {
				...state,
				[action.authedUser]: {
					...state[action.authedUser],
					answers: Object.assign(answers, { [action.qid]: action.answer }),
				},
			};
		case ADD_USER_QUESTION:
			const questions = state[action.authedUser].questions;
			return {
				...state,
				[action.authedUser]: {
					...state[action.authedUser],
					questions: questions.concat([action.qid]),
				},
			};

		default:
			return state;
	}
}
