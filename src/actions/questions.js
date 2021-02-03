export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION_VOTE = 'ADD_QUESTION_VOTE';
export const ADD_QUESTION = 'ADD QUESTION';

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	};
}

function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question,
	};
}

export function handleAddQuestion(question) {
	return (dispatch) => {
		dispatch(addQuestion(question));
	};
}

function addQuestionVote({ qid, authedUser, answer }) {
	return {
		type: ADD_QUESTION_VOTE,
		qid,
		authedUser,
		answer,
	};
}

export function handleQuestionVote(info) {
	return (dispatch) => {
		dispatch(addQuestionVote(info));
	};
}
