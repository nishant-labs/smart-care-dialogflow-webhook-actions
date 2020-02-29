const { dialogflow } = require('actions-on-google');
const functions = require('firebase-functions');
const { handleConversation } = require('./utils');
const {
	generalResponses,
	simpleResponses,
	questionResponses,
	painResponses
} = require('./responses');

const app = dialogflow({ debug: true });

let previousStatement = {
	response: '',
	params: undefined
};
let previousResponse = {
	response: '',
	params: undefined
};
const {
	hospital,
	accident,
	accidentDispatch,
	defaultResp,
	errorMessage
} = generalResponses;
const {
	policeEmergency,
	lifeThreat,
	houseGasEmergency,
	houseFireEmergency,
	emergency
} = simpleResponses;
const { elaborateMore, askWhenHelpAsked } = questionResponses;
const { bodyPain, acheStomach, acheHead, stomachUpset, defaultMessage } = painResponses;

// id - 9a04bf66-dffd-4d40-bef4-2cb7427f49f9
app.intent('AskForHelp_Emergency', (conversation, parameters) => {
	const {
		hasUsedAskedFor,
		hasUsedAskedForAny,
		queryLower
	} = handleConversation(conversation);
	if (hasUsedAskedForAny(['hospital', 'doctor'])) {
		conversation.ask(hospital);
	} else if (hasUsedAskedForAny(['emergency', 'police'])) {
		conversation.ask(policeEmergency);
	} else if (hasUsedAskedFor('kill')) {
		conversation.ask(lifeThreat);
	} else if (hasUsedAskedForAny(['accident', 'ambulance'])) {
		conversation.ask(accident);
		previousResponse.response = accident;
	} else if (
		previousResponse.response === accident &&
		hasUsedAskedForAny(['location', 'address'])
	) {
		conversation.ask(
			accidentDispatch.replace('$location', parameters.location)
		);
	} else if (hasUsedAskedFor('stroke')) {
		conversation.ask(defaultResp);
	} else {
		conversation.ask(defaultResp);
	}
	previousStatement.response = queryLower;
	previousStatement.params = conversation.parameter;
});

// - 383ca0a7-213f-40e1-ad18-3c6f62c55775
app.intent('AskForHelp_Pain', (conversation, parameters) => {
	const {
		hasUsedAskedFor,
		hasUsedAskedForAny,
		queryLower
	} = handleConversation(conversation);
	if (
		hasUsedAskedForAny(['pain', 'paining']) &&
		hasUsedAskedForAny(['body', 'muscle', 'back'])
	) {
		conversation.ask(bodyPain);
	} else if (
		hasUsedAskedForAny(['ache', 'aching']) &&
		hasUsedAskedFor('stomach')
	) {
		conversation.ask(acheStomach);
	} else if (hasUsedAskedForAny(['abdominal', 'acidity'])) {
		conversation.ask(acheStomach);
	} else if (hasUsedAskedForAny(['head', 'headache'])) {
		conversation.ask(acheHead);
	} else if (hasUsedAskedForAny(['fever', 'temperature'])) {
		conversation.ask(acheHead);
	} else if (hasUsedAskedForAny(['stomach upset', 'loose motion'])) {
		conversation.ask(stomachUpset);
	} else if (
		hasUsedAskedForAny(['nausea', 'vomit', 'pukish', 'puke', 'motion sickness'])
	) {
		conversation.ask(vomit);
	} else {
		conversation.ask(defaultMessage);
	}
	previousStatement.response = queryLower;
	previousStatement.params = conversation.parameter;
});

// id - 123a898c-fa89-4cd7-8cae-7d2d03eec256
app.intent('AskForHelp_HouseholdEmergency', (conversation, parameters) => {
	const { hasUsedAskedFor, queryLower } = handleConversation(conversation);
	if (hasUsedAskedFor('gas')) {
		conversation.ask(houseGasEmergency);
	} else if (hasUsedAskedFor('fire')) {
		conversation.ask(houseFireEmergency);
	} else {
		conversation.ask(emergency);
	}
	previousStatement.response = queryLower;
	previousStatement.params = conversation.parameter;
});

// id - 357c8d7c-848e-4eb5-a277-d71de15b4b38
app.intent('AskForHelp_ExternalFitness', conversation => {
	const { hasUsedAskedFor, queryLower } = handleConversation(conversation);
	conversation.ask('<speak>Checking your google fit. <break time="500ms"/>It looks like your heart rate is too high, Please try to relax yourself and try to take a nap <break strength="weak"/>This will lower your blood pressure</speak>');
	previousStatement.response = queryLower;
	previousStatement.params = conversation.parameter;
});

app.intent('WelcomeQuestions', conversation => {
	const { contexts } = conversation;
	const askContext = contexts.get('context-ask-for-help');
	if (askContext && askContext.parameters.helpAsked) {
		conversation.ask(`Thanks $fullName , Let me see what I can do`);
	} else {
		conversation.ask(`Thanks $fullName , How can I help you?`);
	}
});

app.catch((conversation, error) => {
	console.error(error);
	conversation.ask(errorMessage);
});

exports.yourAction = functions.https.onRequest(app);
