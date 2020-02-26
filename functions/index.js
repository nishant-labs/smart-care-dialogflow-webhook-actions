const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');

const app = dialogflow({debug: true});

app.intent('AskForHelp_General', (conversation) => {
  const {contexts} = conversation;
  const questionContext = contexts.get('context-welcome-question');
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

app.intent('WelcomeQuestions', (conversation) => {
  const {contexts} = conversation;
  const askContext = contexts.get('context-ask-for-help');
  if (askContext && askContext.parameters.helpAsked) {
    conversation.ask(
        `Thanks $fullName , Let me see what I can do`
    );
  } else {
    conversation.ask(`Thanks $fullName , How can I help you?`);
  }
});

app.catch((conversation, error) => {
  console.error(error);
  conversation.ask('I encountered a glitch. Can you say that again?');
});

exports.yourAction = functions.https.onRequest(app);
