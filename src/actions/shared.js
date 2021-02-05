import { getInitialData, saveQuestion } from '../utils/api';
import {
	receiveUsers,
	handleUserQuestion,
	handleUserVote,
} from '../actions/users';
import {
	receiveQuestions,
	handleAddQuestion,
	handleQuestionVote,
} from '../actions/questions';
import { setAuthedUser } from '../actions/authedUser';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

let AUTHED_ID = false;

// add logged in user as AUTHED_ID
export function addAuthedUser(AUTHED_ID) {
	return (dispatch) => {
		dispatch(setAuthedUser(AUTHED_ID.authedUser));
	};
}

// log user out
export function logoutUser() {
	return (dispatch) => {
		dispatch(setAuthedUser(false));
	};
}

// get data from database
export function handleInitialData() {
	return (dispatch) => {
		dispatch(showLoading());
		return getInitialData().then(({ users, questions }) => {
			dispatch(setAuthedUser(AUTHED_ID));
			dispatch(receiveUsers(users));
			dispatch(receiveQuestions(questions));
			dispatch(hideLoading());
		});
	};
}

// Add a new poll to the user and question actions
export function addPoll(question) {
	return (dispatch) => {
		return saveQuestion(question).then((res) => {
			dispatch(handleAddQuestion(res));
			dispatch(handleUserQuestion(res.id));
		});
	};
}

// add votes to the user and question actions
export function addVote(info) {
	return (dispatch) => {
		dispatch(handleQuestionVote(info));
		dispatch(handleUserVote(info));
	};
}
