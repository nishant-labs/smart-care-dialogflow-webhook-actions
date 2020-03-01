const hasUsedAskedFor = queryLower => userHasAsk =>
	queryLower.indexOf(userHasAsk) !== -1;

const hasUsedAskedForAny = queryLower => userHasAskList =>
	userHasAskList.some(userHasAsk => queryLower.indexOf(userHasAsk) !== -1);

exports.handleConversation = conversation => {
	const { query } = conversation;
	const queryLower = query.toLowerCase();
	return {
		hasUsedAskedFor: hasUsedAskedFor(queryLower),
		hasUsedAskedForAny: hasUsedAskedForAny(queryLower),
		queryLower
	};
};
