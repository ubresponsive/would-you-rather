import {
	RECEIVE_QUESTIONS,
	ADD_QUESTION_VOTE,
	ADD_QUESTION,
} from '../actions/questions';

export default function questions(state = {}, action) {
	switch (action.type) {
		case RECEIVE_QUESTIONS:
			return {
				...state,
				...action.questions,
			};
		case ADD_QUESTION_VOTE:
			// add new vote
			const addVote = state[action.qid][action.answer].votes.concat([
				action.authedUser,
			]);

			// remove duplicate usernames from new vote array using SET
			const tidyVote = [...new Set(addVote)];

			// get the other question option (used to check for previous answers)
			function getPreviousAnswer() {
				if (action.answer === 'optionOne') {
					return 'optionTwo';
				} else {
					return 'optionOne';
				}
			}

			// user can change answer - now remove user from previous votes array
			function duplicateCheck() {
				if (action.answer !== 'optionOne') {
					return state[action.qid]['optionOne'].votes.filter(
						(uid) => uid !== action.authedUser
					);
				} else if (action.answer !== 'optionTwo') {
					return state[action.qid]['optionTwo'].votes.filter(
						(uid) => uid !== action.authedUser
					);
				}
			}

			// check if the user has already voted on ANY of the questions in current Poll
			const hasVoted =
				state[action.qid][action.answer].votes.includes(action.authedUser) ||
				state[action.qid][getPreviousAnswer()].votes.includes(
					action.authedUser
				);

			// is previousAnswer different to currentAnswer
			const currentAnswer = state[action.qid][action.answer].votes.includes(
				action.authedUser
			);

			// only update the votes if current answer is different to his previous answer
			if (hasVoted === true && currentAnswer === false) {
				// console.log('hasVoted and different from currentAnswer');
				const previousAnswer = getPreviousAnswer();
				return {
					...state,
					[action.qid]: {
						...state[action.qid],
						[action.answer]: {
							...state[action.qid][action.answer],
							votes: tidyVote,
						},
						// has voted - remove username from previous votes array
						[previousAnswer]: {
							...state[action.qid][previousAnswer],
							votes: duplicateCheck(),
						},
					},
				};
			} else {
				return {
					...state,
					[action.qid]: {
						...state[action.qid],
						[action.answer]: {
							...state[action.qid][action.answer],
							votes: tidyVote,
						},
					},
				};
			}

		case ADD_QUESTION:
			const { question } = action;

			return {
				...state,
				[action.question.id]: question,
			};

		default:
			return state;
	}
}
