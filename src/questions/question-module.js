const QuestionAbstract = function(obj) {
	this.answerType = obj.answerType;
	this.questionURI = obj.questionURI;
	this.questionCode = obj.questionCode;
	this.question = obj.question;
	this.description = obj.description;
	this.answer = obj.answer;
	this.answerInstanceURI = obj.answerInstanceURI;
	this.followupType = obj.followupType;
	this.isQuestionRequired = obj.isQuestionRequired;
	this.questionObject = obj.questionObject;
	this.answerObject = obj.answerObject;
	this.answerInstanceObject = obj.answerInstanceObject;
	this.questionInstanceObject = obj.questionInstanceObject;
	this.questionDependencyPairs = obj.questionDependencyPairs;
	this.groupInstanceWidget = obj.groupInstanceWidget;

	this.answerInstance = obj.answerInstanceObject;

	this.dom = null;
	this.isHorizontalAnswerFollowUpTypeOpen = false;
	this.isEditMode = false;
	this.isParentReadOnly = false;
	this.isParentHiddenInGroupDisplay = false;

	// sometimes we will need to go to a page that is specified to the instance itself.
	// this property will indicate the prefix to the instance page.
	this.answerInstanceDetailsURLPrefix = obj.answerInstanceDetailsURLPrefix;

	// if true, will not affected by the outside edit button.
	this.isInsideMediaRow = false;

	// this will always return true;
	this.validator = new AlwaysValidValidator();
	this.registeredValidator = obj.registeredValidator;

	// when isSuppressEmptyAnswerValues is true, hide the question in view mode and show in edit mode.
	// when isSuppressEmptyAnswerValues is true, should not show a question when it is readonly and has no value in edit mode.
	this.isSuppressEmptyAnswerValues = obj.isSuppressEmptyAnswerValues;
}

QuestionAbstract.TYPE_GROUP = 'http://vital.ai/ontology/haley-ai-question#HaleyGroup';
QuestionAbstract.TYPE_GROUP_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyGroupInstance';
QuestionAbstract.TYPE_SECTION = 'http://vital.ai/ontology/haley-ai-question#HaleySection';
QuestionAbstract.TYPE_SECTION_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleySectionInstance';
QuestionAbstract.TYPE_ROW = 'http://vital.ai/ontology/haley-ai-question#HaleyRow';
QuestionAbstract.TYPE_ROW_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyRowInstance';
QuestionAbstract.TYPE_BOOLEAN_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyBooleanAnswer';
QuestionAbstract.TYPE_CHOICE_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyChoiceAnswer';
QuestionAbstract.TYPE_DATE_TIME_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyDateTimeAnswer';
QuestionAbstract.TYPE_FILE_UPLOAD_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyFileUploadAnswer';
QuestionAbstract.TYPE_FRAME_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyFrameAnswer';
QuestionAbstract.TYPE_LONG_TEXT_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyLongTextAnswer';
QuestionAbstract.TYPE_MULTY_CHOICE_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyMultiChoiceAnswer';
QuestionAbstract.TYPE_NUMBER_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyNumberAnswer';
QuestionAbstract.TYPE_SIGNATURE_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleySignatureAnswer';
QuestionAbstract.TYPE_TEXT_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer';

QuestionAbstract.TYPE_BOOLEAN_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyBooleanAnswerInstance';
QuestionAbstract.TYPE_CHOICE_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyChoiceAnswerInstance';
QuestionAbstract.TYPE_DATE_TIME_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyDateTimeAnswerInstance';
QuestionAbstract.TYPE_FILE_UPLOAD_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyFileUploadAnswerInstance';
QuestionAbstract.TYPE_FRAME_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyFrameAnswerInstance';
QuestionAbstract.TYPE_LONG_TEXT_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyLongTextAnswerInstance';
QuestionAbstract.TYPE_MULTY_CHOICE_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyMultiChoiceAnswerInstance';
QuestionAbstract.TYPE_NUMBER_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyNumberAnswerInstance';
QuestionAbstract.TYPE_SIGNATURE_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleySignatureAnswerInstance';
QuestionAbstract.TYPE_TEXT_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance';

QuestionAbstract.TYPE_QUESTION = 'http://vital.ai/ontology/haley-ai-question#HaleyQuestion';
QuestionAbstract.TYPE_QUESTION_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance';

QuestionAbstract.TYPE_EDGE_HAS_SECTION = 'http://vital.ai/ontology/haley-ai-question#Edge_hasSection';
QuestionAbstract.TYPE_EDGE_HAS_SECTION_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#Edge_hasSectionInstance';

QuestionAbstract.TYPE_EDGE_HAS_ROW = 'http://vital.ai/ontology/haley-ai-question#Edge_hasRow';
QuestionAbstract.TYPE_EDGE_HAS_ROW_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance';

QuestionAbstract.TYPE_EDGE_HAS_QUESTION = 'http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion';
QuestionAbstract.TYPE_EDGE_HAS_QUESTION_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance';

QuestionAbstract.TYPE_EDGE_HAS_ANSWER = 'http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer';
QuestionAbstract.TYPE_EDGE_HAS_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance';

QuestionAbstract.PROPERTY_HALEY_ANSWER = 'haleyAnswer';
QuestionAbstract.PROPERTY_HALEY_QUESTION = 'haleyQuestion';


QuestionAbstract.createQuestion = function(obj) {
	switch (obj.answerType) {
		case 'HaleyTextAnswer':
			return new QuestionText(obj);
		case 'HaleyBooleanAnswer':
			return new QuestionBoolean(obj);
		case 'HaleyChoiceAnswer':
			return new QuestionChoice(obj);
		case 'HaleyDateTimeAnswer':
			return new QuestionDateTime(obj);
		case 'HaleyFrameAnswer':
			return new QuestionFrame(obj);
		case 'HaleyFileUploadAnswer':
			return new QuestionFileUpload(obj);
		case 'HaleyLongTextAnswer':
			return new QuestionLongText(obj);
		case 'HaleyNumberAnswer':
			return new QuestionNumber(obj);
		case 'HaleyMultiChoiceAnswer':
			return new QuestionMultiChoice(obj);
		case 'HaleySignatureAnswer':
			return new QuestionSignature(obj);
		case 'HaleyTaxonomyAnswer':
			return new QuestionTaxonomy(obj);
		case 'HaleyMultiTaxonomyAnswer':
			return new QuestionMultiTaxonomy(obj);
		case "Hidden":
			return new QuestionHidden(obj);

		default:
			console.error("No such questionType exists", obj.type);
	}
}


// Checking whether a input will trigger its dependency
QuestionAbstract.isAnswerTriggerDependency = function(answer, answerValue, answerDependency) {
	// HaleyAnswer Object
	// input value from the user
	// answerDependency object
	// if the answerValue paired with the trigger value on answerDependency, then return true to trigger the dependency

	if(!answer && !answerDependency) {
		console.error("Wrong Arguments", answer, answerValue, answerDependency);
	}

	if(answerDependency.type !== 'http://vital.ai/ontology/haley-ai-question#HaleyAnswerDependency') {
		console.warn('The detected answer dependency is not in type: http://vital.ai/ontology/haley-ai-question#HaleyAnswerDependency', answerDependency);
		return;
	}

	var comparator = answerDependency.get('haleyAnswerConstraintComparatorURI');

	var type = answer.type;

	switch(type) {
		case 'http://vital.ai/ontology/haley-ai-question#HaleyBooleanAnswer':
			if(comparator === 'http://vital.ai/ontology/haley-ai-question#NotEqualToComparator') {
				return answerValue !== answerDependency.get('booleanAnswerValue');
			};
			return answerValue === answerDependency.get('booleanAnswerValue');
		case 'http://vital.ai/ontology/haley-ai-question#HaleyChoiceAnswer':
			if(comparator === 'http://vital.ai/ontology/haley-ai-question#NotEqualToComparator') {
				return answerValue !== answerDependency.get('choiceAnswerValue');
			};
			return answerValue === answerDependency.get('choiceAnswerValue');
		case 'http://vital.ai/ontology/haley-ai-question#HaleyDateTimeAnswer':
			if(comparator === 'http://vital.ai/ontology/haley-ai-question#NotEqualToComparator') {
				return answerValue !== answerDependency.get('dateTimeAnswerValue');
			};
			return answerValue === answerDependency.get('dateTimeAnswerValue');
		case 'http://vital.ai/ontology/haley-ai-question#HaleyLongTextAnswer':
			if(comparator === 'http://vital.ai/ontology/haley-ai-question#NotEqualToComparator') {
				return answerValue !== answerDependency.get('longTextAnswerValue');
			};
			return answerValue === answerDependency.get('longTextAnswerValue');
		case 'http://vital.ai/ontology/haley-ai-question#HaleyMultiChoiceAnswer':
			if(comparator === 'http://vital.ai/ontology/haley-ai-question#NotEqualToComparator') {
				return !_.isEqual(answerValue, answerDependency.get('multiChoiceAnswerValue'));
			};
			return _.isEqual(answerValue === answerDependency.get('multiChoiceAnswerValue'));
		case 'http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer':
			if (answerDependency.type === 'http://vital.ai/ontology/haley-ai-question#HaleyAnswerDependency') {
				var comparator = answerDependency.get('haleyAnswerConstraintComparatorURI');
				if(comparator === 'http://vital.ai/ontology/haley-ai-question#NotEqualToComparator') {
					if(answerValue !== answerDependency.get('textAnswerValue')) return true;
				} else {
					if(answerValue === answerDependency.get('textAnswerValue')) return true;
				}
			} else {
				if(answerValue === answerDependency.get('textAnswerValue')) return true;
			}
		case 'http://vital.ai/ontology/haley-ai-question#HaleyNumberAnswer':
			if (answerDependency.type === 'http://vital.ai/ontology/haley-ai-question#HaleyAnswerDependency') {
				var comparator = answerDependency.get('haleyAnswerConstraintComparatorURI');
				switch(comparator) {
					case 'http://vital.ai/ontology/haley-ai-question#GreaterThanComparator':
						if(answerValue !== null && answerDependency.get('integerAnswerValue') !== undefined && answerValue > answerDependency.get('integerAnswerValue')) return true;
						if(answerValue !== null && answerDependency.get('doubleAnswerValue') !== undefined && answerValue > answerDependency.get('doubleAnswerValue')) return true;
						break;
					case 'http://vital.ai/ontology/haley-ai-question#GreaterThanOrEqualToComparator':
						if(answerValue !== null && answerDependency.get('integerAnswerValue') !== undefined && answerValue >= answerDependency.get('integerAnswerValue')) return true;
						if(answerValue !== null && answerDependency.get('doubleAnswerValue') !== undefined && answerValue >= answerDependency.get('doubleAnswerValue')) return true;
						break;
					case 'http://vital.ai/ontology/haley-ai-question#LessThanComparator':
						if(answerValue !== null && answerDependency.get('integerAnswerValue') !== undefined && answerValue < answerDependency.get('integerAnswerValue')) return true;
						if(answerValue !== null && answerDependency.get('doubleAnswerValue') !== undefined && answerValue < answerDependency.get('doubleAnswerValue')) return true;
						break;
					case 'http://vital.ai/ontology/haley-ai-question#LessThanOrEqualToComparator':
						if(answerValue !== null && answerDependency.get('integerAnswerValue') !== undefined && answerValue <= answerDependency.get('integerAnswerValue')) return true;
						if(answerValue !== null && answerDependency.get('doubleAnswerValue') !== undefined && answerValue <= answerDependency.get('doubleAnswerValue')) return true;
						break;
					case 'http://vital.ai/ontology/haley-ai-question#NotEqualToComparator':
						if(answerValue !== null && answerDependency.get('integerAnswerValue') !== undefined && answerValue !== answerDependency.get('integerAnswerValue')) return true;
						if(answerValue !== null && answerDependency.get('doubleAnswerValue') !== undefined && parseFloat(answerValue) !== parseFloat(answerDependency.get('doubleAnswerValue'))) return true;
						break;
					default:
						if(answerValue !== null && answerDependency.get('integerAnswerValue') !== undefined && answerValue === answerDependency.get('integerAnswerValue')) return true;
						if(answerValue !== null && answerDependency.get('doubleAnswerValue') !== undefined && answerValue === answerDependency.get('doubleAnswerValue')) return true;
						break;
				}
			}
			
			break;
		default:
			console.error("This type is not supported for dependencies", type);
			break;
	}

	return false;

}


QuestionAbstract.toFollowUpTypeHTML = function(answerInstanceURI, followupType) {

	var data = {
		answerInstanceURI: answerInstanceURI,
		firmAnswer: false,
		noAnswer: false,
		notRequired: false,
		pending: false,
		review: false,
		resolved: false
	}

	switch(followupType) {
		case 'http://vital.ai/ontology/haley-ai-question#AnswerFollowup_FIRM_ANSWER': 
			data.firmAnswer = true;
			break;
		case 'http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NOT_REQUIRED':
			data.notRequired = true;
			break;
		case 'http://vital.ai/ontology/haley-ai-question#AnswerFollowup_PENDING':
			data.pending = true;
			break;
		case 'http://vital.ai/ontology/haley-ai-question#AnswerFollowup_REVIEW':
			data.review = true;
			break;
		case 'http://vital.ai/ontology/haley-ai-question#AnswerFollowup_RESOLVED':
			data.resolved = true;
			break;
		default:
			data.noAnswer = true;
	}

	var t = JST["templates/giw/answer-followup-type.hbs"];

	return t(data);

}


QuestionAbstract.prototype.getAnswerURI = function() {
	return this.answerObject.URI;
}


QuestionAbstract.prototype.getAnswerObject = function() {
	return this.answerObject;
}


QuestionAbstract.prototype.getAnswerType = function() {
	return this.answerType;
}

QuestionAbstract.prototype.getAnswerFollupType = function() {
	return this.answerInstanceObject.get('haleyAnswerFollowupType');
}


QuestionAbstract.prototype.getAnswerInstance = function() {
	return this.answerInstanceObject;
}


QuestionAbstract.prototype.getQuestionInstance = function() {
	return this.questionInstanceObject;
}

QuestionAbstract.prototype.setDom = function(dom) {
	this.dom = dom
}


QuestionAbstract.prototype.isInputEqualsToAnswerInstanceValue = function() {
	return this.getInputValue() === this.getAnswerInstanceValue();
}


QuestionAbstract.prototype.isFirmOrResolved = function(dom) {

	var isFirmOrResolved = false;

	var d = dom || this.dom;

	d.find('.answer-follow-type').each(function(e) {
		if($(this).is(':checked')) {
			var value = $(this).val()
			if(value === 'http://vital.ai/ontology/haley-ai-question#AnswerFollowup_FIRM_ANSWER') {
				isFirmOrResolved = true;
			}

			if(value === 'http://vital.ai/ontology/haley-ai-question#AnswerFollowup_RESOLVED') {
				isFirmOrResolved = true;
			}
		}
	})

	return isFirmOrResolved;
}



// override this function to initialize the dom if neccessary (fileupload, ...);
QuestionAbstract.prototype.render = function() {}



QuestionAbstract.prototype.getFullQuestion = function(questionCode) {
	console.error("Overide Me");
}


QuestionAbstract.prototype.toHTML = function() {
	console.error("Overide Me");
}


QuestionAbstract.prototype.enabledAllOptions = function() {
	// console.error("Overide Me");
}


QuestionAbstract.prototype.getAnswerInstanceValue = function() {
	console.error("Overide me");
}


QuestionAbstract.prototype.getInputValue = function() {
	console.error("Overide Me");
}


QuestionAbstract.prototype.setAnswerValueToDefault = function(defaultAnswer) {
	console.error("Overide Me");
}


QuestionAbstract.prototype.updateDomValueAccordingToAnswerInstance = function() {
	console.error("Overide Me");
}


QuestionAbstract.prototype.updateThisInputValue = function(answerInstance, dom) {
	console.error("Overide Me");
}


QuestionAbstract.prototype.setAnswerToNone = function() {
	console.error('Please Override This Function');
}

QuestionAbstract.prototype.clearInput = function() {
	console.error("Please Overide Me");
}


QuestionAbstract.prototype.getSelectedAnswerFollowupType = function() {
	return this.dom.find('input.answer-follow-type:checked').val();
}


QuestionAbstract.prototype.toHorizontalHTML = function() {
	var data = {
		answerInstanceURI: this.answerInstanceURI,
		value: this.getAnswerInstanceValue()
	}

	var t = JST["templates/giw/question-abstract-horizontal-html.hbs"]
	return t(data);
}


QuestionAbstract.prototype.isAnswerCalculatedOrReadOnly = function() {
	return this.answerObject.get('calculatedAnswerValue') 
			|| this.answerObject.get('readOnlyAnswerValue') 
			|| this.answerInstanceObject.get('readOnlyAnswerValue')
			|| this.isParentReadOnly;
}

QuestionAbstract.prototype.isHiddenInGroupDisplay = function() {
	return this.questionObject.get('hiddenInGroupDisplay') || this.questionInstanceObject.get('hiddenInGroupDisplay');
}


QuestionAbstract.prototype.showQuestion = function() {
	if(this.isHiddenInGroupDisplay()) return;

	this.dom.show();
}

QuestionAbstract.prototype.hideQuestion = function() {
	this.dom.hide();
}


QuestionAbstract.prototype.toEditMode = function() {
	if(!this.dom) {
		return;
	}

	if(this.isSuppressEmptyAnswerValues && this.isInputEmpty()) {
		if (this.isAnswerCalculatedOrReadOnly()) {
			this.dom.hide();
		} else {
			this.dom.show();
		}
	}

	if(this.isAnswerCalculatedOrReadOnly() || this.isParentReadOnly || this.isParentHiddenInGroupDisplay) {
		return;
	}

	this.isEditMode = true;

	this.dom.find('input').prop('disabled', false);
}


QuestionAbstract.prototype.toDisableMode = function() {
	if(!this.dom) {
		return;
	}

	this.isEditMode = false;

	this.dom.find('input').prop('disabled', true);

	if(this.isSuppressEmptyAnswerValues && this.isInputEmpty()) {
		this.dom.hide();
	}
}

QuestionAbstract.prototype.cancelChanged = function() {
	this.dom.html(this.toHTML());
	this.toDisableMode();
}

// this.answer will be the value that currently in the server.
QuestionAbstract.prototype.updateDefaultAnswerToCurentInput = function() {
	this.answer = this.getAnswerInstanceValue();
}

QuestionAbstract.prototype.getErrorMessageDom = function() {
	return this.dom.find('.giw-input-error-partial');
}

QuestionAbstract.prototype.isValid = function() {
	if(this.isQuestionRequired && this.isInputEmpty()) return false;

	if(this.registeredValidator) {
		return this.registeredValidator.validator(this.getInputValue());
	}

	var inputValue = this.dom.find('input[type="text"]').val();
	return this.validator.isValid(inputValue);
}

QuestionAbstract.prototype.errorMessage = function() {
	if (this.registeredValidator) return this.registeredValidator.errorMessage;
	return this.validator.errorMessage;
}

QuestionAbstract.prototype.isInputEmpty = function() {
	var value = this.getInputValue();
	return value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0);
}

QuestionAbstract.prototype.triggerValidation = function() {
	if(this.isQuestionRequired && this.isInputEmpty()) {
		renderTemplate(this.getErrorMessageDom(), 'templates/components-widget/error-icon-message-partial.hbs', { isValid: false, message: 'This field is required' });
		return;
	}
	renderTemplate(this.getErrorMessageDom(), 'templates/components-widget/error-icon-message-partial.hbs', { isValid: this.isValid(), message: this.errorMessage() });
}


// Handle Question That is suppose to Hide Themselves.
QuestionHidden = function(obj) {
	QuestionAbstract.call(this, obj);
}

QuestionHidden.prototype = Object.create(QuestionAbstract.prototype);
QuestionHidden.prototype.constructor = QuestionHidden;

QuestionHidden.prototype.toHTML = function() {
	return "";
}


QuestionNumber = function(obj) {
	QuestionAbstract.call(this, obj);
	var answer = obj.answerObject;
	var answerDataType = answer.get('haleyAnswerDataType');
	if(answerDataType === 'http://vital.ai/ontology/haley-ai-question#HaleyIntegerDataType') {
		this.validator = new IntegerNumberValidator();
	} else {
		this.validator = new DoubleNumberValidator();
	}
}

QuestionNumber.prototype = Object.create(QuestionAbstract.prototype);
QuestionNumber.prototype.constructor = QuestionNumber;

QuestionNumber.prototype.toHTML = function() {

	var data = {
		answerInstanceURI: this.answerInstanceURI,
		question: this.question,
		isQuestionRequired: this.isQuestionRequired,
		followUpTypeHTML: QuestionAbstract.toFollowUpTypeHTML(this.answerInstanceURI, this.followupType),
		description: this.description,
		additionalStyleClasses: this.isHiddenInGroupDisplay() ? 'hidden-in-group-display': ''
	}

	var t =  JST["templates/giw/question-number.hbs"];

	return t(data);
}

QuestionNumber.prototype.toHorizontalHTML = function() {
	var isNotDisplay = this.notDisplay;

	var data = {
		isNotDisplay: isNotDisplay,
		answerInstanceURI: this.answerInstanceURI,
		answer: this.getAnswerInstanceValue()
	}

	var t = JST["templates/giw/question-number-horizontal.hbs"];

	return t(data) || '';
}

QuestionNumber.prototype.numberWithCommas = function(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

QuestionNumber.prototype.render = function() {
	var stringValue = (this.answer !== null && this.answer !== undefined && this.answer !== '') ? this.numberWithCommas(this.answer) : '';
	this.dom.find('input[type="text"]').val(stringValue);
	var answerDataType = this.answerObject.get('haleyAnswerDataType');
	if(answerDataType === 'http://vital.ai/ontology/haley-ai-question#HaleyCurrencyDataType') {
		this.dom.find('.form-group-input-content').addClass('question-module-currency').addClass('question-module-dollar-currency');
	}
}

QuestionNumber.prototype.getInputValue = function() {
	if(!this.dom) {
		console.error("Should Initalize the dom before using this function");
	}

	var value = this.dom.find('input[type="text"]').val();

	if(value === '' || value === undefined) return null;

	return Number(value.replace(/^\$/, '').replace(/\,/g, ''));

}


QuestionNumber.prototype.getAnswerInstanceValue = function() {
	return this.answerInstanceObject.get('integerAnswerValue') || this.answerInstanceObject.get('doubleAnswerValue');
}

QuestionNumber.prototype.updateThisInputValue = function() {
	var answerDataType = this.answerObject.get('haleyAnswerDataType');
	if(answerDataType === 'http://vital.ai/ontology/haley-ai-question#HaleyIntegerDataType') {
		this.answerInstanceObject.set('integerAnswerValue', this.getInputValue());
	} else {
		this.answerInstanceObject.set('doubleAnswerValue', this.getInputValue());
	}
}


QuestionNumber.prototype.setAnswerToNone = function() {
	var answer = this.answerObject;
	var answerDataType = answer.get('haleyAnswerDataType');
	if(answerDataType === 'http://vital.ai/ontology/haley-ai-question#HaleyIntegerDataType') {
		this.answerInstanceObject.set('integerAnswerValue', null);
	} else {
		this.answerInstanceObject.set('doubleAnswerValue', null);
	}
}


QuestionNumber.prototype.clearInput = function() {
	this.dom.find('input[answer-type="HaleyNumberAnswer"]').val('');
}


QuestionText = function(obj) {
	QuestionAbstract.call(this, obj);
	var answer = obj.answerObject;
	var answerDataType = answer.get('haleyAnswerDataType');
	if(answerDataType === 'http://vital.ai/ontology/haley-ai-question#HaleyEmailAddressDataType') {
		this.validator = new EmailFormatValidator();
	}

	if(answerDataType === 'http://vital.ai/ontology/haley-ai-question#HaleyTelephoneDataType') {
		this.validator = new TelephoneValidator();
	}
}

QuestionText.prototype = Object.create(QuestionAbstract.prototype);
QuestionText.prototype.constructor = QuestionText;

QuestionText.PROPERTY_VALUE = 'textAnswerValue';

QuestionText.prototype.toHTML = function() {

	var data = {
		answerInstanceURI: this.answerInstanceURI,
		question: this.question,
		answer: this.answer,
		isQuestionRequired: this.isQuestionRequired,
		followUpTypeHTML: QuestionAbstract.toFollowUpTypeHTML(this.answerInstanceURI, this.followupType),
		description: this.description,
		additionalStyleClasses: this.isHiddenInGroupDisplay() ? 'hidden-in-group-display': ''
	}

	var t =  JST["templates/giw/question-text.hbs"];

	return t(data);

}

QuestionText.prototype.toHorizontalHTML = function() {
	var isNotDisplay = this.notDisplay;

	var data = {
		isNotDisplay: isNotDisplay,
		answerInstanceURI: this.answerInstanceURI,
		answer: this.getAnswerInstanceValue()
	}

	var t = JST["templates/giw/question-text-horizontal.hbs"];

	return t(data) || '';
}




QuestionText.prototype.getInputValue = function() {
	if(!this.dom) {
		console.error("Should Initalize the dom before using this function");
	}

	return this.dom.find('input[answer-type]').val();
}


QuestionText.prototype.getAnswerInstanceValue = function() {
	return this.answerInstanceObject.get('textAnswerValue');
}


QuestionText.prototype.updateThisInputValue = function() {
	var dom = this.dom.find('input[type="text"]');
	this.answerInstanceObject.set('textAnswerValue', dom.val())
}


QuestionText.prototype.setAnswerToNone = function() {
	this.answerInstanceObject.set('textAnswerValue', null);
}

QuestionText.prototype.clearInput = function() {
	this.dom.find('input[answer-type="HaleyTextAnswer"]').val('');
}


QuestionSignature = function(obj) {
	QuestionAbstract.call(this, obj);
}

QuestionSignature.prototype = Object.create(QuestionAbstract.prototype);
QuestionSignature.prototype.constructor = QuestionSignature;

QuestionSignature.prototype.toHTML = function() {
	QuestionText.prototype.toHTML.call(this);
}

QuestionSignature.prototype.getInputValue = function() {
	if(!this.dom) {
		console.error("Should Initalize the dom before using this function");
	}

	return this.dom.find('input').val();
}


QuestionSignature.prototype.getAnswerInstanceValue = function() {
	return this.answerInstanceObject.get('signatureAnswerValue');
}


QuestionSignature.prototype.toEditMode = function() {
	if(!this.dom) {
		return;
	}

	if(this.isSuppressEmptyAnswerValues && this.isInputEmpty()) {
		if (this.isAnswerCalculatedOrReadOnly()) {
			this.dom.hide();
		} else {
			this.dom.show();
		}
	}

	this.isEditMode = true;

}

QuestionSignature.prototype.toDisableMode = function() {
	if(!this.dom) {
		return;
	}

	this.isEditMode = false;

	if(this.isSuppressEmptyAnswerValues && this.isInputEmpty()) {
		this.dom.hide();
	}
}

QuestionSignature.prototype.updateThisInputValue = function() {
	var dom = this.dom.find('input[type="text"]');
	this.answerInstanceObject.set('signatureAnswerValue', dom.val())
}


QuestionSignature.prototype.setAnswerToNone = function() {
	this.answerInstanceObject.set('signatureAnswerValue', null)
}


QuestionSignature.prototype.clearInput = function() {
	this.dom.find('input[answer-type="HaleySignatureAnswer"]').val('');
}



QuestionLongText = function(obj) {
	QuestionAbstract.call(this, obj);
}

QuestionLongText.prototype = Object.create(QuestionAbstract.prototype);
QuestionLongText.prototype.constructor = QuestionLongText;

QuestionLongText.prototype.toHTML = function() {

	var data = {
		answerInstanceURI: this.answerInstanceURI,
		question: this.question,
		answer: this.answer,
		isQuestionRequired: this.isQuestionRequired,
		followUpTypeHTML: QuestionAbstract.toFollowUpTypeHTML(this.answerInstanceURI, this.followupType),
		description: this.description,
		additionalStyleClasses: this.isHiddenInGroupDisplay() ? 'hidden-in-group-display': ''
	}

	var t =  JST["templates/giw/question-long-text.hbs"];

	return t(data);
}

QuestionLongText.prototype.getInputValue = function() {
	if(!this.dom) {
		console.error("Should Initalize the dom before using this function");
	}

	return this.dom.find('textarea').val();
}


QuestionLongText.prototype.getAnswerInstanceValue = function() {
	this.answerInstanceObject.get('longTextAnswerValue');
}



QuestionLongText.prototype.toEditMode = function() {
	if(!this.dom) {
		return;
	}

	if(this.isSuppressEmptyAnswerValues && this.isInputEmpty()) {
		if (this.isAnswerCalculatedOrReadOnly()) {
			this.dom.hide();
		} else {
			this.dom.show();
		}
	}

	if(this.isAnswerCalculatedOrReadOnly()) {
		return;
	}

	this.isEditMode = true;

	this.dom.find('input').prop('disabled', false);
	this.dom.find('textarea').prop('disabled', false);

}

QuestionLongText.prototype.toDisableMode = function() {
	if(!this.dom) {
		return;
	}

	this.isEditMode = false;

	this.dom.find('input').prop('disabled', true);
	this.dom.find('textarea').prop('disabled', true);

	if(this.isSuppressEmptyAnswerValues && this.isInputEmpty()) {
		this.dom.hide();
	}
}

QuestionLongText.prototype.updateThisInputValue = function() {
	var dom = this.dom.find('textarea');
	this.answerInstanceObject.set('longTextAnswerValue', dom.val())
}


QuestionLongText.prototype.setAnswerToNone = function() {
	this.answerInstanceObject.set('longTextAnswerValue', null)
}


QuestionLongText.prototype.clearInput = function() {
	this.dom.find('[answer-type="HaleyLongTextAnswer"]').val('');
}



QuestionMultiChoice = function(obj) {
	QuestionAbstract.call(this, obj);

	this.optionsName = obj.optionsName;
	this.optionsValue = obj.optionsValue;
	this.optionsURI = obj.optionsURI;
	this.preferredSelectorType = obj.preferredSelectorType;
}

QuestionMultiChoice.prototype = Object.create(QuestionAbstract.prototype);
QuestionMultiChoice.prototype.constructor = QuestionMultiChoice;

QuestionMultiChoice.prototype.toHTML = function() {

	var optionsName = this.optionsName;
	var optionsValue = this.optionsValue;
	var optionsURI = this.optionsURI;
	var preferredSelectorType = this.preferredSelectorType || "";
	var options = [];

	for(var i in optionsName) {
		var name = optionsName[i] != null? optionsName[i]: "";
		var value = optionsValue[i] != null? optionsValue[i]: "";
		var uri = optionsURI != null? optionsURI[i]: "";
		var option = {
			name: name,
			value: value,
			uri: uri
		}
		options.push(option);
	}

	var data = {
		answerInstanceURI: this.answerInstanceURI,
		question: this.question,
		answer: this.answer,
		isQuestionRequired: this.isQuestionRequired,
		followUpTypeHTML: QuestionAbstract.toFollowUpTypeHTML(this.answerInstanceURI, this.followupType),
		description: this.description,
		dropdown: preferredSelectorType === "MULTI_DROPDOWN_SELECTOR",
		options: options,
		additionalStyleClasses: this.isHiddenInGroupDisplay() ? 'hidden-in-group-display': ''
	}

	var t =  JST["templates/giw/question-multi-choice.hbs"];

	return t(data);
}


QuestionMultiChoice.prototype.toHorizontalHTML = function() {

	var optionsName = this.optionsName;
	var optionsValue = this.optionsValue;
	var optionsURI = this.optionsURI;
	var isNotDisplay = this.notDisplay;

	var data = {
		isNotDisplay: isNotDisplay,
		answerInstanceURI: this.answerInstanceURI,
		options: [],
	}

	for(var i in optionsName) {
		var name = optionsName[i] != null? optionsName[i]: "";
		var value = optionsValue[i] != null? optionsValue[i]: "";
		var uri = optionsURI != null? optionsURI[i]: "";
		var item = {
			name: name,
			value: value,
			uri: uri
		}
		if(this.answer && this.answer.includes(value)) {
			item.selected = true;
		} else {
			item.selected = false;
		}

		data.options.push(item);
	}

	var t = JST["templates/giw/question-multi-choice-horizontal.hbs"];

	return t(data) || '';
}

QuestionMultiChoice.prototype.render = function() {
	var preferredSelectorType = this.preferredSelectorType;
	var answers = this.answer;
	if(preferredSelectorType && preferredSelectorType === "MULTI_DROPDOWN_SELECTOR") {
		this.dom.find('option').each(function() {
			if(answers && answers.includes($(this).val())) {
				$(this).prop('selected', true);
			}
		});
		this.dom.find('.select2').select2({theme: "classic"});
	} else {
		this.dom.find('.question-body input').each(function() {
			if(answers && answers.includes($(this).val())) {
				$(this).prop('checked', true);
			}
		})
	}

	
}


QuestionMultiChoice.prototype.getAnswerInstanceValue = function() {
	return this.answerInstanceObject.get('multiChoiceAnswerValue');
}


QuestionMultiChoice.prototype.getInputValue = function() {
	if(!this.dom) {
		console.error("Should Initalize the dom before using this function");
	}

	var selectDom = this.dom.find('select');
	if(selectDom.length) {
		return selectDom.val() || [];
	}

	var ansval = [];
	this.dom.find('.question-body input').each(function() {
		if($(this).is(":checked")) {
			ansval.push($(this).val());
		}
	});

	return ansval;
}

/**
 * disable options based on the answerOptions objects provide
 * @param  [answerOptionObjectList] options [description]
 * @return {[type]}         [description]
 */
QuestionMultiChoice.prototype.disableOptions = function(options) {
	if(!this.dom) {
		return
		// console.error("Should Initalize the dom before using this function");
	}

	var mappingOptions = {};
	options.forEach(function(option) {
		mappingOptions[option.URI] = true;
	})

	this.dom.find('option').each(function() {
		if($(this).attr('answeruri') in mappingOptions) {
			$(this).prop("selected", false);
			$(this).attr('disabled', 'disabled');
		}
	})

	var preferredSelectorType = this.preferredSelectorType || "";

	if(preferredSelectorType) {
		this.dom.find('.select2').select2({
			theme: "classic"
		})
		
	}

	this.dom.find('input[type="checkbox"]').each(function() {
		if($(this).attr('answeruri') in mappingOptions) {
			$(this).prop("checked", false);
			$(this).prop("disabled", true);
		}
	})

}


QuestionMultiChoice.prototype.enabledAllOptions = function() {
	this.dom.find('option').add('input[type="checkbox"]').each(function() {
		$(this).prop("disabled", false);
	})
}

QuestionMultiChoice.prototype.toEditMode = function() {
	if(!this.dom) {
		return;
	}

	if(this.isSuppressEmptyAnswerValues && this.isInputEmpty()) {
		if (this.isAnswerCalculatedOrReadOnly()) {
			this.dom.hide();
		} else {
			this.dom.show();
		}
	}

	if(this.isAnswerCalculatedOrReadOnly() || this.isParentReadOnly || this.isParentHiddenInGroupDisplay) {
		return;
	}

	this.isEditMode = true;

	this.dom.find('input').prop('disabled', false);
	this.dom.find('select').prop('disabled', false);
}

QuestionMultiChoice.prototype.toDisableMode = function() {
	if(!this.dom) {
		return;
	}

	this.isEditMode = false;

	this.dom.find('input').prop('disabled', true);
	this.dom.find('select').prop('disabled', true);

	if(this.isSuppressEmptyAnswerValues && this.isInputEmpty()) {
		this.dom.hide();
	}
}

QuestionMultiChoice.prototype.updateThisInputValue = function() {
	var dom = this.dom;
	var selectDom = dom.find('select');
	if(selectDom.length) {
		if(dom.find('select').val()) {
			this.answerInstanceObject.set('multiChoiceAnswerValue', dom.find('select').val());
		}
	} else {
		var ansval = [];
		dom.find('.question-body input').each(function() {
			if($(this).is(":checked")) {
				ansval.push($(this).val());
			}
		});
		this.answerInstanceObject.set('multiChoiceAnswerValue', ansval);
	}
}


QuestionMultiChoice.prototype.setAnswerToNone = function() {
	this.answerInstanceObject.set('multiChoiceAnswerValue', null);
}



QuestionMultiChoice.prototype.clearInput = function() {
	var dom = this.dom;
	var selectDom = dom.find('select');
	if(selectDom.length) {
		selectDom.each(function () { //added a each loop here
		    $(this).select2('destroy').val("").select2();
		});
	} else {
		this.dom.find('input[type="checkbox"]').prop('checked', false);
	}

}


// QuestionMultiChoice.prototype.cancelChanged = function() {
// 	var values = this.getAnswerInstanceValue() || [];
// 	var dom = this.dom;
// 	var selectDom = dom.find('select');
// 	if(selectDom.length) {
// 		selectDom.find('option').each(function(d) {
// 			if(values.includes(d.val())){
// 				d.prop('selected', true);
// 			}
// 		});
// 	} else {
// 		var ansval = [];
// 		dom.find('.question-body input').each(function() {
// 			if(values.includes(d.val())) {
// 				d.prop('checked', true);
// 			}
// 		});
// 	}
// }


QuestionChoice = function(obj) {
	QuestionAbstract.call(this, obj);

	this.optionsName = obj.optionsName;
	this.optionsValue = obj.optionsValue;
	this.optionsURI = obj.optionsURI;
	this.preferredSelectorType = obj.preferredSelectorType;
}

QuestionChoice.prototype = Object.create(QuestionAbstract.prototype);
QuestionChoice.prototype.constructor = QuestionChoice;

QuestionChoice.prototype.toHTML = function() {

	var optionsName = this.optionsName;
	var optionsValue = this.optionsValue;
	var optionsURI = this.optionsURI;
	var preferredSelectorType = this.preferredSelectorType || "";

	var options = [];

	for(var i in optionsName) {
		var name = optionsName[i] != null? optionsName[i]: "";
		var value = optionsValue[i] != null? optionsValue[i]: "";
		var uri = optionsURI != null? optionsURI[i]: "";
		var option = {
			name: name,
			value: value,
			uri: uri
		}
		options.push(option);
	}

	var data = {
		answerInstanceURI: this.answerInstanceURI,
		question: this.question,
		answer: this.answer,
		isQuestionRequired: this.isQuestionRequired,
		followUpTypeHTML: QuestionAbstract.toFollowUpTypeHTML(this.answerInstanceURI, this.followupType),
		description: this.description,
		dropdown: preferredSelectorType === "DROPDOWN_SELECTOR",
		options: options,
		additionalStyleClasses: this.isHiddenInGroupDisplay() ? 'hidden-in-group-display': ''
	}

	var t =  JST["templates/giw/question-choice.hbs"];

	return t(data);

}


QuestionChoice.prototype.toHorizontalHTML = function() {
	var optionsName = this.optionsName;
	var optionsValue = this.optionsValue;
	var optionsURI = this.optionsURI;
	var isNotDisplay = this.notDisplay;

	var data = {
		isNotDisplay: isNotDisplay,
		answerInstanceURI: this.answerInstanceURI,
		options: [],
	}

	for(var i in optionsName) {
		var name = optionsName[i] != null? optionsName[i]: "";
		var value = optionsValue[i] != null? optionsValue[i]: "";
		var uri = optionsURI != null? optionsURI[i]: "";
		var item = {
			name: name,
			value: value,
			uri: uri
		}
		if(this.answer && this.answer.includes(value)) {
			item.selected = true;
		} else {
			item.selected = false;
		}

		data.options.push(item);
	}

	var t = JST["templates/giw/question-choice-horizontal.hbs"];

	return t(data) || '';
}

QuestionChoice.prototype.render = function() {
	var answer = this.answer;
	var preferredSelectorType = this.preferredSelectorType;

	if(preferredSelectorType && preferredSelectorType === "DROPDOWN_SELECTOR") {
		this.dom.find('option').each(function() {
			if(answer && answer === $(this).val()) {
				$(this).prop('selected', true);
			}
		})
		this.dom.find('.select2').select2({theme: "classic"});
	} else {
		this.dom.find('.question-body input').each(function() {
			if(answer && answer === $(this).val()) {
				$(this).prop('checked', true);
			}
		})
	}

}


QuestionChoice.prototype.getAnswerInstanceValue = function() {
	this.answerInstanceObject.get('choiceAnswerValue');
}


QuestionChoice.prototype.getInputValue = function() {
	if(!this.dom) {
		console.error("Should Initalize the dom before using this function");
	}

	var selectDom = this.dom.find('select');
	if(selectDom.length) {
		return selectDom.val();
	}

	var value = null;
	this.dom.find('input').each(function() {
		if($(this).is(":checked")) {
			value = $(this).val();
		}
	});
	
	return value;

}


QuestionChoice.prototype.disableOptions = function(options) {
	QuestionMultiChoice.prototype.disableOptions.call(this, options)
}


QuestionChoice.prototype.enabledAllOptions = function() {
	QuestionMultiChoice.prototype.enabledAllOptions.call(this);
}


QuestionChoice.prototype.toEditMode = function() {
	if(!this.dom) {
		return
	}

	if(this.isSuppressEmptyAnswerValues && this.isInputEmpty()) {
		if (this.isAnswerCalculatedOrReadOnly()) {
			this.dom.hide();
		} else {
			this.dom.show();
		}
	}

	if(this.isAnswerCalculatedOrReadOnly() || this.isParentReadOnly || this.isParentHiddenInGroupDisplay) {
		return;
	}

	this.isEditMode = true;

	this.dom.find('input').prop('disabled', false);
	this.dom.find('select').prop('disabled', false);

}

QuestionChoice.prototype.toDisableMode = function() {
	if(!this.dom) {
		return;
	}

	this.isEditMode = false;

	this.dom.find('input').prop('disabled', true);
	this.dom.find('select').prop('disabled', true);

	if(this.isSuppressEmptyAnswerValues && this.isInputEmpty()) {
		this.dom.hide();
	}
}

QuestionChoice.prototype.updateThisInputValue = function() {
	var dom = this.dom;
	var _this = this
	var selectDom = dom.find('select');
	if(selectDom.length) {
		if(dom.find('select').val()) {
			_this.answerInstanceObject.set('choiceAnswerValue', dom.find('select').val());
		}
	} else {
		dom.find('input').each(function() {
			if($(this).is(":checked")) {
			 	_this.answerInstanceObject.set('choiceAnswerValue', $(this).val());
			}
		});
	}
}



QuestionChoice.prototype.setAnswerToNone = function() {
	this.answerInstanceObject.set('choiceAnswerValue', null);
}


QuestionChoice.prototype.clearInput = function() {
	var dom = this.dom;
	var selectDom = dom.find('select');
	var event = jQuery.Event( "change" );
	if(selectDom.length) {
		this.dom.find('option').eq(0).prop('selected', true).trigger(event, [{ stop: true }]);
	} else {
		this.dom.find('input.single-choice').prop('checked', false);
	}
}


QuestionBoolean = function(obj) {
	QuestionAbstract.call(this, obj);

	this.isHorizontalMode = false;

	this.threeStateWidget = null

}

QuestionBoolean.prototype = Object.create(QuestionAbstract.prototype);
QuestionBoolean.prototype.constructor = QuestionBoolean;

QuestionBoolean.prototype.toHTML = function() {

	var data = {
		answerInstanceURI: this.answerInstanceURI,
		question: this.question,
		answer: this.answer,
		isQuestionRequired: this.isQuestionRequired,
		followUpTypeHTML: QuestionAbstract.toFollowUpTypeHTML(this.answerInstanceURI, this.followupType),
		description: this.description,
		additionalStyleClasses: this.isHiddenInGroupDisplay() ? 'hidden-in-group-display': ''
	}

	var t =  JST["templates/giw/question-boolean.hbs"];

	return t(data);

}

QuestionBoolean.prototype.toHorizontalHTML = function() {

	this.isHorizontalMode = true;

	var data = {
		answerInstanceURI: this.answerInstanceURI
	}

	var t = JST["templates/giw/question-boolean-horizontal.hbs"];

	return t(data);
}

QuestionBoolean.prototype.render = function() {

	var _this = this;

	var answerValue = this.getAnswerInstanceValue();

	this.threeStateWidget = new ThreeStateWidget({
		dom: this.dom.find('.three-state-widget-holder'),
	})
	// When the value change we should trigger the change event so that the groupInstance will receive the change message and call handlers accordingly.
	this.threeStateWidget.registerChangeHandler(function() {
		var event = jQuery.Event( "change" );
		_this.dom.find('.three-state-checkbox').trigger(event);
	});
	
	this.threeStateWidget.setValue(answerValue);
	
}


QuestionBoolean.prototype.getAnswerInstanceValue = function() {
	return this.answerInstanceObject.get('booleanAnswerValue');
}



QuestionBoolean.prototype.getInputValue = function() {
	if(!this.dom) {
		console.error("Should Initalize the dom before using this function");
	}

	return this.threeStateWidget.getValue();

}


QuestionBoolean.prototype.updateThisInputValue = function() {
	var value = this.getInputValue();
	this.answerInstanceObject.set('booleanAnswerValue', value);
}


QuestionBoolean.prototype.setAnswerToNone = function() {
	this.answerInstanceObject.set('booleanAnswerValue', null);
}

QuestionBoolean.prototype.clearInput = function() {
	// this.dom.find('input[answer-type="HaleyBooleanAnswer"]').prop('checked', false);
	this.threeStateWidget.setValue(null);
}


QuestionBoolean.prototype.toEditMode = function() {

	if(this.isSuppressEmptyAnswerValues && this.isInputEmpty()) {
		if (this.isAnswerCalculatedOrReadOnly()) {
			this.dom.hide();
		} else {
			this.dom.show();
		}
	}

	if(this.isAnswerCalculatedOrReadOnly() || this.isParentReadOnly || this.isParentHiddenInGroupDisplay) {
		return;
	}

	this.isEditMode = true;
	this.threeStateWidget.enabled();
	this.dom.find('input').prop('disabled', false);
}


QuestionBoolean.prototype.toDisableMode = function() {

	this.isEditMode = false;
	this.threeStateWidget.disabled();
	this.dom.find('input').prop('disabled', true);

	if(this.isSuppressEmptyAnswerValues && this.isInputEmpty()) {
		this.dom.hide();
	}
}


QuestionDateTime = function(obj) {
	QuestionAbstract.call(this, obj);
	this.validator = new DateValidator();
}

QuestionDateTime.prototype = Object.create(QuestionAbstract.prototype);
QuestionDateTime.prototype.constructor = QuestionDateTime;

QuestionDateTime.PROPERTY_VALUE = 'dateTimeAnswerValue';

QuestionDateTime.prototype.toHTML = function() {

	var data = {
		answerInstanceURI: this.answerInstanceURI,
		question: this.question,
		isQuestionRequired: this.isQuestionRequired,
		followUpTypeHTML: QuestionAbstract.toFollowUpTypeHTML(this.answerInstanceURI, this.followupType),
		description: this.description,
		additionalStyleClasses: this.isHiddenInGroupDisplay() ? 'hidden-in-group-display': ''
	}

	var t =  JST["templates/giw/question-datetime.hbs"];

	return t(data);
}

QuestionDateTime.prototype.toHorizontalHTML = function() {

	var data = {
		answerInstanceURI: this.answerInstanceURI,
	}

	var t =  JST["templates/giw/question-datetime-horizontal.hbs"];
	return t(data);
}

QuestionDateTime.prototype.render = function() {
	var answer = CommonHelperFunction.timeToStandardDate(this.answer);
	this.dom.find('.question').val(answer);
	this.dom.find('.datepicker').datepicker({
		autoclose: true
  	});
}


QuestionDateTime.prototype.getAnswerInstanceValue = function() {
	return this.answerInstanceObject.get('dateTimeAnswerValue');
}



QuestionDateTime.prototype.getInputValue = function() {
	if(!this.dom) {
		console.error("Should Initalize the dom before using this function");
	}

	return new Date(this.dom.find('input.question').val()).getTime();
}


QuestionDateTime.prototype.updateThisInputValue = function() {
	var value = this.dom.find('.question').val();
	this.answerInstanceObject.set('dateTimeAnswerValue', new Date(value).getTime());
}


QuestionDateTime.prototype.setAnswerToNone = function() {
	this.answerInstanceObject.set('dateTimeAnswerValue', null);
}


QuestionDateTime.prototype.clearInput = function() {
	this.dom.find('input.question').val('');
}


QuestionFileUpload = function(obj) {

	QuestionAbstract.call(this, obj);

	this.fileNode = obj.fileNode;
	this.callback = obj.callback;
	this.breadCrumbs = obj.breadCrumbs;
}


QuestionFileUpload.prototype = Object.create(QuestionAbstract.prototype);
QuestionFileUpload.prototype.constructor = QuestionFileUpload;

QuestionFileUpload.TYPE_FILE_NODE = 'http://vital.ai/ontology/vital#FileNode';
QuestionFileUpload.PROPERTY_HAS_FILE_SCOPE = 'fileScope';
QuestionFileUpload.PROPERTY_HAS_FILE_NAME = 'fileName';

QuestionFileUpload.PROPERTY_ANSWER_INSTANCE_IMAGE_URL = 'answerInstanceImageURL';
QuestionFileUpload.PROPERTY_FILE_ANSWER_VALUE_URI = 'fileAnswerValueURI';
QuestionFileUpload.PROPERTY_FILE_URL = 'fileURL';
QuestionFileUpload.PROPERTY_ANSWER_INSTANCE_IMAGE_WIDTH = 'answerInstanceImageWidth';
QuestionFileUpload.PROPERTY_ANSWER_INSTANCE_IMAGE_HEIGHT = 'answerInstanceImageHeight';

QuestionFileUpload.prototype.toHTML = function() {

	var url = !this.fileNode ? '' : FileDetailsPanel.getFileDownloadURL(this.fileNode) || '';
	var name = !this.fileNode ? '' : this.fileNode.get(QuestionFileUpload.PROPERTY_HAS_FILE_NAME) || '';
	var scope = !this.fileNode ? '' : this.fileNode.get(QuestionFileUpload.PROPERTY_HAS_FILE_SCOPE) || '';
	var timeStamp = this.answerInstanceObject.get('timestamp') || null;

	var data = {
		answerInstanceURI: this.answerInstanceURI,
		question: this.question,
		isQuestionRequired: this.isQuestionRequired,
		followUpTypeHTML: QuestionAbstract.toFollowUpTypeHTML(this.answerInstanceURI, this.followupType),
		description: this.description,
		fileAnswerValueURI: this.answerInstanceObject.get(QuestionFileUpload.PROPERTY_FILE_ANSWER_VALUE_URI) || '',
		additionalStyleClasses: this.isHiddenInGroupDisplay() ? 'hidden-in-group-display': '',
		url: url.replace('s3://haley-saas-dev-public-bucket/', 'https://haley-saas-dev-public-bucket.s3.amazonaws.com/')
				.replace('s3://haley-saas-dev-private-bucket/', 'https://haley-saas-dev-private-bucket.s3.amazonaws.com/'),
		name: name,
		scope: scope,
		created: timeStamp ? CommonHelperFunction.timeToStandardDate(timeStamp): '',
	}

	var t =  JST["templates/giw/question-file-upload.hbs"];

	return t(data);

}


QuestionFileUpload.prototype.render = function() {
	// Handle File Upload
	
	var _this = this;
	// var uri = this.answerInstanceObject.get(QuestionFileUpload.PROPERTY_FILE_ANSWER_VALUE_URI) || '';

	_this.dom.find('.file-details').on('click', function(e) {
		e.preventDefault();
		// answerInstanceFileDetails.answerInstanceObject = _this.answerInstanceObject;
		// answerInstanceFileDetails.fileNode = _this.fileNode;
		if(!_this.breadCrumbs) {
			console.error('Should passed the current breadCrumbs to the QuestionFileUpload object');
			return;
		}
		answerInstanceFileDetails.breadCrumbs = _this.breadCrumbs;
		router.navigate(AnswerInstanceFileDetails.getDetailsURL(_this.answerInstanceDetailsURLPrefix, _this.answerInstanceURI));
	});

    // new FileUploadPanel(this.dom.find('.upload-panel-button'), this.dom.find('.file-scope-radio'), this.dom.find('.file-upload-parent'), function(fileNode){
		
	// }).render();

}


QuestionFileUpload.prototype.getAnswerInstanceValue = function() {
	return this.answerInstanceObject.get('fileAnswerValueURI');
}



QuestionFileUpload.prototype.getInputValue = function() {
	if(!this.dom) {
		console.error("Should Initalize the dom before using this function");
	}
}


QuestionFileUpload.prototype.toEditMode = function() {
	if(this.isSuppressEmptyAnswerValues && this.isInputEmpty()) {
		if (this.isAnswerCalculatedOrReadOnly()) {
			this.dom.hide();
		} else {
			this.dom.show();
		}
	}

	if(this.isAnswerCalculatedOrReadOnly()) {
		return;
	}
	this.isEditMode = true;

	this.dom.find('input').prop('disabled', false);
	// this.dom.find('.upload-panel-button').prop('disabled', false);

}

QuestionFileUpload.prototype.toDisableMode = function() {
	if(!this.dom) {
		return;
	}
	this.isEditMode = false;

	this.dom.find('input').prop('disabled', true);
	// this.dom.find('.upload-button').prop('disabled', true);

	if(this.isSuppressEmptyAnswerValues && this.isInputEmpty()) {
		this.dom.hide();
	}

}

QuestionFileUpload.prototype.updateThisInputValue = function(answerInstance, dom) {
	this.dom.find('a')
}


QuestionFileUpload.prototype.setAnswerToNone = function() {
	this.answerInstanceObject.set('fileAnswerValueURI', null);
}


QuestionFileUpload.prototype.clearInput = function() {
	
}


QuestionTaxonomy = function(obj) {
	QuestionAbstract.call(this, obj);

	this.taxonomyRoot = obj.taxonomyRoot;
	this.fancyTreeWidget = null;
}


QuestionTaxonomy.prototype = Object.create(QuestionAbstract.prototype);
QuestionTaxonomy.prototype.constructor = QuestionTaxonomy;

QuestionTaxonomy.prototype.toHTML = function() {

	var data = {
		answerInstanceURI: this.answerInstanceURI,
		answer: this.answer,
		question: this.question,
		isQuestionRequired: this.isQuestionRequired,
		followUpTypeHTML: QuestionAbstract.toFollowUpTypeHTML(this.answerInstanceURI, this.followupType),
		description: this.description,
		additionalStyleClasses: this.isHiddenInGroupDisplay() ? 'hidden-in-group-display': ''
	}

	var t =  JST["templates/giw/question-taxonomy.hbs"];

	return t(data);
}


QuestionTaxonomy.prototype.render = function() {
	var _this = this

	var fancyTreeDom = this.dom.find('div.fancy-tree');

	var fancytreeConfig = Object.assign({}, FancyTreeWidget.CONFIG);

	var commandType = 'http://vital.ai/ontology/harbor-ai#GetClassificationTreeRequest';

	var commandProperties = {}

	var payload = [_this.taxonomyRoot];

	var message = {}
	
	var callback = function(msgRL) {
		_this.fancyTreeWidget = new FancyTreeWidget(msgRL, fancyTreeDom, fancytreeConfig, option={});
		_this.fancyTreeWidget.render();
		_this.fancyTreeWidget.selectNode(_this.answerInstanceObject);
		var answerValueURI = _this.getAnswerInstanceValue();
		var answerNode = answerValueURI ? msgRL.get(answerValueURI): null;
		var name = answerNode? answerNode.get('name'): '';
		_this.dom.find('input[type="text"]').val(name || '');
		if(_this.isEditMode) {
			_this.toEditMode();
		} else {
			_this.toDisableMode();
		}
		
	}

	HarborCommandRequest.requestWithMetaQLResultsMessageReturn.call(_this, commandType, commandProperties, payload, message, callback, {ignoreIsActive: true});

}


QuestionTaxonomy.prototype.getInputValue = function() {
	if(!this.dom) {
		console.error("Should Initalize the dom before using this function");
	}

	if(!this.fancyTreeWidget) {
		console.error("Should Initalize the fancyTreeWidget before using this function");
	}

	return this.fancyTreeWidget.getSelectedNode(this.answerInstance);
}


QuestionTaxonomy.prototype.getAnswerInstanceValue = function() {
	return this.answerInstanceObject.get('taxonomyAnswerValue');
}



QuestionTaxonomy.prototype.toEditMode = function() {

	if(this.isSuppressEmptyAnswerValues && this.fancyTreeWidget && this.isInputEmpty()) {
		if (this.isAnswerCalculatedOrReadOnly()) {
			this.dom.hide();
		} else {
			this.dom.show();
		}
	}

	if(this.isAnswerCalculatedOrReadOnly()) {
		return;
	}

	this.dom.find('.answer-follow-type input').prop('disabled', false);
	this.dom.find('input.form-control').css('display', 'none');
	this.dom.find('.fancy-tree-widget-body').css('display', 'block');
	this.isEditMode = true;
}

QuestionTaxonomy.prototype.toDisableMode = function() {
	this.dom.find('.answer-follow-type input').prop('disabled', true);
	this.dom.find('.form-control').css('display', 'block').prop('disabled', true);
	this.dom.find('.fancy-tree-widget-body').css('display', 'none');
	this.isEditMode = false;

	if(this.isSuppressEmptyAnswerValues && this.fancyTreeWidget && this.isInputEmpty()) {
		this.dom.css('display', 'none');
	}
}

QuestionTaxonomy.prototype.disableOptions = function(options) {
	QuestionMultiTaxonomy.prototype.disableOptions.call(this, options);
}

QuestionTaxonomy.prototype.enabledAllOptions = function() {
	QuestionMultiTaxonomy.prototype.enabledAllOptions.call(this);
}


QuestionTaxonomy.prototype.updateThisInputValue = function() {
	var fancyTreeWidget = this.fancyTreeWidget;
	var answerInstance = this.answerInstanceObject;
	var selectedTaxonomy = fancyTreeWidget.getSelectedNode(answerInstance);
	this.answerInstanceObject.set('taxonomyAnswerValue', !!selectedTaxonomy ? selectedTaxonomy.URI : null);
}


QuestionTaxonomy.prototype.setAnswerToNone = function() {
	this.answerInstanceObject.set('taxonomyAnswerValue', null);
}


QuestionTaxonomy.prototype.clearInput = function() {
	var fancyTreeWidget = this.fancyTreeWidget;
	fancyTreeWidget.clearInput();
}





QuestionMultiTaxonomy = function(obj) {
	QuestionAbstract.call(this, obj);

	this.taxonomyRoot = obj.taxonomyRoot;
	this.fancyTreeWidget = null;
}


QuestionMultiTaxonomy.prototype = Object.create(QuestionAbstract.prototype);
QuestionMultiTaxonomy.prototype.constructor = QuestionMultiTaxonomy;


QuestionMultiTaxonomy.prototype.toHTML = function() {

	var data = {
		answerInstanceURI: this.answerInstanceURI,
		answer: this.answer,
		question: this.question,
		isQuestionRequired: this.isQuestionRequired,
		followUpTypeHTML: QuestionAbstract.toFollowUpTypeHTML(this.answerInstanceURI, this.followupType),
		description: this.description,
		additionalStyleClasses: this.isHiddenInGroupDisplay() ? 'hidden-in-group-display': ''
	}

	var t =  JST["templates/giw/question-multi-taxonomy.hbs"];

	return t(data);
}

QuestionMultiTaxonomy.prototype.render = function() {

	var _this = this;

	var fancyTreeDom = this.dom.find('div.fancy-tree');

	var fancytreeConfig = Object.assign({}, FancyTreeWidget.CONFIG);
	fancytreeConfig.selectMode = 3;

	var commandType = 'http://vital.ai/ontology/harbor-ai#GetClassificationTreeRequest';

	var commandProperties = {};

	var payload = [_this.taxonomyRoot];

	var message = {}
	
	var callback = function(msgRL) {
		_this.fancyTreeWidget = new FancyTreeWidget(msgRL, fancyTreeDom, fancytreeConfig);
		_this.fancyTreeWidget.render();
		_this.fancyTreeWidget.selectNodes(_this.answerInstanceObject);
		var answerValueURIs = _this.getAnswerInstanceValue();
		var answers = answerValueURIs ? answerValueURIs.map(function(uri) {
			var node = msgRL.get(uri);
			return node? node.get('name'): '';
		}): [];
		_this.dom.find('input[type="text"]').val(answers || '');
		if(_this.isEditMode) {
			_this.toEditMode();
		} else {
			_this.toDisableMode();
		}
	}

	HarborCommandRequest.requestWithMetaQLResultsMessageReturn.call(_this, commandType, commandProperties, payload, message, callback, {ignoreIsActive: true});

}


QuestionMultiTaxonomy.prototype.getAnswerInstanceValue = function() {
	return this.answerInstanceObject.get('multiTaxonomyAnswerValue');
}


QuestionMultiTaxonomy.prototype.getInputValue = function() {
	if(!this.dom) {
		console.error("Should Initalize the dom before using this function");
	}

	if(!this.fancyTreeWidget) {
		console.error("Should Initalize the fancyTreeWidget before using this function");
	}

	return this.fancyTreeWidget.getSelectedNodes();

}

QuestionMultiTaxonomy.prototype.toEditMode = function() {

	if(this.isSuppressEmptyAnswerValues && this.fancyTreeWidget && this.isInputEmpty()) {
		if (this.isAnswerCalculatedOrReadOnly()) {
			this.dom.hide();
		} else {
			this.dom.show();
		}
	}

	if(this.isAnswerCalculatedOrReadOnly()) {
		return;
	}

	this.dom.find('.answer-follow-type input').prop('disabled', false);
	this.dom.find('textarea.form-control').css('display', 'none');
	this.dom.find('.fancy-tree-widget-body').css('display', 'block');
	this.isEditMode = true;
}

QuestionMultiTaxonomy.prototype.toDisableMode = function() {
	this.dom.find('input').prop('disabled', true);
	this.dom.find('textarea').css('display', 'block').prop('disabled', true);
	this.dom.find('.fancy-tree-widget-body').css('display', 'none');
	this.isEditMode = false;

	if(this.isSuppressEmptyAnswerValues && this.fancyTreeWidget && this.isInputEmpty()) {
		this.dom.hide();
	}
}


QuestionMultiTaxonomy.prototype.disableOptions = function(options) {
	if(!this.dom) {
		return;
		// console.error("Should Initalize the dom before using this function");
	}

	if(!this.fancyTreeWidget) {
		return;
		// console.error("Should Initalize the fancyTreeWidget before using this function");
	}

	var fancyTreeNodeKeys = []

	options.forEach( function(node, index) {
		if(node.type === 'http://vital.ai/ontology/haley-taxonomy#TaxonomyNode') {
			fancyTreeNodeKeys.push(node.URI);
		}
	});

	this.fancyTreeWidget.disableNodes(fancyTreeNodeKeys);

}


QuestionMultiTaxonomy.prototype.enabledAllOptions = function() {
	if(!this.dom) {
		return
		// console.error("Should Initalize the dom before using this function");
	}

	if(!this.fancyTreeWidget) {
		return;  
		// console.error("Should Initalize the fancyTreeWidget before using this function");
		
	}

	this.fancyTreeWidget.enabledAllNodes();
}


QuestionMultiTaxonomy.prototype.updateThisInputValue = function() {
	var fancyTreeWidget = this.fancyTreeWidget;
	var answerInstance = this.answerInstanceObject;
	var selectedTaxonomies = fancyTreeWidget.getSelectedNodes(answerInstance) || [];

	var selectedNodes = selectedTaxonomies.map(function(node) {
		return node.URI;
	})
	
	this.answerInstanceObject.set('multiTaxonomyAnswerValue', selectedNodes);

}


QuestionMultiTaxonomy.prototype.setAnswerToNone = function() {
	this.answerInstanceObject.set('multiTaxonomyAnswerValue', null);
}


QuestionMultiTaxonomy.prototype.clearInput = function() {
	var fancyTreeWidget = this.fancyTreeWidget;
	fancyTreeWidget.clearInput();
}


EnhancementDependencyWrapperFactory = function() {

}



EnhancementDependencyWrapperFactory.createWrapper = function(type, enhancementDependencyObject, haleyAnswerInstances, rowOrSectionInstanceObject, groupInstance) {
	switch (type) {
		case "Section":
			return new SectionEnhancementDependencyWrapper(enhancementDependencyObject, haleyAnswerInstances, rowOrSectionInstanceObject, groupInstance);
			break;
		case "Row":
			return new RowEnhancementDependencyWrapper(enhancementDependencyObject, haleyAnswerInstances, rowOrSectionInstanceObject, groupInstance);
			break;
		default:
			console.error("No Such Type Supported")
			break;
	}
}


/**
 * Wrap the EnhancementDependency Object.
 * @param {[type]} enhancementDependencyObject [description]
 * @param {[type]} haleyAnswerInstances        [description]
 * @param {[type]} sectionInstanceObject       [description]
 * @param {[type]} groupInstance               [description]
 */
SectionEnhancementDependencyWrapper = function (enhancementDependencyObject, haleyAnswerInstances, sectionInstanceObject, groupInstance) {
	this.enhancementDependencyObject = enhancementDependencyObject;
	this.answerInstances = haleyAnswerInstances;
	this.contextInstance = sectionInstanceObject;
	this.groupInstance = groupInstance;
}


/**
 * check if there is any enhancement we can get from the server, if the ehancement existed, display the buttons
 * @param  {Function} callback this function will be called if the button was  click and message return back.
 * @return {[type]}            [description]
 */
SectionEnhancementDependencyWrapper.prototype.getEnhancement = function(callback) {

	var _this = this;

	var msg = vitaljs.graphObject({type: 'http://vital.ai/ontology/harbor-ai#GetAvailableEnhancementRulesRequest'});
	msg.URI = 'http://vital.ai/haley.ai/haley-saas/GetAvailableEnhancementRulesRequest/' + new Date().getTime() + '-' + Math.round( 100000000000 * Math.random());  
	msg.set('channelURI', UI_CHANNEL.URI);

	var payload = [this.enhancementDependencyObject, this.groupInstance, this.contextInstance, ...this.answerInstances]
	
	HALEY_API.sendMessageWithRequestCallback(HALEY_SESSION, msg, payload, function(error){
		
		if(error) {
			console.error("Error when sending GetAvailableEnhancementRulesRequest request", error);
		} else {
			console.log('Get Group Question request message sent');
		}
		
	}, function(msgRL){

		var msg = msgRL.first();
		if(msg.type != 'http://vital.ai/ontology/vital-aimp#MetaQLResultsMessage') {
			console.warn("Ignoring message of type: " + msg.type);
			return true;
		}
		
		var status = msg.get('status');
		var statusMessage = msg.get('statusMessage');
		
		if(status != 'ok') {
			console.error('ERROR when sending GetAvailableEnhancementRulesRequest', statusMessage);
			return false;
		}

		var enhancementRules = msgRL.iterator('http://vital.ai/ontology/haley-ai-question#HaleyEnhancementRule');

		_this.displayEnhancementButtons(enhancementRules, callback);

		return false;
		
	});
}


/**
 * display the enhancement button and bind the handler with the button. call the hanlder if the created button clicked.
 * @param  {[type]}   enhancementRules [description]
 * @param  {Function} callback         this function will be called if the button created clickec.
 * @return {[type]}                    [description]
 */
SectionEnhancementDependencyWrapper.prototype.displayEnhancementButtons = function(enhancementRules, callback) {
	var _this = this
	var dom = $('[section-instance-uri="' + this.contextInstance.URI + '"]');
	var enhancementDependencyButtons = dom.find('.section-header .enhancement-dependency-buttons');
	var mappingRuleURIToRule = {};

	enhancementDependencyButtons.off();

	enhancementDependencyButtons.html(""); 
	enhancementRules.forEach(function(enhancementRule) {
		if(dom.find('[data-enhancement-uri="' + enhancementRule.URI + '"]').length === 0) {
			mappingRuleURIToRule[enhancementRule.URI] = enhancementRule;
			var text = '<div style="display: inline-block" data-enhancement-dependency-uri="' + _this.enhancementDependencyObject.URI + '" data-enhancement-rule-uri="' + enhancementRule.URI + '" class="section-enhancement-button btn btn-primary btn-sm" tabindex="-1">' + enhancementRule.get('name') + '</div>'
			enhancementDependencyButtons.append($(text));
		}
	})

	enhancementDependencyButtons.on('click', function(e) {
		e.preventDefault();

		var ruleURI = $(e.target).attr('data-enhancement-rule-uri');
		var enhancementRule = mappingRuleURIToRule[ruleURI];

		callback("Section", enhancementRule, _this.groupInstance, _this.contextInstance);

	})
}


RowEnhancementDependencyWrapper = function (enhancementDependencyObject, haleyAnswerInstances, rowInstanceObject, groupInstance) {
	this.enhancementDependencyObject = enhancementDependencyObject;
	this.answerInstances = haleyAnswerInstances;
	this.contextInstance = rowInstanceObject;
	this.groupInstance = groupInstance;
}


RowEnhancementDependencyWrapper.prototype.isActivate = function(mappingAnswerInstanceToQuestionDom={}) {
	return SectionEnhancementDependencyWrapper.prototype.isActivate.call(this, mappingAnswerInstanceToQuestionDom);
}


RowEnhancementDependencyWrapper.prototype.getEnhancement = function(callback) {
	SectionEnhancementDependencyWrapper.prototype.getEnhancement.call(this, callback);
}


/**
 * display the enhancement button and bind the handler with the button. call the hanlder if the created button clicked.
 * @param  {[type]}   enhancementRules [description]
 * @param  {Function} callback         this function will be called if the button created clickec.
 * @return {[type]}                    [description]
 */
RowEnhancementDependencyWrapper.prototype.displayEnhancementButtons = function(enhancementRules, callback) {
	var _this = this;

	var dom = $('[row-instance-uri="' + this.contextInstance.URI + '"]');
	var enhancementDependencyButtons = dom.find('.enhancement-dependency-buttons');
	var mappingRuleURIToRule = {};

	enhancementDependencyButtons.off();

	enhancementDependencyButtons.html(""); 
	enhancementRules.forEach(function(enhancementRule) {
		mappingRuleURIToRule[enhancementRule.URI] = enhancementRule;
		var text = '<div class="row-enhancement-button btn btn-primary btn-sm" data-enhancement-dependency-uri="' + _this.enhancementDependencyObject.URI + '" data-enhancement-rule-uri="' + enhancementRule.URI + '" tabindex="-1" >' + enhancementRule.get('name') + '</div>'
		enhancementDependencyButtons.append($(text));
	})

	enhancementDependencyButtons.on('click', function(e) {
		e.preventDefault();

		var ruleURI = $(e.target).attr('data-enhancement-rule-uri');
		var enhancementRule = mappingRuleURIToRule[ruleURI];

		callback("Row", enhancementRule, _this.groupInstance, _this.contextInstance);

	})
}

module.exports = QuestionAbstract;

