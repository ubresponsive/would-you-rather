export function formatQuestion(question, author, authedUser) {
	const { id, timestamp, optionOne, optionTwo } = question;
	const { name, avatarURL } = author;

	let hasVoted;

	question.optionOne.votes.includes(authedUser)
		? (hasVoted = true)
		: question.optionTwo.votes.includes(authedUser)
		? (hasVoted = true)
		: (hasVoted = false);

	return {
		name,
		id,
		timestamp,
		optionOne,
		optionTwo,
		avatar: avatarURL,
		hasVoted: hasVoted,
	};
}
