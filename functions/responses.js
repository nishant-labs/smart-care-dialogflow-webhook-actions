const { SimpleResponse } = require('actions-on-google');

exports.simpleResponses = {
	policeEmergency: new SimpleResponse({
		speech: 'Of course, calling 111 to alert emergency services',
		text: 'Calling 111 emergency services'
	}),
	healthEmergency: new SimpleResponse({
		speech: 'Hold on, calling 666 emergency services and alerting hospital about your arrival',
		text: 'Calling 666 emergency services'
	}),
	lifeThreat: new SimpleResponse({
		speech:
			'Hang on, calling 999 alerting emergency services and police station, in the mean time hide yourself somewhere safe',
		text: 'Calling 999 emergency services'
	}),
	houseGasEmergency: new SimpleResponse({
		speech:
			'Please turn off gas supply at meter first and do not switch on any light or light on any fire, also do open all windows to air out the room. Calling 999 emergency services on your behalf',
		text: 'Calling 999 emergency services'
	}),
	houseFireEmergency: new SimpleResponse({
		speech:
			'Please leave your house immediately. Calling 999 emergency services on your behalf',
		text: 'Please leave your house immediately. Calling 999 emergency services'
	}),
	emergency: 'Calling 999 emergency services on your behalf',
};

exports.generalResponses = {
	hospital:
		'Of course, calling nearby hospital and also trying to arrange an ambulance',
	accident: 'In order to call emergency service I need your location',
	accidentDispatch: 'I am calling emergency service for you at $location',
	defaultResp: 'Please elaborate more so that I can help you',
	errorMessage:
		'I encountered a glitch. we at smart care are continuously enhancing ourself, we will try to fix this as soon as possible, Can you please use other services?'
};

exports.questionResponses = {
	elaborateMore: `What happened $fullName ? could you please elaborate more!`,
	askWhenHelpAsked:
		'Of course, but can you answer some questions before I can help you. What is your name?'
};

exports.painResponses = {
	bodyPain: 'Apply ointment like Volini or deep heat and take some rest. if pain is unbearable then take pain reliever such as Ibuprofen',
	acheStomach: 'Take lot of water, you can also take Gelusil/Eno',
	acheHead: 'Please try relax yourself and take Aspirin or Morphine if needed',
	fever: 'Please take paracetamol to lower your temperature and take rest',
	stomachUpset: 'Please have some lemon ginger juice and plenty of water to avoid dehydration. If needed take loperamide',
	vomit: 'Sit down and take deep breath and take Cyclizine medicine if needed which will help you stop feeling being sick',
	defaultMessage: 'I am not able to help you at this moment could you please check with your GP',
};
