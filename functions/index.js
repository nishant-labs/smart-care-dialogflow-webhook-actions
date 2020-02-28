const { dialogflow, SimpleResponse } = require('actions-on-google');
const functions = require('firebase-functions');

const app = dialogflow({ debug: true });

let previousStatement = '';
let previousResponse = '';

app.intent('AskForHelp_Emergency', conversation => {
	const { query } = conversation;
	const userAsk = query.toLowerCase();
	if (userAsk.indexOf('hospital') !== -1) {
		conversation.ask(
			'Of course, calling nearby hospital and also trying to arrange an ambulance'
		);
	} else if (
		userAsk.indexOf('emergency') !== -1 ||
		userAsk.indexOf('police') !== -1
	) {
		conversation.ask(
			new SimpleResponse({
				speech: 'Of course, calling 111 to alert emergency services',
				text: 'Calling 999 emergency services'
			})
		);
	} else if (userAsk.indexOf('kill') !== -1) {
		conversation.ask(
			new SimpleResponse({
				speech:
					'Hang on, calling 999 alerting emergency services and police station, in the mean time hide yourself somewhere safe',
				text: 'Calling 999 emergency services'
			})
		);
	} else if (userAsk.indexOf('accident') !== -1) {
		const resp = 'In order to call emergency service I need your location';
		if (previousResponse === resp && (userAsk.indexOf('location') !== -1 || userAsk.indexOf('address') !== -1)) {
			conversation.ask('I am calling emergency service for you at $location');
		} else {
			conversation.ask(resp);
		}
		previousResponse = resp;
	} else {
		conversation.ask('Please elaborate more so that I can help you');
	}
	previousStatement = userAsk;
});

app.intent('AskForHelp_General_QuestionAlreadySet', conversation => {
	const { contexts, query } = conversation;
	const questionContext = contexts.get('asking_for_help_general');
	if (questionContext && questionContext.parameters.fullName) {
		conversation.ask(
			`What happened ${questionContext.parameters.fullName} ? could you please elaborate more!!`
		);
	} else {
		conversation.ask(
			'Of course, but can you answer some questions before I can help you. What is your name?'
		);
	}
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
	conversation.ask('I encountered a glitch. Can you say that again?');
});

exports.yourAction = functions.https.onRequest(app);
