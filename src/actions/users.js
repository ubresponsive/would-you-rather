export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER_VOTE = 'ADD_USER_VOTE';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';

export function receiveUsers(users) {
	return {
		type: RECEIVE_USERS,
		users,
	};
}

function addAnswer({ qid, authedUser, answer }) {
	return {
		type: ADD_USER_VOTE,
		qid,
		authedUser,
		answer,
	};
}

export function handleUserVote(info) {
	return (dispatch) => {
		dispatch(addAnswer(info));
	};
}

function addQuestion(qid, authedUser) {
	return {
		type: ADD_USER_QUESTION,
		qid,
		authedUser,
	};
}

export function handleUserQuestion(qid) {
	return (dispatch, getState) => {
		const { authedUser } = getState();
		console.log(authedUser);
		dispatch(addQuestion(qid, authedUser));
	};
}
