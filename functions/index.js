const { dialogflow } = require('actions-on-google');
const functions = require('firebase-functions');

const app = dialogflow({ debug: true });

app.intent('Default Welcome Intent', conversation => {
	conversation.close('Hello, World!');
	// Complete your fulfillment logic and
	// send a response when the function is done executing
});

exports.yourAction = functions.https.onRequest(app);
