(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var GroupListWidget = __webpack_require__(1);
var GroupInstanceWidget = __webpack_require__(2);
var QuestionModule = __webpack_require__(3);
module.exports = {
    GroupListWidget: GroupListWidget,
    GroupInstanceWidget: GroupInstanceWidget,
    QuestionModule: QuestionModule,
};


/***/ }),
/* 1 */
/***/ ((module) => {

/** Handle rendering a group of tabs. Click event of the tabs. Managing the organization of the objects of groupInstances.
 * @author Wei
 * @version 1.0
 * @since 08/21/2019 
*/


/**
 * Constructor of the class
 * @param {jquiry dom object} dom  Inside which the groupListHtml will be renderred.
 * @param {GroupInstanceWidget Object} giw 
 * @param {[type]} config {
 *                       isRemovable: boolean   // is The Tab Removable
 *                       isSummaryInformationVisible: boolean
 * 					}
 */
const GroupListWidget = function(dom, giw, config) {
	this.dom = dom;
	this.giw = giw;
	this.config = config || {};
	this.previousGroupList = [];
	this.currentGroupList = [];
	this.mappingGroupInstance = {};

	this.isRemovable = this.config.isRemovable;
	this.isSummaryInformationVisible = this.config.isSummaryInformationVisible;

	// onTabClick is the function will excute after tab is clicked.
	this.onTabClick = this.config.onTabClick || function(dom, groupInstance) { console.warn("NO TAB CLICK HANDLER PROVIDEd");}

	this.onDeleteGroupClick = this.config.onDeleteGroupClick || function(dom, groupInstance) { console.warn("NO TAB CLICK HANDLER PROVIDEd");}

	this.selector = {
		TAB: '.question-group a[data-toggle="collapse"]',
		CONTENT: '.panel-collapse',
		DELETE_GROUP_BUTTON: '.delete-group-button'
	}

	this.dom.on('click', this.selector.TAB, this._onTabClick.bind(this));

	this.dom.on('click', this.selector.DELETE_GROUP_BUTTON, this._onDeleteGroupClick.bind(this));
}


/**
 * Should be call after the object is never used anymore to clean the object and events attach to it
 * @return {[type]} [description]
 */
GroupListWidget.prototype.clean = function() {
	this.dom.off();
}


/**
 * Check whether the tab is open or not
 * @param  {string}  groupInstanceURI 
 * @return {Boolean}  [description]
 */
GroupListWidget.prototype.isTabOpen = function(groupInstanceURI) {
	var tabDom = this.getTabDom(groupInstanceURI);
	return tabDom.find('.panel-collapse').hasClass('in');
}


/**
 * Get the dom 
 * @param  {[type]} groupInstanceURI [description]
 * @return {[type]}                  [description]
 */
GroupListWidget.prototype.getContentDom = function(groupInstanceURI) {
	var tabDom = this.getTabDom(groupInstanceURI);
	return tabDom.find(this.selector.CONTENT);
}


GroupListWidget.prototype.getTabDom = function(groupInstanceURI) {
	var selector = '.question-group[data-uri="' + groupInstanceURI + '"]';
	return this.dom.find(selector);
}



GroupListWidget.prototype.getGroupInstance = function(groupInstanceURI) {

	var groupInstance = this.mappingGroupInstance[groupInstanceURI];
	if(groupInstance) {
		return groupInstance;
	}

	console.error("NO GROUPINSTNANCE ON THIS WIDGET WITH URI: ", groupInstanceURI, this.mappingGroupInstance);
}


GroupListWidget.prototype.getGroup = function(groupInstance) {
	var groups = this.msgRL.iterator('http://vital.ai/ontology/haley-ai-question#HaleyGroup');

	var ans = null;

	groups.forEach(function(group) {
		if(group.URI === groupInstance.get('haleyGroup')) {
			ans = group;
		}
	})

	return ans;
} 


GroupListWidget.prototype.emptyTab = function(groupInstanceURI) {
	var contentDom = this.getContentDom(groupInstanceURI);
	contentDom.empty();
}


GroupListWidget.prototype.closeAllTabs = function() {
	this.dom.find(this.selector.CONTENT).removeClass('in');
}


GroupListWidget.prototype.render = function(msgRL)  {

	var _this = this;

	this.msgRL = msgRL;

	var t = JST["templates/components/group-list.hbs"];

	var groups = this._toTemplateObjects();

	// Handling First Rload the page.
	if(this.previousGroupList.length < 1) {

		_this.currentGroupList = groups;

		var html = "";

		groups.forEach(function(group) {
			html += t(group);
		})

		this.dom.html(html);

		return false;
	} 

	console.warn("newGroupList", groups, "previousGroupList", previousGroupList);

	var groupsToRemove = [];
	var groupsToInsert = [];
	var previousGroupList = _this.currentGroupList || [];
	var groupListDom = this.dom || _this.parentEl.find('#submission-inquiry-quote-quote-list')

	var mappingPreviousGroups = SubmissionsFormPanel.prototype._mappingURIWithGroups.call(_this, previousGroupList);
	var mappingNewGroups = SubmissionsFormPanel.prototype._mappingURIWithGroups.call(_this, groups);

	previousGroupList.forEach(function(group) {
		if(!mappingNewGroups[group.uri]) {
			groupsToRemove.push(group);
		}
	})

	groups.forEach(function(group){
		if(!mappingPreviousGroups[group.uri]) {
			groupsToInsert.push(group);
		}
	})

	console.warn('GROUP TO INSERT AND REMOVED', groupsToInsert, groupsToRemove);

	groupsToRemove.forEach(function(group){
		var selector = '[uri="' + group.uri + '"]';
		var dom = $(selector);
		if(!dom.find('.panel-collapse').hasClass('in')) {
			dom.remove();
		}
	})
	
	var len = previousGroupList.length;

	groupsToInsert.forEach(function(group, index) {

		var isInserted = false;
		var groupIndex = group.groupIndex;

		groupListDom.find('.question-group').each(function() {
			if(!isInserted) {
				var domIndex = $(this).attr('data-group-index');
				if(groupIndex < Number(domIndex)) {
					$(GroupListWidget._groupToHTML(group, len + groupIndex)).insertBefore(this);
					isInserted = true;
				}
			}
		})

		console.warn(isInserted, len, index)

		if(!isInserted) {
			groupListDom.append(GroupListWidget._groupToHTML(group, len + index));
		}
	})

	// groupListDom.find('.question-group').css('margin-bottom', '0px');
	
}


GroupListWidget.prototype._toTemplateObjects = function() {

	var _this = this;

	var msgRL = this.msgRL;

	var groups = msgRL.iterator('http://vital.ai/ontology/haley-ai-question#HaleyGroup');
	var groupInstances = msgRL.iterator('http://vital.ai/ontology/haley-ai-question#HaleyGroupInstance');
	var groupSummaryInfo = msgRL.iterator('http://vital.ai/ontology/haley-ai-question#HaleyGroupInstanceSummary');
	var edges = msgRL.iterator('http://vital.ai/ontology/haley-ai-question#Edge_hasHaleyGroupInstanceSummary');

	if(groups.length === 0 && groupInstances.length === 0) {
		return [];
	}

	// record the groupintance. This information will be used when a tap is clicked.
	var mappingGroupInstance = {};
	groupInstances.forEach(function(element) {
		mappingGroupInstance[element.URI] = element;
	})

	_this.mappingGroupInstance = mappingGroupInstance;
	_this.groupListObjects = groups;

	// Mapping group to groupInstance and groupInstance to GroupSummary.
	var mappingGroupToGroupInstance = {};
	var mappingGroupInstanceToSummary = {};
	groups.forEach( function(element, index) {
		var uri = element.URI;
		groupInstances.forEach( function(ele, i) {
			if(ele.get('haleyGroup') === uri) {
				if(mappingGroupToGroupInstance[uri]) {
					mappingGroupToGroupInstance[uri].push(ele);
				} else {
					mappingGroupToGroupInstance[uri] = [ele];
				}
				
			}
		});
		if(!mappingGroupToGroupInstance[uri]) {
			console.error('CAN NOT FIND GROUP INSTANCE OBJECT WITH PROPERTY haleyGroup ' + uri)
		}
	});

	groupInstances.forEach( function(element, index) {
		var suri = element.URI;
		edges.forEach( function(ele, i) {
			var edge = edges[i];
			if(edge.get('edgeSource') === suri) {
				var duri = edge.get('edgeDestination');
				groupSummaryInfo.forEach( function(el, ind) {
					if(duri === el.URI) {
						mappingGroupInstanceToSummary[suri] = el;
					}
				});
			}
		});

		var groupURI = element.get('haleyGroup');
		if(!mappingGroupToGroupInstance[groupURI]) {
			console.error('No Relateive Group Object Found. Here is the Instance Object: ', element);
		}
	});

	var mappingGroupSummaryStatus = {
		['http://vital.ai/ontology/harbor-ai#GroupInstanceStatus_COMPLETE']: 'box-success',
		['http://vital.ai/ontology/harbor-ai#GroupInstanceStatus_INCOMPLETE']: 'box-warning',
		['http://vital.ai/ontology/harbor-ai#GroupInstanceStatus_INVALID']: 'box-danger',
		['http://vital.ai/ontology/harbor-ai#GroupInstanceStatus_NEW']: 'box-primary',
		['http://vital.ai/ontology/harbor-ai#GroupInstanceStatus_SYSERROR']: 'box-danger'
	};

	var objs = [];
	for(var i = 0; i < groups.length; i++) {
		var o = groups[i];

		var name = o.get('name');
		var uri = o.URI;
		var groupIndex = Number(o.get('groupIndex'));

		var instances = mappingGroupToGroupInstance[o.URI];

		if(!instances) {
			console.error("No GroupInstance Object Match Group Object: ", o);
			continue
		}

		instances.forEach(function(ins, index) {
			var sum = mappingGroupInstanceToSummary[ins.URI];

			if(_this.isSummaryInformationVisible && !ins || !sum) {
				// console.warn('No Relative GroupInstance or GroupInstanceSummary Object Exist', o, ins, sum);
			}

			var summary = '';

			if(_this.isSummaryInformationVisible) {
				var total = sum.get('numberOfQuestions');
				var	answered = sum.get('numberOfAnsweredQuestions');
				var pending = sum.get('numberOfAnsweredPendingQuestions');
				// var	required = sum.get('numberOfRequiredQuestions');
				var	requiredAnswer = sum.get('numberOfAnsweredRequiredQuestions');

				// The total answered and pending are not initialated at the first time. So do not show that at the first time.
				if(total || answered || pending) {
					total = total || "0";
					answered = answered || "0";
					pending = pending || "0";
					summary = '       ' + answered + '/' + pending + '/' + total + ' (Answered/Pending/Total)';
				} else {
					summary = "";
				}
			}

			var status = sum ? sum.get('haleyGroupInstanceStatus'): null;
			status = status? mappingGroupSummaryStatus[status]: "box-primary";
			
			// var instanceName = name + (instances.length > 1 ? ' ' + (index + 1): "");
			// var instanceName = name;
			var instanceName = ins.get('name');
			
			let obj = {
				status: status, 
				summary: summary,
				groupIndex: groupIndex * 10 + index,
				groupName: instanceName,
				uri: ins.URI,
				isAbleToRemove: _this.isRemovable && ins.get('ableToRemoveGroup')
			}

			objs.push(obj);
		})
		
	}

	objs.sort(function(a, b) {return a.groupIndex - b.groupIndex});

	return objs;
}



GroupListWidget.prototype._onDeleteGroupClick = function(e) {
	e.preventDefault();

	var groupInstanceURI = $(e.target).closest('.question-group').data('uri');

	var groupInstance = this.getGroupInstance(groupInstanceURI);
	var dom = this.getTabDom(groupInstanceURI);

	// If is EditMode, delete group is not allow
	if(this.giw.isEditMode) {
		// prevent tab from deleting.
		e.stopImmediatePropagation();  
		return false;
	}

	// if the tab is not already open, Get Questions belong to this group, passing the current DOM as the parameter
	if(!this.isTabOpen(groupInstanceURI)) {

		this.onDeleteGroupClick(dom, groupInstance);

	}

}



GroupListWidget.prototype._onTabClick = function(e) {
	e.preventDefault();
	e.stopImmediatePropagation();  // This will prevent the tab to adopt default functions from outside code which could cause issues.

	var groupInstanceURI = $(e.target).data('uri');

	var groupInstance = this.getGroupInstance(groupInstanceURI);
	var dom = this.getTabDom(groupInstanceURI);
	var contentDom = this.getContentDom(groupInstanceURI);
	var onTabClick = this.onTabClick;

	// If is EditMode, change tap is not allowed
	if(this.giw.isEditMode) {
		// prevent tab from closing.
		// e.stopImmediatePropagation();  
		return false;
	}

	// if the tab is not already open, Get Questions belong to this group, passing the current DOM as the parameter
	if(!this.isTabOpen(groupInstanceURI)) {

		console.warn('Open Button Clicked', CommonHelperFunction.timeToStandardTime(new Date().getTime()));

		this.closeAllTabs();

		contentDom.empty();

		contentDom.addClass('in');

		onTabClick(dom, groupInstance);

	} else {

		contentDom.removeClass('in');
	}
}


GroupListWidget._groupToHTML = function(obj, index) {
	var text = "";
	var sectionName = obj.groupName;
	var uri = obj.uri;
	var status = 'box-primary';
	var summary = obj.summary;
	var isAbleToRemove = obj.isAbleToRemove;
	var groupIndex = obj.groupIndex || 100000000;
	index = index || 0;

	text += '<div class="panel box ' + status + ' question-group" uri="' + uri + '" id="group' + index + '" data-group-index="' + groupIndex + '">';
	text += 	'<div class="box-header with-border">';
	// text += 		'<input type="checkbox" style="margin-right: 10px;" />';
	text += 		'<h4 class="box-title">';
	text += 			'<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + index + '">';
	text += 				sectionName + '&nbsp&nbsp&nbsp&nbsp&nbsp<small>' + summary + '</small>';
	text += 			'</a>';
	text += 		'</h4>';

	if(isAbleToRemove) {
		text += '<div class="box-tools pull-right">';
		text += '<button type="button" class="btn btn-box-tool delete-group-button"><i class="fa fa-times"></i></button>';
		text += '</div>';
	}

	text += 	'</div>';

	text +=		'<div id="collapse' + index + '" class="panel-collapse collapse">';

	text += 	'</div>';
	text += '</div>';

	return text;
}


module.exports = GroupListWidget;



/***/ }),
/* 2 */
/***/ ((module) => {

const GroupInstanceWidget = function (config) {
    this.config = config || {};
    this.eventMessageHandler = null; // handle false input type message notification.
    this.MNW = config.MNW;
    this.dom = null;
    this.isEditMode = false;

    this.isCommentGroup = false;
    this.objectsToSendWithSaveComment = []; // include these objects as payload when sending SubmitGroupRowAnswersRequest request
    this.objectsToSendWithGetComment = []; // include these objects as payload when sending GetGroupRowInstancesRequest request
    this.commentRowGetFromServer = []; // rowInstance and q-a instance tree get from the server by GetGroupRowInstancesRequest

    if (config.panel) {
        this.GROUP_QUESTION_CONTEXT_VALUE = config.panel.getContextLevel() || 0;
    }

    this.selector = {
        editButton: ".edit-form",
        saveButton: ".confirm-form",
        setToDefaultButton: ".set-to-default-button",
        addRowButton: ".add-row",
        addRowButtonLabel: ".add-row-button-label",
        deleteRowButton: ".delete-row",
        deleteRowButtonLabel: ".delete-row-button-label",
        updateRowButton: ".update-row",
        resetRowButton: ".reset-row",
        selectRowButton: ".select-row",
        checkRow: ".check-row",
        selectRowSelectInput: ".select-input-for-row-selection",
        rowInstance: ".row-item",
        row: ".row-group",
        dependencyButton: ".dependency-button",
        HEADER_BUTTONS: ".giw-header-buttons",
        FOOTER_BUTTONS: ".giw-footer-buttons",
    };

    // Keep Recording whether the question in the group is enable or not according to the dependency relationship
    this.mappingIsQuestionEnable = {};

    this.cache = {};

    this.rowColors = ["#efefef", "#efefe3", "#f3f3f3"];
    this.mappingRowLabel = config.mappingRowLabel || {}; // This should maping the rowTypeURI with the label name.

    this.onSaveClickSetTimeoutHandler = null; // Using for Header and footer buttons if no message come back after save button clicked.
    this.onSaveClickSetTimeoutTime = 100000;

    // this is recording objects that is under mediaRowInstances, including rowInstance, edge to rowInstances, questionInstance and answerInstance.
    // when saving the whole group, object inside this will be skiped.
    this.instancesRelatedToMediaRowInstance = {};

    // sometimes we will need to go to a page that is specified to the answer instance itself.
    // this property will indicate the prefix to the file instance page.
    this.fileAnswerInstanceDetailsURLPrefix = config.fileAnswerInstanceDetailsURLPrefix;

    var registeredGroupValidators = config.panel ? config.panel.registeredGroupValidators || [] : [];
    for (var i = 0; i < registeredGroupValidators.length; i++) {
        var registeredValidator = registeredGroupValidators[i];
        switch (registeredValidator.type) {
            case GroupInstanceWidget.VALIDATOR_TYPE.RowTypeAndAnswerType:
                if (!registeredValidator.rowType || !registeredValidator.answerType) {
                    console.error(
                        "rowType and answerType should be provided for " +
                            GroupInstanceWidget.VALIDATOR_TYPE.RowTypeAndAnswerType +
                            " validator type",
                        registeredValidator
                    );
                }
                break;
            case GroupInstanceWidget.VALIDATOR_TYPE.AnswerType:
                if (!registeredValidator.answerType) {
                    console.error(
                        "answerType should be provided for " +
                            GroupInstanceWidget.VALIDATOR_TYPE.AnswerType +
                            " validator type",
                        registeredValidator
                    );
                }
                break;
            case GroupInstanceWidget.VALIDATOR_TYPE.AnswerClassAndDataType:
                if (!registeredValidator.answerClass || !registeredValidator.dataType) {
                    console.error(
                        "answerClass and dataType should be provided for " +
                            GroupInstanceWidget.VALIDATOR_TYPE.AnswerClassAndDataType +
                            " validator type",
                        registeredValidator
                    );
                }
                break;
            case GroupInstanceWidget.VALIDATOR_TYPE.AnswerClass:
                if (!registeredValidator.answerClass) {
                    console.error(
                        "answerClass should be provided for " +
                            GroupInstanceWidget.VALIDATOR_TYPE.AnswerClass +
                            " validator type",
                        registeredValidator
                    );
                }
                break;
            default:
                console.error("No such register validator type handled: ", registeredValidator.type);
                break;
        }
        if (!registeredValidator.errorMessage || !registeredValidator.validator) {
            console.error("errorMessage and validator should be provided for a registeredValidator.");
        }
        if (typeof registeredValidator.validator !== "function") {
            console.error("validator should be provided for a valid method.");
        }
    }
};

GroupInstanceWidget.SELECTOR = {
    INITIAL_HIDE: ".initial-hide",
};

GroupInstanceWidget.SELECTOR_BUTTON_EDIT_MEDIA_ROW = ".edit-media-row";
GroupInstanceWidget.SELECTOR_BUTTON_SAVE_MEDIA_ROW = ".save-media-row";
GroupInstanceWidget.SELECTOR_BUTTON_CANCEL_MEDIA_ROW = ".cancel-media-row";
GroupInstanceWidget.SELECTOR_BUTTON_DELETE_MEDIA_ROW = ".delete-media-row";
GroupInstanceWidget.SELECTOR_BUTTON_ADD_MEDIA_ROW = ".add-media-row";

GroupInstanceWidget.SELECTOR_INITIAL_HIDE = ".initial-hide";
GroupInstanceWidget.SELECTOR_INITIAL_SHOW = ".initial-show";
GroupInstanceWidget.SELECTOR_EDIT_HIDE = ".edit-hide-inline";
GroupInstanceWidget.SELECTOR_EDIT_SHOW = ".edit-show-inline";

GroupInstanceWidget.SELECTOR_ROW_INSTANCE = ".row-item";
GroupInstanceWidget.SELECTOR_MEDIA_ROW_INSTANCE = ".media-row-instance";
GroupInstanceWidget.CLASS_MEDIA_ROW_INSTANCE = "media-row-instance";

GroupInstanceWidget.COMMAND_DELETE_GROUP_ROW_ANSWERS_REQUEST =
    "http://vital.ai/ontology/harbor-ai#DeleteGroupRowAnswersRequest";
GroupInstanceWidget.COMMAND_UPDATE_GROUP_ROW_ANSWERS_REQUEST =
    "http://vital.ai/ontology/harbor-ai#UpdateGroupRowAnswersRequest";
GroupInstanceWidget.COMMAND_GET_GROUP_ROW_INSTANCE_REQUEST =
    "http://vital.ai/ontology/harbor-ai#GetGroupRowInstancesRequest";
GroupInstanceWidget.COMMAND_SUBMIT_GROUP_ROW_ANSWERS_REQUEST =
    "http://vital.ai/ontology/harbor-ai#SubmitGroupRowAnswersRequest";

GroupInstanceWidget.PROPERTY_HAS_HARBOR_REQUIRED_QUESTION_CONTEXT_URI = "harborRequiredQuestionContextURI";
GroupInstanceWidget.GROUP_QUESTION_CONTEXT_VALUE_MAPPING = {
    "http://vital.ai/ontology/harbor-ai#HarborRequiredQuestionContext_APPETITE": 1,
    "http://vital.ai/ontology/harbor-ai#HarborRequiredQuestionContext_BIND": 5,
    "http://vital.ai/ontology/harbor-ai#HarborRequiredQuestionContext_ISSUANCE": 6,
    "http://vital.ai/ontology/harbor-ai#HarborRequiredQuestionContext_OPPORTUNITY": 2,
    "http://vital.ai/ontology/harbor-ai#HarborRequiredQuestionContext_QUOTE": 4,
    "http://vital.ai/ontology/harbor-ai#HarborRequiredQuestionContext_SUBMISSION": 3,
};

GroupInstanceWidget.TYPE_ROW_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyRowInstance';

GroupInstanceWidget.VALIDATOR_TYPE = {
    RowTypeAndAnswerType: "rowTypeAndAnswerType",
    AnswerType: "answerType",
    AnswerClassAndDataType: "answerClassAndDataType",
    AnswerClass: "answerClass",
};

/*********************************************************************************
 * Prameters for config:
 * isEditButton: boolean.
 * isSaveButton: boolean
 * isSetToDefaultButton: boolean
 * isRowFunctional: boolean
 * isSelectRowNotFunctional: boolean
 * isAnswerFollowupTypeFunctional: boolean
 * isDisplayOnly: boolean     // true: the widget will not have the function of Edit. But will show the dependency
 * isShowDependencyButton:
 * fileAnswerInstanceDetailsURLPrefix: string
 * groupQuestionContext: GroupInstanceWidget.GROUP_QUESTION_CONTEXT_VALUE_MAPPING
 *
 * onEditButtonClickHandler: function
 * onSaveButtonClick: function(dom, groupInstance) {}
 * onSetToDefaultButtonHandler: function
 * onShowDependencyButtonHandler: function
 **********************************************************************************/

/*********************************************************************************
 * Prameters for additionalConfig:
 * objectsToSendWithSaveComment: []  // include these objects as payload when sending SubmitGroupRowAnswersRequest request
 * objectsToSendWithGetComment: []   // include these objects as payload when sending GetGroupRowInstancesRequest request
 **********************************************************************************/

GroupInstanceWidget.prototype.clean = function () {
    if (this.dom) {
        this.dom.off();
    }
};

GroupInstanceWidget.prototype.onAIMPMessage = function (msgRL) {
    var msg = msgRL.first();

    if(msg.type != 'http://vital.ai/ontology/harbor-ai#HarborAppRefreshMessage') {
		return;
    }
    
    var targetURI = msg.get('targetURI');

    if (targetURI !== this.bindObjectURI) {
      return;
    }

    var eventType = msg.get('collectionTypeURI');
};

GroupInstanceWidget.prototype.sourceData = function (msgRL) {
    // console.log('sourceData');
    this.msgRL = msgRL;
    this._mapDataIntoThisObject();
};

GroupInstanceWidget.prototype.setDom = function (dom) {
    var _this = this;

    if (_this.dom) {
        _this.dom.off();
    }

    _this.dom = dom;

    // Handle QuestionChoice question's single choice property
    dom.on("click", ".single-choice", function () {
        var p = $(this).parent();
        var value = $(this).val();
        p.find("input").each(function () {
            if ($(this).val() !== value) {
                $(this).prop("checked", false);
            }
        });
    });

    // Use for select Quote
    dom.on("change", _this.selector.checkRow, function (e) {
        e.preventDefault();

        var uri = $(this).closest(".row-item").attr("row-instance-uri");
        var rowInstance = _this.mappingGroupObjects[uri];

        if ($(this).is(":checked")) {
            rowInstance.set("selectedRowInstance", true);
        } else {
            rowInstance.set("selectedRowInstance", false);
        }
    });

    // input value checking.
    dom.on("keyup", ".wrapped-question", _this._keyupHandler.bind(_this));
    dom.on("blur", ".wrapped-question", _this._keyupHandler.bind(_this));

    // Enable Inputs every time some inputs are changed.
    // changing update the answerfollowupType for every answerInstance changed.
    dom.on("change", ".wrapped-question", _this._onWrappedQuestionInputChange.bind(_this));

    //Handle Add Row Function.
    dom.on("click", _this.selector.addRowButton, _this._onAddRowButtonClick.bind(_this));

    //Handle Add Row Horizontal Function.
    dom.on("click", ".add-row-horizontal", _this._onAddRowHorizontalButtonClick.bind(_this));

    //Handle delete Row Horizontal Function.
    dom.on("click", ".delete-row-horizontal", _this._onDeleteRowHorizontalButtonClick.bind(_this));

    // Handle delete row
    dom.on("click", _this.selector.deleteRowButton, _this._onDeleteRowButtonClick.bind(_this));

    // Handle update row
    dom.on("click", _this.selector.updateRowButton, _this._onUpdateRowButtonClick.bind(_this));

    // Handle reset row
    dom.on("click", _this.selector.resetRowButton, _this._onResetRowButtonClick.bind(_this));

    // Select row values to fill in.
    dom.on("click", ".select-row", _this._onSelectButtonClick.bind(_this));

    dom.on("click", ".dev-test-button", _this._onTestButtonClick.bind(_this));

    dom.on("click", ".answer-follow-up-plus-simble", _this._onAnswerFollowUpPlusSimbleClick.bind(_this));

    dom.on("change", ".answer-follow-type-horizontal", _this._onHorizontalAnswerFollowUpTypeChange.bind(_this));

    dom.on("click", _this.selector.editButton, _this._onEditButtonClick.bind(_this));

    dom.on("click", _this.selector.dependencyButton, _this._onDependencyButtonClick.bind(_this));

    // comment row handlers
    dom.on("click", ".save-comment", _this._onSaveCommentClick.bind(_this));

    dom.on("click", ".get-comment", _this._onGetCommentClick.bind(_this));

    dom.on("click", ".cancel-comment", _this._onCancelCommentClick.bind(_this));

    // media row handlers
    dom.on("click", GroupInstanceWidget.SELECTOR_BUTTON_EDIT_MEDIA_ROW, _this._onEditMediaRowClick.bind(_this));

    dom.on("click", GroupInstanceWidget.SELECTOR_BUTTON_CANCEL_MEDIA_ROW, _this._onCancelMediaRowClick.bind(_this));

    dom.on("click", GroupInstanceWidget.SELECTOR_BUTTON_SAVE_MEDIA_ROW, _this._onSaveMediaRowClick.bind(_this));

    dom.on("click", GroupInstanceWidget.SELECTOR_BUTTON_DELETE_MEDIA_ROW, _this._onDeleteMediaRowClick.bind(_this));

    dom.on("click", GroupInstanceWidget.SELECTOR_BUTTON_ADD_MEDIA_ROW, _this._onAddMediaRowClick.bind(_this));

    dom.keypress(function (e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
            e.preventDefault();
            return false;
        }
    });
};

GroupInstanceWidget.prototype.setMNW = function (MNW) {
    this.MNW = MNW;
};

GroupInstanceWidget.prototype.disableHeaderAndFooterButtons = function () {
    this._disableHeaderAndFooterButtons();
};

GroupInstanceWidget.prototype.enableHeaderAndFooterButtons = function () {
    this._enableHeaderAndFooterButtons();
};

/**
 * some config property might need to be set after initializing the widget
 */
GroupInstanceWidget.prototype.setAdditionalConfig = function (config) {
    var _this = this;
    Object.keys(config).forEach(function (key) {
        _this[key] = config[key];
    });
};

GroupInstanceWidget.prototype.getDom = function () {
    return this.dom;
};

GroupInstanceWidget.prototype.setMainObject = function (obj) {
    this.mainObject = obj;
};

GroupInstanceWidget.prototype.setSubmissionObject = function (submissionObject) {
    this.submissionObject = submissionObject;
};

// add button and handler to the widget. Button should be register after the render function.
GroupInstanceWidget.prototype.registerButton = function (button, handler) {
    if (button.includes("bind-request")) {
        const bindQuoteRow = _this.groupRows.filter(row => {
            return row.get('haleyRowTypeURI') === 'http://vital.ai/haley.ai/harbor-saas/HaleyRowType/BindQuote'
        })

        if (bindQuoteRow.length > 0) {
            $(`div[row-uri="${bindQuoteRow[0].URI}"]`).find('.row-instance-header').eq(0).before(button);
        }

        // // mock branch bind request testing:
        // $('div[row-uri="http://vital.ai/haley.ai/harbor-saas/HaleyRow/BrokerQuoteOption-BindQuote-BindQuote"]')
        //   .find('.row-instance-header')
        //   .before(button);
    } else {
        this.dom.find(this.selector.HEADER_BUTTONS).append(button);
        this.dom.find(this.selector.FOOTER_BUTTONS).append(button);
    }
    if (handler) {
        handler();
    }
};

GroupInstanceWidget.prototype.getAllInstanceObjects = function () {
    var _this = this;

    var results = [];

    results.push(...this.groupGroupInstances);
    results.push(...this.groupEdgeHasSectionInstance);
    results.push(...this.groupSectionInstances);
    this.groupEdgeHasRowInstance.forEach(function (edge) {
        if (!_this.instancesRelatedToMediaRowInstance[edge.URI]) results.push(edge);
    });
    this.groupRowInstances.forEach(function (rowInstance) {
        if (!_this.instancesRelatedToMediaRowInstance[rowInstance.URI]) results.push(rowInstance);
    });

    var mappingQuestionInstanceToAnswerInstance = this.mappingQuestionInstanceToAnswerInstance;
    var mappingQuestionInstanceToQuestion = this.mappingQuestionInstanceToQuestion;
    var groupEdgeHasQuestionInstances = this.groupEdgeHasQuestionInstance;
    var mappingAnswerInstanceToQuestionDom = this.mappingAnswerInstanceToQuestionDom;

    // Hidden Question Shouldn't be Submit
    groupEdgeHasQuestionInstances.forEach(function (edge) {
        var questionInstanceURI = edge.get("edgeDestination");
        var question = mappingQuestionInstanceToQuestion[questionInstanceURI];
        var objs = mappingQuestionInstanceToAnswerInstance[questionInstanceURI];

        if (!question.get('hiddenInGroupDisplay')) {
            var questionModule = mappingAnswerInstanceToQuestionDom[objs.answerInstance.URI];

            if (!question.get("hiddenQuestion") && !questionModule.isInsideMediaRow) {
                results.push(edge);
                results.push(objs.questionInstance);
                results.push(objs.edge);
                results.push(objs.answerInstance);
            }
        } 
        
    });

    return results;
};

GroupInstanceWidget.prototype.getAllInstanceUnderRowInstance = function (rowInstance) {
    var results = [];
    results.push(rowInstance);
    var edges = this.msgRL.iterator(DOMAINS_CONSTANT.TYPE_EDGE);
    var edgesToThisInstance = edges.filter(function (edge) {
        return edge.get("edgeSource") === rowInstance.URI;
    });

    var mappingQuestionInstanceToAnswerInstance = this.mappingQuestionInstanceToAnswerInstance;
    var mappingQuestionInstanceToQuestion = this.mappingQuestionInstanceToQuestion;

    // Hidden Question Shouldn't be Submit
    edgesToThisInstance.forEach(function (edge) {
        var questionInstanceURI = edge.get("edgeDestination");
        var question = mappingQuestionInstanceToQuestion[questionInstanceURI];
        var objs = mappingQuestionInstanceToAnswerInstance[questionInstanceURI];

        if (!question.get("hiddenQuestion")) {
            results.push(edge);
            results.push(objs.questionInstance);
            results.push(objs.edge);
            results.push(objs.answerInstance);
        }
    });

    return results;
};

GroupInstanceWidget.prototype.getGroupInstance = function () {
    if (!this.msgRL) {
        console.error("No Source Data Init");
    }

    var groupInstances = this.msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleyGroupInstance");

    if (groupInstances.length === 0) {
        console.error("No GroupInstance in the source msgRL");
    }

    if (groupInstances.length > 1) {
        console.error("Multiple GroupInstance Object exist in the date", groupInstances);
    }

    return groupInstances[0];
};

GroupInstanceWidget.prototype.getBindRequest = function () {
    if (!this.msgRL) {
        console.error("No Source Data Init");
    }

    var bindRequests = this.msgRL.iterator("http://vital.ai/ontology/harbor-ai#HarborBindRequest");

    if (bindRequests.length === 0) {
        console.error("No bindRquest object found");
        return null;
    }

    if (bindRequests.length > 1) {
        console.error("Multiple BindRequest Object exist in the date");
    }

    return bindRequests[0];
};

GroupInstanceWidget.prototype.getObjectByURI = function (uri) {
    return _this.msgRL ? _this.msgRL.get(uri) : null;
};

GroupInstanceWidget.prototype.render = function (msgRL) {
    var _this = this;

    if (msgRL) this.sourceData(msgRL);

    _this._printTree();

    _this.inputErrorRecording = {};

    // mapping answerInstanceURI to the questionDomObject; Need to be changed when deleteRow or addRow happened.
    _this.mappingAnswerInstanceToQuestionDom = {};
    _this.mappingTaxonomyAnswerInstanceToFancyTree = {};

    var dom = _this.dom;

    var sections = _this.groupSections;
    var groupInstances = _this.groupGroupInstances;
    var groups = _this.msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleyGroup");
    var sectionInstanceMapping = _this.mappingSectionToSectionInstances;

    var groupInstance = groupInstances.length > 0 ? groupInstances[0] : null;
    var group = groups.length > 0 ? groups[0] : null;
    var isCommentGroup = false;

    if (!groupInstance || !group) {
        console.error(
            "Both Group and GroupInstance object should be provided. here is the group and groupInstance Receive respectively: ",
            group,
            groupInstance
        );
        return;
    }

    var groupType = group.get("harborGroupTypeURI");
    // if true, then only four header buttons allowed: edit, save, cancel, get-quote-indication
    var isGroupQuoteIndication = groupType === "http://vital.ai/ontology/harbor-ai#GroupType_QUOTE_INDICATION";

    var sectionsPartial = [];

    // sort sections based on their ID.
    sections.sort(function (a, b) {
        return a.get("sectionIndex") - b.get("sectionIndex");
    });

    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var sectionInstance = sectionInstanceMapping[section.URI];
        if (!sectionInstance) {
            console.error("No sectionInstance object pair with the section: ", section);
            continue;
        }
        sectionsPartial.push({ section: _this._sectionInstanceToHTML(sectionInstance) });
    }

    var data = {
        groupInstanceURI: groupInstance.URI,
        isSetToDefaultButton: _this.config.isSetToDefaultButton && !isCommentGroup,
        isShowDependencyButton: _this.config.isShowDependencyButton && !isCommentGroup,
        isSaveButton: _this.config.isSaveButton && !isCommentGroup,
        isEditButton: _this.config.isEditButton && !isCommentGroup,
        sections: sectionsPartial,
        isGroupQuoteIndication: isGroupQuoteIndication,
    };

    var t = JST["templates/giw/group-instance.hbs"];

    dom.html(t(data));

    dom.find(".initial-hide").css("display", "none");

    // Create A Jquery Object for every QuestionDomObject under dom;
    _this._initDomValueForQuestionDomObject(dom);

    // Dependency Questions are initial to be Hiden.
    _this._enableInputs(dom);

    _this._hideDependencyQuestions(dom);

    // Disable all inputs after all the questions are loaded
    _this._disableAllInput(dom);

    console.warn("Dom Rendered", CommonHelperFunction.timeToStandardTime(new Date().getTime()));

    if (_this.config.isSetToDefaultButton) {
        dom.find(_this.selector.setToDefaultButton).on("click", function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            if (!_this.isEditMode) {
                return false;
            }

            // seting answerInstance which has no_answer answerfollowupType to default answer and update the dom accordingly.
            _this.groupAnswerInstances.forEach(function (element) {
                _this._setAnswerValueToDefault(element);
            });
        });
    }

    // handle submission and make all input disabled and close the tab
    if (_this.config.isSaveButton) {
        if (_this.config.onSaveButtonClick) {
            dom.find(_this.selector.saveButton).on("click", _this._onSaveButtonClick.bind(_this));
        } else {
            console.error("On Save Function Should be Provided on Config Object");
        }
    }

    // Handle Row Functional
    if (_this.config.isRowFunctional) {
        // Get row list for the selection:
        dom.find("select.select-input-for-row-selection").each(function () {
            var rowURI = $(this).parents(".row-group").attr("row-uri");
            var row = _this.mappingGroupObjects[rowURI];
            if (row) {
                _this._getSelectionOptionsForRow(row, $(this));
            }
        });
    }

    _this._enforceConfig(dom);
};

// Mapping Group Question Data Into GroupInstanceWidget
GroupInstanceWidget.prototype._mapDataIntoThisObject = function () {
    // msgRL: vitaljs object which include a group of question objects
    // console.log('_mapDataIntoThisObject');
    var _this = this;

    var msgRL = _this.msgRL;

    _this.groupAllObjects = msgRL.iterator();
    _this.groupEdgeHasGroupInstance = msgRL.iterator(
        "http://vital.ai/ontology/haley-ai-question#Edge_hasGroupInstance"
    );
    _this.groupEdgeHasSection = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#Edge_hasSection");
    _this.groupEdgeHasRow = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#Edge_hasRow");
    _this.groupEdgeHasQuestion = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion");
    _this.groupEdgeHasAnswer = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer");
    _this.groupEdgeHasSectionInstance = msgRL.iterator(
        "http://vital.ai/ontology/haley-ai-question#Edge_hasSectionInstance"
    );
    _this.groupEdgeHasRowInstance = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance");
    _this.groupEdgeHasQuestionInstance = msgRL.iterator(
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
    );
    _this.groupEdgeHasAnswerInstance = msgRL.iterator(
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance"
    );
    _this.groupEdgeHasAnswerOption = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption");
    _this.groupEdgeHasAnswerDependency = msgRL.iterator(
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerDependency"
    );
    _this.groupEdgeHasAnswerOptionValueDependency = msgRL.iterator(
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOptionValueDependency"
    );
    _this.groupEdgeHasAnswerOptionDependency = msgRL.iterator(
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOptionDependency"
    );
    _this.groupEdgeHasQuestionDependency = msgRL.iterator(
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionDependency"
    );
    _this.groupEdgeHasDefaultAnswer = msgRL.iterator(
        "http://vital.ai/ontology/haley-ai-question#Edge_hasDefaultAnswer"
    );
    _this.groupEdgeHasTaxonomy = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#Edge_hasTaxonomy");
    _this.groupEdgeHasEnhancementRultDependency = msgRL.iterator(
        "http://vital.ai/ontology/haley-ai-question#Edge_hasEnhancementRuleDependency"
    );

    _this.groupSections = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleySection");
    _this.groupRows = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleyRow");
    _this.groupQuestions = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleyQuestion");
    _this.groupAnswers = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleyAnswer");
    _this.groupGroupInstances = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleyGroupInstance");
    _this.groupInstance = _this.groupGroupInstances[0];
    _this.groupSectionInstances = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleySectionInstance");
    _this.groupRowInstances = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleyRowInstance");
    _this.groupQuestionInstances = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance");
    _this.groupAnswerInstances = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleyAnswerInstance");
    _this.groupAnswerOptions = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption");
    _this.groupDefaultAnswer = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleyDefaultAnswer");
    _this.groupTaxonomyNodes = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleyTaxonomy");
    // _this.groupAnswerOptionDependency =  msgRL.iterator('http://vital.ai/ontology/haley-ai-question#HaleyAnswerOptionDependency');
    
    // _this.groupRowInstances.sort((a, b) => (a.get('rowInstanceCounter') > b.get('rowInstanceCounter') ? 1 : -1));

    var cmp = function(a, b) {
        if (a > b) return +1;
        if (a < b) return -1;
        return 0;
    }

    _this.groupRowInstances.sort((a, b) => {
      return cmp(a.get('rowInstanceCounter').length, b.get('rowInstanceCounter').length) || cmp(a.get('rowInstanceCounter'), b.get('rowInstanceCounter'));
    });
 
    var indexToCapitalCharactor = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    for (let i = 0; i < _this.groupRowInstances.length; i++) {
        if (
          !_this.groupRowInstances[i].get('ableToBeDeleted') &&
          !_this.groupRowInstances[i].get('readOnlyRowValue') &&
          !_this.groupRowInstances[i].get('rowInstanceCounter')
        ) {
            const char = [];
            const div = i / 26;
            const mod = i % 26;
            if (div >= 1) {
                var idx = Math.floor(div) - 1;
                char.push(indexToCapitalCharactor[idx]);
            } 
            if (i >= 26) {
                if (mod >= 1) {
                    var idx = Math.floor(mod);
                    char.push(indexToCapitalCharactor[idx]);
                } else {
                    var idx = 0;
                    char.push(indexToCapitalCharactor[idx]);
                }
            } else {
                var idx = i;
                char.push(indexToCapitalCharactor[idx]);
            }
          _this.groupRowInstances[i].set('rowInstanceCounter', char.join(''));
        }
    }

    _this.groupEdgeHasQuestion.sort(function (a, b) {
        return a.get("questionIndex") - b.get("questionIndex");
    });

    var mappingGroupInstanceToGroup = {};

    _this.groupGroupInstances.forEach(function (element, index) {
        mappingGroupInstanceToGroup[element.URI] = msgRL.get(element.get("haleyGroup"));
    });
    _this.mappingGroupInstanceToGroup = mappingGroupInstanceToGroup;

    var mappingGroupObjects = {};
    var mappingQuestionToAnswer = {}; // base on question uri, get (question, edge, answer)
    var mappingQuestionInstanceToAnswerInstance = {};
    var mappingRowWithRowInstances = {};
    var mappingRowInstanceToRow = {};
    // based on the upper Instance URI, find the rowInstance Connect to that URI. the Upper Instance could be a row Instance or a sectionInstance
    var mappingUpperInstanceWithRowInstances = {};
    var mappingSectionToSectionInstances = {};
    var mappingSectionInstanceToSection = {};
    var mappingQuestionToQuestionInstance = {};
    var mappingQuestionInstanceToQuestion = {};
    var mappingAnswerInstanceToAnswer = {};
    var mappingAnswerInstanceToQuestionInstance = {};
    var mappingAnswerToDefaultAnswer = {};
    _this.mappingTaxonomyAnswerToTaxonomy = _this._mappingSourceURIToDestionationObjectOfEdges(
        msgRL,
        _this.groupEdgeHasTaxonomy
    );
    var mappingAnswerToAnswerOptionDependency = {}; // answerURI: AnswerOptionDependencyObj
    var mappingAnswerOptionDependencyToOptions = {}; // AnswerOptionDependencyObjectURI: AnswerOptions or TaxonomyNode.
    var mappingAnswerOptionDependencyToAnswer = {}; // AnswerOptionDependencyObjectURI: AnswerObject
    _this.mappingSectionOrRowToEnhancementDependency = _this._mappingSourceURIToDestionationObjectOfEdges(
        msgRL,
        _this.groupEdgeHasEnhancementRultDependency
    );

    var groupQuestions = _this.groupQuestions;
    var groupAnswers = _this.groupAnswers;
    var edgeHasAnswer = _this.groupEdgeHasAnswer;
    var answerOptions = _this.groupAnswerOptions;
    var edgeHasAnswerOption = _this.groupEdgeHasAnswerOption;

    _this.groupAllObjects.forEach(function (element, index) {
        if (element && element.URI) {
            mappingGroupObjects[element.URI] = element;
        }
    });
    _this.mappingGroupObjects = mappingGroupObjects;

    _this.groupSectionInstances.forEach(function (sectionInstance, index) {
        mappingSectionInstanceToSection[sectionInstance.URI] = msgRL.get(sectionInstance.get("haleySection"));
        if (!mappingSectionInstanceToSection[sectionInstance.URI]) {
            console.error("NO SECTION OBJECT MATHCH THIS SECTIONINSTANCE: ", sectionInstance);
        }
    });

    _this.groupSections.forEach(function (element, index) {
        var flag = true;
        for (var i = 0; i < _this.groupSectionInstances.length; i++) {
            var ins = _this.groupSectionInstances[i];
            if (element.URI === ins.get("haleySection")) {
                flag = false;
                break;
            }
        }
        if (flag) {
            console.error("NO SECTIONINSTANCE OBJECT MATCH THIS SECTION: ", element);
        }
    });

    _this.mappingSectionInstanceToSection = mappingSectionInstanceToSection;

    _this.groupQuestionInstances.forEach(function (element, index) {
        var uri = element.get("haleyQuestion");
        mappingQuestionInstanceToQuestion[element.URI] = msgRL.get(uri);
        if (mappingQuestionToQuestionInstance.hasOwnProperty(uri)) {
            mappingQuestionToQuestionInstance[uri].push(element);
        } else {
            mappingQuestionToQuestionInstance[uri] = [element];
        }
    });

    _this.mappingQuestionToQuestionInstance = mappingQuestionToQuestionInstance;
    _this.mappingQuestionInstanceToQuestion = mappingQuestionInstanceToQuestion;

    for (var i in groupQuestions) {
        var question = groupQuestions[i];
        for (var j in edgeHasAnswer) {
            var edge = edgeHasAnswer[j];
            if (edge.get("edgeSource") === question.URI) {
                var answer = _this._getDestinationObjectOfEdge(edge);
                if (!answer) {
                    console.error("Can Not Find Answer Object related to the Question Object and Edge: ");
                    console.error("The Question Object is: ", question);
                    console.error("The Edge Object is: ", edge);
                }
                mappingQuestionToAnswer[question.URI] = {
                    question: question,
                    edeg: edge,
                    answer: answer,
                };

                if (
                    answer.type === "http://vital.ai/ontology/haley-ai-question#HaleyChoiceAnswer" ||
                    answer.type === "http://vital.ai/ontology/haley-ai-question#HaleyMultiChoiceAnswer"
                ) {
                    for (var k in edgeHasAnswerOption) {
                        var answerOptionEdge = edgeHasAnswerOption[k];
                        if (answer.URI === answerOptionEdge.get("edgeSource")) {
                            var option = _this._getDestinationObjectOfEdge(answerOptionEdge);
                            mappingQuestionToAnswer[question.URI]["optionEdge"] = answerOptionEdge;
                            mappingQuestionToAnswer[question.URI]["option"] = option;
                            break;
                        }
                    }
                }
                break;
            }
        }
        if (!mappingQuestionToAnswer[question.URI]) {
            console.error("Edge_hasAnswer is missing for the question: ", question);
        }
    }

    _this.mappingQuestionToAnswer = mappingQuestionToAnswer;

    var groupQuestionInstances = _this.groupQuestionInstances;
    var edgeHasAnswerInstance = _this.groupEdgeHasAnswerInstance;

    for (var i in groupQuestionInstances) {
        var questionInstance = groupQuestionInstances[i];
        for (var j in edgeHasAnswerInstance) {
            var edge = edgeHasAnswerInstance[j];
            if (edge.get("edgeSource") === questionInstance.URI) {
                var answerInstance = _this._getDestinationObjectOfEdge(edge);
                mappingQuestionInstanceToAnswerInstance[questionInstance.URI] = {
                    questionInstance: questionInstance,
                    edge: edge,
                    answerInstance: answerInstance,
                };

                mappingAnswerInstanceToQuestionInstance[answerInstance.URI] = questionInstance;

                break;
            }
        }
    }
    _this.mappingAnswerInstanceToQuestionInstance = mappingAnswerInstanceToQuestionInstance;
    _this.mappingQuestionInstanceToAnswerInstance = mappingQuestionInstanceToAnswerInstance;

    _this.groupRowInstances.forEach(function (element, index) {
        var uri = element.get("haleyRow");
        mappingRowInstanceToRow[element.URI] = msgRL.get(uri);
        if (mappingRowWithRowInstances.hasOwnProperty(uri)) {
            mappingRowWithRowInstances[uri].push(element);
        } else {
            mappingRowWithRowInstances[uri] = [element];
        }
    });
    _this.mappingRowWithRowInstances = mappingRowWithRowInstances;
    _this.mappingRowInstanceToRow = mappingRowInstanceToRow;

    _this.groupEdgeHasRowInstance.forEach(function (element, index) {
        var upperInstanceURI = element.get("edgeSource");
        var lowerInstance = _this.mappingGroupObjects[element.get("edgeDestination")];
        if (mappingUpperInstanceWithRowInstances[upperInstanceURI]) {
            mappingUpperInstanceWithRowInstances[upperInstanceURI].push(lowerInstance);
        } else {
            mappingUpperInstanceWithRowInstances[upperInstanceURI] = [lowerInstance];
        }
    });
    _this.mappingUpperInstanceWithRowInstances = mappingUpperInstanceWithRowInstances;

    _this.groupSectionInstances.forEach(function (element, index) {
        var uri = element.get("haleySection");
        mappingSectionToSectionInstances[uri] = element;
    });
    _this.mappingSectionToSectionInstances = mappingSectionToSectionInstances;

    var mappingAnswerToAnswerInstance = {};
    _this.groupAnswerInstances.forEach(function (element, index) {
        var uri = element.get("haleyAnswer");
        if (mappingAnswerToAnswerInstance.hasOwnProperty(uri)) {
            mappingAnswerToAnswerInstance[uri].push(element);
        } else {
            mappingAnswerToAnswerInstance[uri] = [element];
        }
        mappingAnswerInstanceToAnswer[element.URI] = _this.mappingGroupObjects[uri];
        if (!mappingAnswerInstanceToAnswer[element.URI]) {
            console.error("NO ANSWER OBJECT FOUND TO MATCH THIS ANSWERISNTANCE: ", element);
        }
    });
    _this.mappingAnswerToAnswerInstance = mappingAnswerToAnswerInstance;
    _this.mappingAnswerInstanceToAnswer = mappingAnswerInstanceToAnswer;

    _this.groupEdgeHasQuestionInstances = msgRL.iterator(
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
    );
    _this.mappingQuestionInstanceToItsParent = _this._mappingDestinationURIToSourceObjectOfEdges(
        msgRL,
        _this.groupEdgeHasQuestionInstances
    );

    // Handle Dependency Data Mapping, It
    var mappingObjectToItsDependencies = {};
    var mappingAnswerURIToItsDependencyAndQuestionPairs = {};
    var mappingQuestionToDependencies = _this._mappingDestinationURIToSourceObjectsOfEdges(
        msgRL,
        _this.groupEdgeHasQuestionDependency
    );
    var mappingDependencyToAnswer = _this._mappingDestinationURIToSourceObjectOfEdges(
        msgRL,
        _this.groupEdgeHasAnswerDependency
    );
    var mappingAnswerToQuestion = _this._mappingDestinationURIToSourceObjectOfEdges(msgRL, _this.groupEdgeHasAnswer);
    Object.keys(mappingQuestionToDependencies).forEach(function (questionURI) {
        var dependencies = mappingQuestionToDependencies[questionURI];
        var answer = _this.mappingQuestionToAnswer[questionURI]["answer"];
        // console.warn(questionURI, dependency, answer);
        mappingObjectToItsDependencies[answer.URI] = mappingQuestionToDependencies[questionURI];
        for (dependency of dependencies) {
            var dependencyAnswer = mappingDependencyToAnswer[dependency.URI];
            var dependencyQuestion = mappingAnswerToQuestion[dependencyAnswer.URI];
            var dependencyQuestionInstances = mappingQuestionToQuestionInstance[dependencyQuestion.URI];
            // dependencyInstancePair will includes answerInstance, questionInstance and the edge between them
            var dependencyInstancePairs = dependencyQuestionInstances.map(function (questionInstance) {
                return mappingQuestionInstanceToAnswerInstance[questionInstance.URI];
            });

            if (mappingAnswerURIToItsDependencyAndQuestionPairs[answer.URI]) {
                mappingAnswerURIToItsDependencyAndQuestionPairs[answer.URI].push({
                    dependencyQuestion: dependencyQuestion,
                    dependency: dependency,
                    dependencyQuestionInstances: dependencyQuestionInstances,
                    dependencyInstancePairs: dependencyInstancePairs,
                });
            } else {
                mappingAnswerURIToItsDependencyAndQuestionPairs[answer.URI] = [
                    {
                        dependencyQuestion: dependencyQuestion,
                        dependency: dependency,
                        dependencyQuestionInstances: dependencyQuestionInstances,
                        dependencyInstancePairs: dependencyInstancePairs,
                    },
                ];
            }
        }
    });
    _this.mappingObjectToItsDependencies = mappingObjectToItsDependencies;
    _this.mappingAnswerURIToItsDependencyAndQuestionPairs = mappingAnswerURIToItsDependencyAndQuestionPairs;
    // End Handle Dependency Data Mapping

    // // Previous code of handling mapping the Object for dependency. Now The relation of Dependency is reversed.
    // _this.groupEdgeHasAnswerDependency.forEach( function(element, index) {
    // 	var sourceURI = element.get('edgeSource');
    // 	var destinationURI = element.get('edgeDestination');
    // 	if(sourceURI) {
    // 		mappingObjectToItsDependency[sourceURI] = mappingGroupObjects[destinationURI];
    // 	}
    // 	var dependencyObj = mappingGroupObjects[destinationURI];
    // 	if(dependencyObj) {
    // 		for(var i = 0; i <= _this.groupEdgeHasQuestionDependency.length; i++) {
    // 			var edge = _this.groupEdgeHasQuestionDependency[i];
    // 			if(edge.get('edgeSource') === dependencyObj.URI) {
    // 				mappingObjectToItsDependencyQuestion[sourceURI] = mappingGroupObjects[edge.get('edgeDestination')];
    // 				break;
    // 			}
    // 		}
    // 	}
    // });

    _this.groupEdgeHasAnswerOptionValueDependency.forEach(function (element) {
        var source = element.get("edgeSource");
        var destination = element.get("edgeDestination");
        if (source in mappingAnswerToAnswerOptionDependency) {
            mappingAnswerToAnswerOptionDependency[source].push(msgRL.get(destination));
        } else {
            mappingAnswerToAnswerOptionDependency[source] = [msgRL.get(destination)];
        }
    });

    _this.groupEdgeHasAnswerOptionDependency.forEach(function (element) {
        var source = element.get("edgeSource");
        var destination = element.get("edgeDestination");
        if (source in mappingAnswerOptionDependencyToOptions) {
            mappingAnswerOptionDependencyToOptions[source].push(msgRL.get(destination));
        } else {
            mappingAnswerOptionDependencyToOptions[source] = [msgRL.get(destination)];
        }
    });

    _this.mappingAnswerToAnswerOptionDependency = mappingAnswerToAnswerOptionDependency;
    _this.mappingAnswerOptionDependencyToOptions = mappingAnswerOptionDependencyToOptions;

    _this.groupEdgeHasDefaultAnswer.forEach(function (element, index) {
        var answeruri = element.get("edgeSource");
        mappingAnswerToDefaultAnswer[answeruri] = mappingGroupObjects[element.get("edgeDestination")];
    });
    _this.mappingAnswerToDefaultAnswer = mappingAnswerToDefaultAnswer;

    _this.mappingAnswerInstanceURIToEnhancementDependencyWrapper = _this._prepareDataForEnhancementAnswerDependency();

    _this.mappingRowInstanceToParent  = _this._mappingDestinationURIToSourceObjectOfEdges(
        msgRL,
        _this.groupEdgeHasRowInstance,
    );
};

GroupInstanceWidget.prototype._rowsUnderThisObjectToHtml = function (upperObject, upperObjectInstance, rowLevel) {
    var _this = this;

    rowLevel = rowLevel || 0;

    var rowEdges = this.groupEdgeHasRow;
    var edgeHasRowInstance = _this.groupEdgeHasRowInstance;
    var msgRL = this.msgRL;

    // Get Row belong to this Row
    var rowBelongToThisUpperObject = [];
    for (var e in rowEdges) {
        var edge = rowEdges[e];
        if (upperObject.URI === edge.get("edgeSource")) {
            rowBelongToThisUpperObject.push(msgRL.get(edge.get("edgeDestination")));
        }
    }

    rowBelongToThisUpperObject.sort(function (a, b) {
        return a.get("rowIndex") - b.get("rowIndex");
    });

    var text = "";

    for (var r in rowBelongToThisUpperObject) {
        var row = rowBelongToThisUpperObject[r];

        var rowDisplayType = row.get("harborDisplayStyleURI");

        if (rowDisplayType === "http://vital.ai/ontology/harbor-ai#DisplayStyle_ROW_HORIZONTAL") {
            text += _this._renderHorizontalRow(row, rowLevel, upperObjectInstance);
        } else if (row.URI === "http://vital.ai/haley.ai/harbor-saas/HaleyRow/Comments-Comments-Comment") {
            text += _this._renderCommentRow(row, rowLevel, upperObjectInstance);
        } else {
            var rowInstances = _this.mappingRowWithRowInstances[row.URI] || [];

            var isHiddenInGroupDisplay = row.get("hiddenInGroupDisplay");

            if (isHiddenInGroupDisplay) {
                text +=
                    '<div class="row-group hidden-in-group-display" row-uri="' +
                    row.URI +
                    '" row-level="' +
                    rowLevel +
                    '">';
            } else {
                text += '<div class="row-group" row-uri="' + row.URI + '" row-level="' + rowLevel + '">';
            }

            // From rowInstances, find the right ins that link to the upperObjectInstance object above.
            var counterIndex = 1;

            // rowInstances.sort(function (a, b) {
            //     var x = a.get("rowInstanceCounter"),
            //         y = b.get("rowInstanceCounter");
            //     if (x > y) return 1;
            //     else if (x < y) return -1;
            //     else return 0;
            // });

            var cmp = function(a, b) {
                if (a > b) return +1;
                if (a < b) return -1;
                return 0;
            }
            
            _this.groupRowInstances.sort((a, b) => {
            return cmp(a.get('rowInstanceCounter').length, b.get('rowInstanceCounter').length) || cmp(a.get('rowInstanceCounter'), b.get('rowInstanceCounter'));
            });

            var indexToCapitalCharactor = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            rowInstances.forEach(function (ins, index) {
                const char = [];
                const div = index / 26;
                const mod = index % 26;
                if (div >= 1) {
                    var idx = Math.floor(div) - 1;
                    char.push(indexToCapitalCharactor[idx]);
                } 
                if (index >= 26) {
                    if (mod >= 1) {
                        var idx = Math.floor(mod);
                        char.push(indexToCapitalCharactor[idx]);
                    } else {
                        var idx = 0;
                        char.push(indexToCapitalCharactor[idx]);
                    }
                } else {
                    var idx = index;
                    char.push(indexToCapitalCharactor[idx]);
                }
                ins.set('rowInstanceCounter', char.join(''));
   
                for (var ei = 0; ei < edgeHasRowInstance.length; ei++) {
                    var ed = edgeHasRowInstance[ei];
                    if (ed.get("edgeSource") === upperObjectInstance.URI && ed.get("edgeDestination") === ins.URI) {
                        text += _this._rowInstanceToHtml(row, ins, counterIndex++, rowLevel);
                    }
                }
            });

            


            var isRowInstanceMedia = false;
            rowInstances.forEach(function (rowInstance) {
                if (_this.instancesRelatedToMediaRowInstance[rowInstance.URI]) {
                    isRowInstanceMedia = true;
                }
            });

            if (_this.config.isRowFunctional) {
                text += '<hr style="margin-top: 0px;">';
                if (isRowInstanceMedia) {
                    text +=
                        '<div class="add-media-row pull-right btn btn-primary initial-hide edit-show-inline" row-uri="' +
                        row.URI +
                        '" style="magin-left: 10px; margin-right:10px;" tabindex = "-1">Add Row</div><label class="pull-right add-row-button-label initial-hide edit-show-inline" style="margin-top: 7px;">' +
                        row.get("name") +
                        "&nbsp&nbsp</label><br>";
                } else {
                    text +=
                        '<div class="add-row pull-right btn btn-primary initial-hide edit-show-inline" row-uri="' +
                        row.URI +
                        '" style="magin-left: 10px; margin-right:10px;" tabindex = "-1">Add Row</div><label class="pull-right add-row-button-label initial-hide edit-show-inline" style="margin-top: 7px;">' +
                        row.get("name") +
                        "&nbsp&nbsp</label><br>";
                }
            }

            text += "</div><br>"; // dom for row group
        }
    }

    return text;
};

GroupInstanceWidget.prototype._isObjectConnected = function (sourceObject, destinationObject, edgeType) {
    var edges = this.msgRL.iterator(edgeType);

    var isConnected = false;

    edges.forEach(function (edge) {
        if (edge.get("edgeSource") === sourceObject.URI && edge.get("edgeDestination") === destinationObject.URI) {
            isConnected = true;
        }
    });

    return isConnected;
};

GroupInstanceWidget.prototype._renderHorizontalRow = function (row, rowLevel, upperObjectInstance) {
    var _this = this;
    var msgRL = this.msgRL;

    var rowInstances = _this.mappingRowWithRowInstances[row.URI] || [];

    var questionEdges = _this.groupEdgeHasQuestion;

    // Get Questions Directly belong to this Row
    var questionsBelongToThisRow = [];
    for (e in questionEdges) {
        var edge = questionEdges[e];
        if (row.URI === edge.get("edgeSource")) {
            questionsBelongToThisRow.push(msgRL.get(edge.get("edgeDestination")));
        }
    }

    var data = {
        rowName: row.get("name") || "",
        rowURI: row.URI,
        rowLevel: rowLevel,
        headers: [],
        rowInstances: [],
        additionalStyleClasses: row.get("hiddenInGroupDisplay") ? "hidden-in-group-display" : "",
    };

    questionsBelongToThisRow.forEach(function (question, index) {
        if (!question.get("hiddenInGroupDisplay")) {
            data.headers.push({
                header: question.get("questionText"),
            });
        }
    });

    var indexNumber = 0;

    for (var index = 0; index < rowInstances.length; index++) {
        var rowInstance = rowInstances[index];

        if (
            upperObjectInstance &&
            !_this._isObjectConnected(
                upperObjectInstance,
                rowInstance,
                "http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance"
            )
        ) {
            continue;
        }

        var item = {
            index: ++indexNumber,
            rowIntanceURI: rowInstance.URI,
            answerInstances: [],
            isDeleteRowFunctional: !(rowInstance.get("readOnlyRowValue") || row.get("readOnlyRowValue")),
            additionalStyleClasses: rowInstance.get("hiddenInGroupDisplay") ? "hidden-in-group-display" : "",
        };

        var questionInstanceToThisRow = _this._getNextLevelObjects(
            msgRL,
            rowInstance,
            "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
        );

        for (var q = 0; q < questionsBelongToThisRow.length; q++) {
            var question = questionsBelongToThisRow[q];

            if (question.get("hiddenInGroupDisplay")) continue;

            var questionInstance = _this._getMappingInstanceObject(question, questionInstanceToThisRow);

            if (!questionInstance) continue;

            var answerInstance = _this.mappingQuestionInstanceToAnswerInstance[questionInstance.URI];

            var edgeHasQuestionTemp = _this._getEdgeObject(
                row.URI,
                question.URI,
                "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
            );

            var questionDomObject = _this._createQuestionDomObject(question, questionInstance, edgeHasQuestionTemp, {
                row: row,
                rowInstance: rowInstance,
            });

            var questionData = {
                answerInstanceURI: answerInstance.URI,
                answerInstanceHTML: questionDomObject.toHorizontalHTML(),
                additionalStyleClasses: questionInstance.get("hiddenInGroupDisplay") ? "hidden-in-group-display" : "",
            };

            item.answerInstances.push(questionData);
        }

        data.rowInstances.push(item);
    }

    var t = JST["templates/giw/table-horizontal-row.hbs"];

    var text = t(data);

    return text;
};

GroupInstanceWidget.prototype._renderCommentRow = function (row, rowLevel, upperObjectInstance) {
    var _this = this;
    var msgRL = this.msgRL;

    var rowInstances = _this.mappingRowWithRowInstances[row.URI] || [];
    rowInstances.sort(function (ins1, ins2) {
        return Number(ins1.get("rowInstanceCounter")) - Number(ins2.get("rowInstanceCounter"));
    });

    var questionEdges = _this.groupEdgeHasQuestion;

    // Get Questions Directly belong to this Row
    var questionsBelongToThisRow = [];
    for (e in questionEdges) {
        var edge = questionEdges[e];
        if (row.URI === edge.get("edgeSource")) {
            questionsBelongToThisRow.push(msgRL.get(edge.get("edgeDestination")));
        }
    }

    var data = {
        rowName: "Comment Row" || 0,
        rowURI: row.URI,
        rowLevel: rowLevel,
        rowInstances: [],
        additionalStyleClasses: row.get("hiddenInGroupDisplay") ? "hidden-in-group-display" : "",
    };

    var indexNumber = 0;

    for (var index = 0; index < rowInstances.length; index++) {
        var rowInstance = rowInstances[index];

        if (
            upperObjectInstance &&
            !_this._isObjectConnected(
                upperObjectInstance,
                rowInstance,
                "http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance"
            )
        ) {
            continue;
        }

        var item = {
            index: ++indexNumber,
            rowIntanceURI: rowInstance.URI,
            sentTime: "",
            user: "",
            message: "",
            imageURL: PREFIX + "img/user.png",
            additionalStyleClasses: rowInstance.get("hiddenInGroupDisplay") ? "hidden-in-group-display" : "",
        };

        var questionInstanceToThisRow = _this._getNextLevelObjects(
            msgRL,
            rowInstance,
            "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
        );

        for (var q = 0; q < questionsBelongToThisRow.length; q++) {
            var question = questionsBelongToThisRow[q];

            var questionInstance = _this._getMappingInstanceObject(question, questionInstanceToThisRow);

            var answerInstance = _this.mappingQuestionInstanceToAnswerInstance[questionInstance.URI].answerInstance;

            switch (question.URI) {
                case "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Comments-Comments-Body":
                    item.message =
                        answerInstance.get("longTextAnswerValue") || "Could you send me the produce description?";
                    break;

                case "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Comments-Comments-Timestamp":
                    var time = answerInstance.get("dateTimeAnswerValue");
                    item.sentTime = !!time
                        ? CommonHelperFunction.timeToStandardDateAndTime(time)
                        : "12/10/2019 09:12:33";
                    break;

                case "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Comments-Comments-Sender":
                    item.user = answerInstance.get("textAnswerValue") || "someone";
                    break;

                case "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Comments-Comments-LoginURI":
                    break;

                case "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Comments-Comments-AccountURI":
                    break;

                case "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Comments-Comments-RelayComment":
                    break;

                case "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Comments-Comments-RelayDeliveryStatus":
                    break;

                case "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Comments-Comments-StatusMessage":
                    break;

                case "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Comments-Comments-SendingAccount":
                    break;
                default:
                    break;
            }
        }

        data.rowInstances.push(item);
    }

    var t = JST["templates/giw/comment-row.hbs"];

    var text = t(data);

    return text;
};

GroupInstanceWidget.prototype._rowInstanceToHtml = function (row, rowInstance, count, level) {
    // console.log('_rowInstanceToHtml');
    var _this = this;

    var counter = count || "";
    var rowLevel = level || 0;
    var rowLevelSytleClass = "row-level-" + rowLevel;

    var msgRL = _this.msgRL;
    var name = row.get("name");
    var questions = [];

    var questionEdges = _this.groupEdgeHasQuestion;

    // Get Questions Directly belong to this Row
    var questionsBelongToThisRow = [];
    for (e in questionEdges) {
        var edge = questionEdges[e];
        if (row.URI === edge.get("edgeSource")) {
            questionsBelongToThisRow.push(msgRL.get(edge.get("edgeDestination")));
        }
    }

    var questionInstanceToThisRow = _this._getNextLevelObjects(
        msgRL,
        rowInstance,
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
    );

    var isMediaRow = false;

    var questionDoms = [];

    // consider the row is a media row if there is exist a answerType QuestionAbstract.TYPE_FILE_UPLOAD_ANSWER
    for (var q = 0; q < questionsBelongToThisRow.length; q++) {
        var question = questionsBelongToThisRow[q];

        var questionInstance = _this._getMappingInstanceObject(question, questionInstanceToThisRow);

        var edgeHasQuestionTemp = _this._getEdgeObject(
            row.URI,
            question.URI,
            "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
        );

        if (!questionInstance || !edgeHasQuestionTemp) {
            console.error("No questionInstance or EdgeHasQuestionTemp detected to this question: ", question);
            console.warn("questionInstance", questionInstance);
            if (!questionInstance)
                console.error(
                    "is QuestionInstance exist in msgRL: ",
                    _this._checkQuestionInstanceExist(_this.msgRL, question)
                );
            console.warn("edgeHasQuestionTemp", edgeHasQuestionTemp);
            continue;
        }

        var questionDomObject = _this._createQuestionDomObject(question, questionInstance, edgeHasQuestionTemp, {
            row: row,
            rowInstance: rowInstance,
        });

        questionDoms.push(questionDomObject);

        if (questionDomObject.answerObject.type === QuestionAbstract.TYPE_FILE_UPLOAD_ANSWER) {
            isMediaRow = true;
        }

        questions.push({
            question: questionDomObject ? questionDomObject.toHTML() : "",
        });
    }

    if (isMediaRow) {
        questionDoms.forEach(function (question) {
            question.isInsideMediaRow = true;
            _this.instancesRelatedToMediaRowInstance[question.answerInstanceObject.URI] = question.answerInstanceObject;
            _this.instancesRelatedToMediaRowInstance[question.questionInstanceObject.URI] =
                question.questionInstanceObject;
            var edgeToAnswerInstance = _this._getEdgeObject(
                question.questionInstanceObject.URI,
                question.answerInstanceObject.URI,
                QuestionAbstract.TYPE_EDGE_HAS_ANSWER_INSTANCE
            );
            if (edgeToAnswerInstance)
                _this.instancesRelatedToMediaRowInstance[edgeToAnswerInstance.URI] = edgeToAnswerInstance;
            var edgeToQuestionInstance = _this._getEdgeObject(
                rowInstance.URI,
                question.questionInstanceObject.URI,
                QuestionAbstract.TYPE_EDGE_HAS_QUESTION_INSTANCE
            );
            if (edgeToQuestionInstance)
                _this.instancesRelatedToMediaRowInstance[edgeToQuestionInstance.URI] = edgeToQuestionInstance;
        });

        _this.instancesRelatedToMediaRowInstance[rowInstance.URI] = rowInstance;
        var rowInstanceEdgeToThisRowInstance = _this._getEdgeObject(
            null,
            rowInstance.URI,
            "http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance"
        );
        if (rowInstanceEdgeToThisRowInstance)
            _this.instancesRelatedToMediaRowInstance[
                rowInstanceEdgeToThisRowInstance.URI
            ] = rowInstanceEdgeToThisRowInstance;
    }

    var data = {
        rowLevelSytleClass: rowLevelSytleClass,
        rowInstanceURI: rowInstance.URI,
        name: name,
        counter: counter,
        isRowFunctional: _this.config.isRowFunctional,
        isSelectRowFunctional: !_this.config.isSelectRowNotFunctional,
        questions: questions,
        row_row: _this._rowsUnderThisObjectToHtml(row, rowInstance, rowLevel + 1),
        additionalStyleClasses: rowInstance.get("hiddenInGroupDisplay") ? "hidden-in-group-display" : ""
    };

    var t = isMediaRow ? JST["templates/giw/media-row-instance.hbs"] : JST["templates/giw/row-instance.hbs"];

    return t(data);
};

// get the new adding instane to the current data mapping
GroupInstanceWidget.prototype._addNewInstanceObjectsToData = function (objs) {
    // console.log('_addNewInstanceObjectsToData');
    var _this = this;

    for (var i in objs) {
        var o = objs[i];
        _this.msgRL.addResult(o);
    }

    // _this._mapDataIntoThisObject();
};

// Create all the instance objects needed to the new added row.
GroupInstanceWidget.prototype._addRowInstance = function (row, upperlevelInstance) {
    // row: row object that the new added rowInstance based
    // upperlevelInstance: Instance object that is the upper level of the current added rowInstance. This could be rowInstance Ojbect or SectionInstance Object.
    // console.log('_addRowInstance');

    var _this = this;
    var objs = _this._getAllObjectsInThisRow(row);
    var rowInstances = _this.mappingRowWithRowInstances[row.URI];
    var index = rowInstances ? rowInstances.length : 0;

    var indexToCapitalCharactor = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    const char = [];
    const div = index / 26;
    const mod = index % 26;
    
    if (div >= 1) {
        var idx = Math.floor(div) - 1;
        char.push(indexToCapitalCharactor[idx]);
    } 
    if (index >= 26) {
        if (mod >= 1) {
            var idx = Math.floor(mod);
            char.push(indexToCapitalCharactor[idx]);
        } else {
            var idx = 0;
            char.push(indexToCapitalCharactor[idx]);
        }
    } else {
        var idx = index;
        char.push(indexToCapitalCharactor[idx]);
    }

    var rowInstance = vitaljs.graphObject({ type: "http://vital.ai/ontology/haley-ai-question#HaleyRowInstance" });
    rowInstance.URI =
        "http://vital.ai/haley.ai/haley-saas/HaleyRowInstance/" +
        new Date().getTime() +
        "-" +
        Math.round(10000000000 * Math.random());
    rowInstance.set("haleyRow", row.URI);
    rowInstance.set('rowInstanceCounter', char.join(''));
    _this.msgRL.addResult(rowInstance);

    var edgeSectionInstanceToRowInstance = vitaljs.graphObject({
        type: "http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance",
    });
    edgeSectionInstanceToRowInstance.URI =
        "http://vital.ai/haley.ai/haley-saas/Edge_hasRowInstance/" +
        new Date().getTime() +
        "-" +
        Math.round(10000000000 * Math.random());
    edgeSectionInstanceToRowInstance.set("edgeSource", upperlevelInstance.URI);
    edgeSectionInstanceToRowInstance.set("edgeDestination", rowInstance.URI);
    _this.msgRL.addResult(edgeSectionInstanceToRowInstance);

    questions = objs.questions;

    for (var i in questions) {
        var question = questions[i];
        var q = question.question;
        var a = question.answer;
        var answerInstances = _this.mappingAnswerToAnswerInstance[a.URI];
        // var answerInstanceType = answerInstances[0].type;
        var answerInstanceType = !!answerInstances ? answerInstances[0].type : a.type + 'Instance';

        var questionInstance = vitaljs.graphObject({
            type: "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance",
        });
        questionInstance.URI =
            "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/" +
            new Date().getTime() +
            "-" +
            Math.round(10000000000 * Math.random());
        questionInstance.set("haleyQuestion", q.URI);

        var edgeHasQuestionInstance = vitaljs.graphObject({
            type: "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance",
        });
        edgeHasQuestionInstance.URI =
            "http://vital.ai/haley.ai/haley-saas/Edge_hasQuestionInstance/" +
            new Date().getTime() +
            "-" +
            Math.round(10000000000 * Math.random());
        edgeHasQuestionInstance.set("edgeSource", rowInstance.URI);
        edgeHasQuestionInstance.set("edgeDestination", questionInstance.URI);

        var answerInstance = vitaljs.graphObject({ type: answerInstanceType });
        answerInstance.URI =
            answerInstanceType + "-" + new Date().getTime() + "-" + Math.round(10000000000 * Math.random());
        answerInstance.set("haleyAnswer", a.URI);

        var edgeInstance = vitaljs.graphObject({
            type: "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance",
        });
        edgeInstance.URI =
            "http://vital.ai/haley.ai/haley-saas/Edge_hasAnswerInstance/" +
            new Date().getTime() +
            "-" +
            Math.round(10000000000 * Math.random());
        edgeInstance.set("edgeSource", questionInstance.URI);
        edgeInstance.set("edgeDestination", answerInstance.URI);
        _this.msgRL.addResult(edgeHasQuestionInstance);
        _this.msgRL.addResult(edgeInstance);
        _this.msgRL.addResult(answerInstance);
        _this.msgRL.addResult(questionInstance);
    }

    // add second level of rowInstance.
    var row2s = objs["rows"];
    for (var i = 0; i < row2s.length; i++) {
        var row2 = row2s[i];
        _this._addRowInstance(row2, rowInstance);
    }

    _this._mapDataIntoThisObject();

    return rowInstance;
};

// option could includes row, rowInstance,
GroupInstanceWidget.prototype._createQuestionDomObject = function (
    question,
    questionInstance,
    edgeHasQuestionTemp,
    option = { row: null, rowInstance: null, section: null, sectionInstance: null }
) {
    var _this = this;

    if (!question || !questionInstance) {
        console.error(
            "Arguments question and questionInstance should be provided. question: ",
            question,
            "questionInstance: ",
            questionInstance
        );
    }

    var edgeHasAnswerInstance = _this.groupEdgeHasAnswerInstance;
    var answerOptionEdges = _this.groupEdgeHasAnswerOption;
    var msgRL = _this.msgRL;

    var answerEdge = _this.mappingQuestionToAnswer[question.URI].edge;
    var answer = _this.mappingQuestionToAnswer[question.URI].answer;
    var answerInstance = _this._getAnswerInstance(msgRL, questionInstance, edgeHasAnswerInstance);

    if (!answerInstance) {
        console.error(
            "No AnswerInstance Found, Check below to see which objects related to the answerInstance object: "
        );
        console.warn("- answerInstance", answerInstance);
        console.warn("- answer", answer);
        console.warn("- question", question);
        console.warn("- questionInstance", questionInstance);
        console.warn("- answerEdge", answerEdge);
        console.warn("End of listing objects.");
        return null;
    }

    if (!answerInstance.get("haleyAnswerFollowupType")) {
        answerInstance.set(
            "haleyAnswerFollowupType",
            "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER"
        );
    }

    var questionObj = _this._toQuestionModuleObject(
        msgRL,
        edgeHasQuestionTemp,
        question,
        answer,
        answerInstance,
        answerOptionEdges,
        option
    );

    var questionDomObject = QuestionAbstract.createQuestion(questionObj);

    _this.mappingAnswerInstanceToQuestionDom[answerInstance.URI] = questionDomObject;

    return questionDomObject;
};

GroupInstanceWidget.prototype._deleteGroupObjects = function (objs) {
    // console.log('_deleteGroupObjects');
    var _this = this;

    var msgRL = vitaljs.resultList();

    var mapping = {};

    objs.forEach(function (element, index) {
        mapping[element.URI] = true;
    });

    _this.msgRL.iterator().forEach(function (element, index) {
        if (!mapping[element.URI]) {
            msgRL.addResult(element);
        } else {
            if (vitaljs.isSubclassOf(element.type, "http://vital.ai/ontology/haley-ai-question#HaleyAnswerInstance")) {
                _this.mappingAnswerInstanceToQuestionDom[element.URI] = null;
            }
        }
    });

    _this.msgRL = msgRL;
};

/**
 * [_disableAllInput description]
 * @param  {[type]} dom find will the questions with in the dom
 * @param  {event} e   if e provided, we need to check whether e trigger the disable.
 * @return {[type]}     [description]
 */
GroupInstanceWidget.prototype._disableAllInput = function (dom) {
    var dom = dom || this.dom;
    var _this = this;

    dom.find(".wrapped-question").each(function () {
        var instanceURI = $(this).data("answer-instance-uri");
        var questionDom = _this.mappingAnswerInstanceToQuestionDom[instanceURI];
        questionDom.toDisableMode();
    });
};

/**
 * [_resetToInitialState]
 * @param  {[type]} dom find will the questions with in the dom
 * @param  {event} e    if e provided, we need to check whether e trigger the disable.
 * @return {[type]}     [description]
 */
GroupInstanceWidget.prototype._resetToInitialState = function (dom) {
    var dom = dom || this.dom;
    var _this = this;

    dom.find(".wrapped-question").each(function () {
        var instanceURI = $(this).data("answer-instance-uri");
        var questionDom = _this.mappingAnswerInstanceToQuestionDom[instanceURI];
        questionDom.cancelChanged();
    });
};

GroupInstanceWidget.prototype._disableOptionsAndOntologyNodes = function (dom, options) {
    var _this = this;

    shouldBeDisabledURI = {};

    options.forEach(function (element) {
        shouldBeDisabledURI[element.URI] = true;
    });

    dom.find("div[answer-type]").each(function () {
        var d = $(this);
        var instanceURI = d.attr("instanceURI");
        var uri = d.find("[answeruri]");
        var answerType = d.attr("answer-type");
        var questionDom = _this.mappingAnswerInstanceToQuestionDom[instanceURI];
        if (questionDom) {
            questionDom.disableOptions(options);
        }
    });
};

GroupInstanceWidget.prototype._disableHeaderAndFooterButtons = function () {
    this.dom.find(this.selector.HEADER_BUTTONS).find(".btn").attr("disabled", "disabled");
    this.dom.find(this.selector.FOOTER_BUTTONS).find(".btn").attr("disabled", "disabled");
};

GroupInstanceWidget.prototype._enableHeaderAndFooterButtons = function () {
    this.dom.find(this.selector.HEADER_BUTTONS).find(".btn").removeAttr("disabled");
    this.dom.find(this.selector.FOOTER_BUTTONS).find(".btn").removeAttr("disabled");
};

/**
 * enable all options in Choicequestions and TaxonomyQuestions
 * @param  jqueryDomObject dom find all the question within this dom
 * @return {[type]}     [description]
 */
GroupInstanceWidget.prototype._enableAllOptionDependencies = function (dom) {
    _this = this;

    dom.find("div[answer-type]").each(function () {
        var d = $(this);
        var instanceURI = d.attr("instanceURI");
        var questionDom = _this.mappingAnswerInstanceToQuestionDom[instanceURI];
        if (questionDom) {
            questionDom.enabledAllOptions();
        }
    });
};

/**
 * This function is going to enable inputs in the group based on the dependency relationship of the questions
 * @param  {[type]} dom [description]
 * @param  eventobject e : if e is not null, then this function is run because some input is change. if e == null then, this function run to initial the input.
 * @return {[type]}     [description]
 */
GroupInstanceWidget.prototype._enableInputs = function (dom, e) {
    // dom: jquery objets in where include multiple inputs.
    // console.log('_enableInputs');
    var _this = this;

    _this._disableAllInput(dom, e);

    // Enable all Option Dependencies. Will disable some of the options according to its dependency later in this function.
    _this._enableAllOptionDependencies(dom);

    var mappingAnswerURIToItsDependencyAndQuestionPairs = _this.mappingAnswerURIToItsDependencyAndQuestionPairs;
    var mappingAnswerInstanceToAnswer = _this.mappingAnswerInstanceToAnswer;
    var mappingAnswerToAnswerOptionDependency = _this.mappingAnswerToAnswerOptionDependency;
    var mappingAnswerOptionDependencyToOptions = _this.mappingAnswerOptionDependencyToOptions;
    var mappingAnswerInstanceURIToEnhancementDependencyWrapper =
        _this.mappingAnswerInstanceURIToEnhancementDependencyWrapper;

    var mappingIsQuestionEnable = {};
    var isModify = false;

    // This algorithm enable the input by using several loops. First loop: enable all questions without dependency, second loop, enable dependency that its dependency is enabled. loop again till no more question is enabled.
    while (!isModify) {
        isModify = true;
        dom.find(".wrapped-question").each(function () {
            var answerInstanceURI = $(this).closest(".wrapped-question").data("answer-instance-uri");
            var wrappedQuestionDom = _this.mappingAnswerInstanceToQuestionDom[answerInstanceURI];

            // do not enable the input if the question is inside media row and the dom provided in not the media row.
            if (wrappedQuestionDom.isInsideMediaRow && !dom.hasClass("media-row-instance")) return;

            var answerURI = wrappedQuestionDom.getAnswerURI();
            var questionInstance = wrappedQuestionDom.getQuestionInstance();

            var dependencyAndQuestionPairs = mappingAnswerURIToItsDependencyAndQuestionPairs[answerURI];

            // check question dependency
            if (
                dependencyAndQuestionPairs &&
                Array.isArray(dependencyAndQuestionPairs) &&
                dependencyAndQuestionPairs.length
            ) {
                // Find the dependency answerInstances object, questionInstance Object
                for (pair of dependencyAndQuestionPairs) {
                    var dependency = pair.dependency;
                    var dependencyInstancePairs = pair.dependencyInstancePairs;

                    for (var i = 0; i < dependencyInstancePairs.length; i++) {
                        var dependencyInstancePair = dependencyInstancePairs[i];
                        var dependencyQuestionInstance = dependencyInstancePair.questionInstance;
                        var dependencyAnswerInstance = dependencyInstancePair.answerInstance;

                        if (
                            !_this._isQuestionInstanceBelongToSameParent(questionInstance, dependencyQuestionInstance)
                        ) {
                            continue;
                        }

                        var dependencyAnswerInstanceURI = dependencyAnswerInstance.URI; // dependent answerInstanceURI
                        var dependencyWrappedQuestionDom =
                            _this.mappingAnswerInstanceToQuestionDom[dependencyAnswerInstanceURI];
                        var answer = mappingAnswerInstanceToAnswer[dependencyAnswerInstanceURI];

                        var answerValue = dependencyWrappedQuestionDom.getInputValue();

                        if (
                            !mappingIsQuestionEnable[answerInstanceURI] && // This questionInstance shouldn't be enable before
                            mappingIsQuestionEnable[dependencyAnswerInstanceURI] && // the dependency should be enable before
                            QuestionAbstract.isAnswerTriggerDependency(answer, answerValue, dependency) // check whether the given answer qualify for triggering the dependent to be enable
                        ) {
                            mappingIsQuestionEnable[answerInstanceURI] = true;
                            isModify = false;
                            wrappedQuestionDom.toEditMode();
                            wrappedQuestionDom.showQuestion();
                            $(this).css("border", "none");
                        }
                    }
                }
            } else {
                mappingIsQuestionEnable[answerInstanceURI] = true;
                wrappedQuestionDom.toEditMode();
            }
        });
    }

    // if e provided, then this is a event trigger by input changed.
    if (e) {
        var targetDom = $(e.target).closest(".wrapped-question");
        var targetAnswerInstanceURI = targetDom.attr("data-answer-instance-uri");
        var targetAnswer = mappingAnswerInstanceToAnswer[targetAnswerInstanceURI];
        var targetAnswerURI = targetAnswer.URI;
    }

    // checking AnswerOptionDependency, if e is not provided, then ititial the question.
    // if e is provided. check if the target change has any DependencyOptions.
    if (!e || (targetAnswerURI && targetAnswerURI in mappingAnswerToAnswerOptionDependency)) {
        dom.find(".wrapped-question").each(function () {
            var answerInstanceURI = $(this).data("answer-instance-uri");
            var wrappedQuestionDom = _this.mappingAnswerInstanceToQuestionDom[answerInstanceURI];
            var answerURI = wrappedQuestionDom.getAnswerURI();
            var answerObject = wrappedQuestionDom.getAnswerObject();

            var isAnswerCalculatedOrReadOnly =
                answerObject.get("calculatedAnswerValue") || answerObject.get("readOnlyAnswerValue");

            // check option dependency
            if (
                !isAnswerCalculatedOrReadOnly &&
                mappingIsQuestionEnable[answerInstanceURI] &&
                answerURI in mappingAnswerToAnswerOptionDependency
            ) {
                var answerOptionDependencies = mappingAnswerToAnswerOptionDependency[answerURI];

                var value = wrappedQuestionDom.getInputValue();
                var directParentDom = _this._getParentDom($(this));

                answerOptionDependencies.forEach(function (answerOptionDependency) {
                    if (QuestionAbstract.isAnswerTriggerDependency(answerObject, value, answerOptionDependency)) {
                        var options = mappingAnswerOptionDependencyToOptions[answerOptionDependency.URI];
                        _this._disableOptionsAndOntologyNodes(directParentDom, options);
                    }
                });
            }
        });
    }

    // checking EnhancementDependency
    if (
        e &&
        targetAnswerInstanceURI &&
        targetAnswerInstanceURI in mappingAnswerInstanceURIToEnhancementDependencyWrapper
    ) {
        var enhancementDependencyWrapper =
            mappingAnswerInstanceURIToEnhancementDependencyWrapper[targetAnswerInstanceURI];
        var questionDom = _this.mappingAnswerInstanceToQuestionDom[targetAnswerInstanceURI];

        // update the answerInstance value according to the inputs.
        questionDom.updateThisInputValue();

        // getting enhancement.
        enhancementDependencyWrapper.getEnhancement(
            _this._submitEnhancementRequest.bind(_this),
            _this.mappingAnswerInstanceToQuestionDom
        );
    }

    // A record for the function _hideDependencyQuestions and _showDependencyQuestions
    _this.mappingIsQuestionEnable = mappingIsQuestionEnable;

    // Hide the dependency if on the Hide Dependency Mode. Show Dependency if on Show Mode
    if (_this._isShowDependencyQuestions()) {
        _this._showDependencyQuestions(dom);
    } else {
        _this._hideDependencyQuestions(dom);
    }
};

/**
 * enforce the rendered dom or a new added dom to meet the config requirement.
 * @param  {[type]} dom [description]
 * @return {[type]}     [description]
 */
GroupInstanceWidget.prototype._enforceConfig = function (dom) {
    var _this = this;
    if (!_this.config.isAnswerFollowupTypeFunctional) {
        dom.find("div.answer-follow-type").css("display", "none");
    }
};

// Get question objects and rowObjects in This Row.
GroupInstanceWidget.prototype._getAllObjectsInThisRow = function (row) {
    // console.log('_getAllObjectsInThisRow');

    var _this = this;
    var edgeHasQuestion = _this.groupEdgeHasQuestion;
    var edgeHasRow = _this.groupEdgeHasRow;

    var mappingQuestionToAnswer = _this.mappingQuestionToAnswer;

    var ans = {
        questions: [],
        rows: [],
    };

    // Get All the questions objects under this row.
    edgeHasQuestion.sort(function (a, b) {
        return a.get("questionIndex") - b.get("questionIndex");
    });
    for (var i in edgeHasQuestion) {
        var edge = edgeHasQuestion[i];

        if (edge.get("edgeSource") === row.URI) {
            var obj = mappingQuestionToAnswer[edge.get("edgeDestination")];
            ans["questions"].push(obj);
        }
    }

    // get all the row objects ouder this row.
    for (var i = 0; i < edgeHasRow.length; i++) {
        var edge = edgeHasRow[i];
        if (edge.get("edgeSource") === row.URI) {
            var row2 = _this._getDestinationObjectOfEdge(edge);
            // var obj = _this._getAllObjectsInThisRow(row2);
            ans["rows"].push(row2);
        }
    }

    return ans;
};

/**
 * get all objects under the rowInstance provided, this will works for the section Instance too. check the _getAllObjectsInThisSectionInstanceAsList before changing this.
 * @param  {[type]} rowInstance [description]
 * @return {[type]}             [description]
 */
GroupInstanceWidget.prototype._getAllObjectsInThisRowInstanceAsList = function (rowInstance) {
    if (!rowInstance) {
        console.error(rowInstance);
        return [];
    }

    var _this = this;
    var edgeHasQuestionInstance = _this.groupEdgeHasQuestionInstance;
    var edgeHasRowInstance = _this.groupEdgeHasRowInstance;

    var mappingQuestionInstanceToAnswerInstance = _this.mappingQuestionInstanceToAnswerInstance;

    var ans = [rowInstance];

    for (var i in edgeHasQuestionInstance) {
        var edge = edgeHasQuestionInstance[i];
        if (edge.get("edgeSource") === rowInstance.URI) {
            ans.push(edge);
            var obj = mappingQuestionInstanceToAnswerInstance[edge.get("edgeDestination")];
            if (obj) {
                ans.push(obj.questionInstance);
                ans.push(obj.edge);
                ans.push(obj.answerInstance);
            }
        }
    }

    for (var i in edgeHasRowInstance) {
        var edge = edgeHasRowInstance[i];
        if (edge.get("edgeSource") === rowInstance.URI) {
            ans.push(edge);
            var rowInstance2 = _this._getDestinationObjectOfEdge(edge);
            if (rowInstance2) {
                var objs = _this._getAllObjectsInThisRowInstanceAsList(rowInstance2);
                ans.push(...objs);
            }
        }
    }

    return ans;
};

GroupInstanceWidget.prototype._getAllObjectsInThisSectionInstanceAsList = function (sectionIntance) {
    //
    return this._getAllObjectsInThisRowInstanceAsList(sectionIntance);
};

// Get the answerInstance based on the questionInstance provided
GroupInstanceWidget.prototype._getAnswerInstance = function (msgRL, questionInstance, edgeHasAnswerInstance) {
    // msgRL: vitaljs obj, object group
    // questionInstance
    // reType: answerInstance
    // console.log('_getAnswerInstance');

    if (!msgRL || !questionInstance || !edgeHasAnswerInstance) {
        return null;
    }
    var ans = null;

    for (var i in edgeHasAnswerInstance) {
        var element = edgeHasAnswerInstance[i];
        if (element.get("edgeSource") === questionInstance.URI) {
            ans = msgRL.get(element.get("edgeDestination"));
            break;
        }
    }

    return ans;
};

// get the answer value according to differert answertype
GroupInstanceWidget.prototype._getAnswerValue = function (answerInstance, answerObj) {
    // console.log('_getAnswerValue');
    if (answerInstance) {
        var type = answerInstance.type.split("#")[1];
        switch (type) {
            case "HaleyTextAnswerInstance":
                return answerInstance.get("textAnswerValue");

            case "HaleyBooleanAnswerInstance":
                return answerInstance.get("booleanAnswerValue");

            case "HaleyChoiceAnswerInstance":
                return answerInstance.get("choiceAnswerValue");

            case "HaleyDateTimeAnswerInstance":
                return new Date(answerInstance.get("dateTimeAnswerValue"));

            case "HaleyLongTextAnswerInstance":
                return answerInstance.get("longTextAnswerValue");

            case "HaleyFileUploadAnswerInstance":
                return answerInstance.get("fileAnswerValueURI");

            case "HaleyNumberAnswerInstance":
                var answer = this.mappingAnswerInstanceToAnswer[answerInstance.URI] || answerObj;
                var answerDataType = answer.get("haleyAnswerDataType");
                if (answerDataType === "http://vital.ai/ontology/haley-ai-question#HaleyIntegerDataType") {
                    return answerInstance.get("integerAnswerValue");
                } else {
                    return answerInstance.get("doubleAnswerValue");
                }

            case "HaleyMultiChoiceAnswerInstance":
                return answerInstance.get("multiChoiceAnswerValue");

            case "HaleySignatureAnswerInstance":
                return answerInstance.get("signatureAnswerValue");

            case "HaleyTaxonomyAnswerInstance":
                var taxonomy = answerInstance.get("taxonomyAnswerValue");
                return taxonomy || "";

            case "HaleyMultiTaxonomyAnswerInstance":
                var taxonomies = answerInstance.get("multiTaxonomyAnswerValue");
                taxonomies = taxonomies ? taxonomies : [];

                return taxonomies.toString();

            default:
                console.error("No such questionType exists", type);
        }
    }
};

GroupInstanceWidget.prototype._getDestinationObjectOfEdge = function (edge) {
    // console.log('_getDestinationObjectOfEdge');

    var uri = edge.get("edgeDestination");
    if (!this.mappingGroupObjects[uri]) {
        console.error("No such Object Exist", edge);
    }
    return this.mappingGroupObjects[uri];
};

GroupInstanceWidget.prototype._getEdgeObject = function (sourceURI, destinationURI, edgeType) {
    // console.log('_getEdgeObject');

    var edges = this.msgRL.iterator(edgeType);

    // if sourceURI does not proviced. then use only the detination URI to find the edge.
    if (!sourceURI) {
        for (var i in edges) {
            var edge = edges[i];
            if (edge.get("edgeDestination") === destinationURI) {
                return edge;
            }
        }
    }

    for (var i in edges) {
        var edge = edges[i];
        if (edge.get("edgeSource") === sourceURI && edge.get("edgeDestination") === destinationURI) {
            return edge;
        }
    }
    return null;
};

GroupInstanceWidget.prototype._getInputValue = function (answerInstance, dom) {
    var _this = this;

    var questionDomObject = _this.mappingAnswerInstanceToQuestionDom[answerInstance.URI];

    return questionDomObject.getInputValue();
};

// Get Mapping Objects (obj -> ojbInstance)
GroupInstanceWidget.prototype._getMappingInstanceObject = function (obj, objInstances) {
    //obj: row, section, question, answer obj to mapped
    //objInstances: list of relative instance objects:
    // console.log('_getMappingInstanceObject');

    var ans = null;

    for (var i in objInstances) {
        var type = obj.type.split("#")[1].split("Instance")[0];
        type = type.substring(0, 1).toLowerCase() + type.substring(1);
        var instance = objInstances[i];
        if (!instance) {
            console.error(instance, obj, objInstances);
        }
        var uri = instance.get(type);

        if (uri === obj.URI) {
            ans = instance;
            break;
        }
    }

    return ans;
};

// get children objets for the parent objects
GroupInstanceWidget.prototype._getNextLevelObjects = function (msgRL, parent, edgeType) {
    // msgRL: vitaljs obj, object group
    // parent: haley obj
    // edgeType: the type of the edges connect parent and its children
    // reType: children objects connected to the parentobj.
    // console.log('_getNextLevelObjects');

    var edgesInType = msgRL.iterator(edgeType);
    var edges = [];
    edgesInType.forEach(function (element, index) {
        if (parent.URI === element.get("edgeSource")) {
            edges.push(element);
        }
    });

    var objs = [];

    edges.forEach(function (element, index) {
        objs.push(msgRL.get(element.get("edgeDestination")));
    });

    return objs;
};

/**
 * Based on the questionDom provided, return the parent dom. the parentDom will either be a rowDom or a sectionDom.
 * @param  JquiryDom dom questionDom
 * @return JquiryDom dom     the rowDom or the sectionDom
 */
GroupInstanceWidget.prototype._getParentDom = function (dom) {
    var parentDom = null;
    var rowDom = dom.closest(".row-item");

    if (rowDom.length) {
        parentDom = rowDom;
    } else {
        parentDom = dom.closest(".section-question");
    }

    return parentDom;
};

// Get the question Instance based on the question and the upperlevelInstance provied
GroupInstanceWidget.prototype._getQuestionInstanceOfThisSectionInstance = function (question, sectionInstance) {
    console.log("_getQuestionInstanceOfThisSectionInstance");
    var edges = this.groupEdgeHasQuestionInstance;
    var questionInstances = this.mappingQuestionToQuestionInstance[question.URI];

    for (var i in edges) {
        var edge = edges[i];
        if (edge.get("edgeSource") === sectionInstance.URI) {
            for (var j in questionInstances) {
                var ins = questionInstances[j];
                if (edge.get("edgeDestination") === ins.URI) {
                    return ins;
                }
            }
        }
    }

    return null;
};

// Get selection Options for every Row Instance
GroupInstanceWidget.prototype._getSelectionOptionsForRow = function (row, dom) {
    // console.log('_getSelectionOptionsForRow');
    var _this = this;

    if (_this.config.isSelectRowNotFunctional) {
        return false;
    }

    if (!row) {
        console.error("No row object passed");
        return;
    }

    // function that get a rowCandadate list for selection;
    var msg = vitaljs.graphObject({ type: "http://vital.ai/ontology/harbor-ai#GetRowSelectionOptionsRequest" });
    msg.URI =
        "http://vital.ai/haley.ai/haley-saas/GetRowSelectionOptionsRequest/" +
        new Date().getTime() +
        "-" +
        Math.round(100000000000 * Math.random());
    msg.set("channelURI", UI_CHANNEL.URI);

    HALEY_API.sendMessageWithRequestCallback(
        HALEY_SESSION,
        msg,
        [row],
        function (error) {
            if (error) {
                console.error("Error when sending GetRowSelectionOptionsRequest request", error);
            } else {
                console.log("GetRowSelectionOptionsRequest request message sent");
            }
        },
        function (msgRL) {
            var msg = msgRL.first();
            if (msg.type != "http://vital.ai/ontology/vital-aimp#MetaQLResultsMessage") {
                console.warn("Ignoring message of type: " + msg.type);
                return true;
            }

            var status = msg.get("status");
            var statusMessage = msg.get("statusMessage");

            if (status != "ok") {
                console.error("ERROR when getting logins table data", statusMessage);
                return false;
            }

            objs = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleyRow");
            var text = "<option>Select Row</option>";

            for (var i in objs) {
                var o = objs[i];
                if (o.type != "http://vital.ai/ontology/vital-aimp#MetaQLResultsMessage") {
                    if (!_this.rowOptions) {
                        _this.rowOptions = {};
                    }
                    if (_this.rowOptions[row.URI]) {
                        _this.rowOptions[row.URI][o.URI] = o;
                    } else {
                        _this.rowOptions[row.URI] = { [o.URI]: o };
                    }
                    text += '<option value="' + o.URI + '">' + o.get("name") + "</option>";
                }
            }

            dom.html(text);

            return;
        }
    );
};

GroupInstanceWidget.prototype._hideDependencyQuestions = function (domObject) {
    var mappingAnswerToItsDependencies = this.mappingObjectToItsDependencies;
    var mappingAnswerInstanceToAnswer = this.mappingAnswerInstanceToAnswer;
    var mappingIsQuestionEnable = this.mappingIsQuestionEnable;

    dom = domObject || this.dom;

    dom.find(".wrapped-question").each(function () {
        var answerInstanceURI = $(this).data("answer-instance-uri");
        var answer = mappingAnswerInstanceToAnswer[answerInstanceURI];

        if (mappingAnswerToItsDependencies[answer.URI] && !mappingIsQuestionEnable[answerInstanceURI]) {
            $(this).css("display", "none");
        }
    });
};

/**
 * For Every QuestionDomObject we have to init it "dom" value, with the dom value inited, we will be able to
 * @param  {[Jquery Dom Ojbect]} dom this is the dom that include one or multiple .wrapped-question HTML elements.
 * @return null;
 */
GroupInstanceWidget.prototype._initDomValueForQuestionDomObject = function (dom) {
    var _this = this;

    dom.find(".wrapped-question").each(function () {
        var answerInstanceURI = $(this).data("answer-instance-uri");
        if (answerInstanceURI && _this.mappingAnswerInstanceToQuestionDom[answerInstanceURI]) {
            _this.mappingAnswerInstanceToQuestionDom[answerInstanceURI].setDom($(this));
            // some of the questions need initialze. (taxonomies);
            _this.mappingAnswerInstanceToQuestionDom[answerInstanceURI].render();
        } else {
            console.error(
                "Error, AnswerInstance Object and QuestionDomObject Counld Not Match, Here is the URI of relative answerInstance: ",
                answerInstanceURI
            );
        }
    });

    // if row is readOnly, then inject the readonly value to all the question inside it.
    dom.find(".row-group").each(function () {
        var rowDom = $(this);
        var rowURI = rowDom.attr("row-uri");
        var row = _this.msgRL.get(rowURI);
        if (row.get("readOnlyRowValue")) {
            _this._injectIsReadOnlyValue(rowDom, true);
            // if the row is readOnly, then any edit function should be disabled
            rowDom.find(".edit-show").removeClass("edit-show").addClass("edit-hide");
            rowDom.find(".edit-show-inline").removeClass("edit-show-inline").addClass("edit-hide");
        }
        if (row.get("hiddenInGroupDisplay")) {
            _this._injectIsHiddenValue($(this), true);
        }
    });

    // if row-instance is readOnly, then inject the readonly value to all the question inside it.
    dom.find(".row-item").each(function () {
        var rowInstanceURI = $(this).attr("row-instance-uri");
        var rowInstance = _this.msgRL.get(rowInstanceURI);
        if (rowInstance.get("readOnlyRowValue")) {
            _this._injectIsReadOnlyValue($(this), true);
            $(this).find(".edit-show").removeClass("edit-show").addClass("edit-hide");
            $(this).find(".edit-show-inline").removeClass("edit-show-inline").addClass("edit-hide");
        }
        if (rowInstance.get("hiddenInGroupDisplay")) {
            _this._injectIsHiddenValue($(this), true);
        }
    });
};

GroupInstanceWidget.prototype._injectIsReadOnlyValue = function (dom, value) {
    var _this = this;
    dom.find(".wrapped-question").each(function () {
        var uri = $(this).data("answer-instance-uri");
        var questionDom = _this.mappingAnswerInstanceToQuestionDom[uri];
        questionDom.isParentReadOnly = value;
    });
};

GroupInstanceWidget.prototype._injectIsHiddenValue = function (dom, value) {
    var _this = this;
    dom.find(".wrapped-question").each(function () {
        var uri = $(this).data("answer-instance-uri");
        var questionDom = _this.mappingAnswerInstanceToQuestionDom[uri];
        questionDom.isParentHiddenInGroupDisplay = value;
    });
};

GroupInstanceWidget.prototype._isQuestionInstanceBelongToSameParent = function (obj1, obj2) {
    if (!obj1 || !obj2) {
        console.error("obj1 and obj2 should both be provided", { obj1: obj1, obj2: obj2 });
        return;
    }

    if (
        obj1.type !== "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance" ||
        obj2.type !== "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"
    ) {
        console.error(
            'Both type of obj1, and obj2 should be "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"',
            obj1,
            obj2
        );
        return;
    }

    var mappingQuestionInstanceToItsParent = _this.mappingQuestionInstanceToItsParent;
    var p1 = mappingQuestionInstanceToItsParent[obj1.URI];
    var p2 = mappingQuestionInstanceToItsParent[obj2.URI];

    if (!p1 || !p2) {
        console.error("Could not detect parents of obj1 or obj2. The data might not be clean: ", p1, p2);
        return false;
    }

    if (p1.URI === p2.URI) return true;

    return false;
};

GroupInstanceWidget.prototype._isShowDependencyQuestions = function () {
    var dom = this.dom;

    if (this.config.isShowDependencyButton === false) {
        return false;
    }

    if (dom.find(this.selector.dependencyButton).first().text().trim() === "Show Dependencies") {
        return false;
    }

    return true;
};

GroupInstanceWidget.prototype._mappingSourceURIToDestionationObjectOfEdges = function (msgRL, edges) {
    var ans = {};

    if (!Array.isArray(edges)) {
        throw TypeError("parameter is not Array");
    }

    edges.forEach(function (edge) {
        ans[edge.get("edgeSource")] = msgRL.get(edge.get("edgeDestination"));
    });

    return ans;
};

GroupInstanceWidget.prototype._mappingDestinationURIToSourceObjectOfEdges = function (msgRL, edges) {
    var ans = {};

    if (!Array.isArray(edges)) {
        throw TypeError("parameter is not Array");
    }

    edges.forEach(function (edge) {
        ans[edge.get("edgeDestination")] = msgRL.get(edge.get("edgeSource"));
    });

    return ans;
};

GroupInstanceWidget.prototype._mappingDestinationURIToSourceObjectsOfEdges = function (msgRL, edges) {
    var ans = {};

    if (!Array.isArray(edges)) {
        throw TypeError("parameter is not Array");
    }

    edges.forEach(function (edge) {
        if (ans[edge.get("edgeDestination")]) {
            ans[edge.get("edgeDestination")].push(msgRL.get(edge.get("edgeSource")));
        } else {
            ans[edge.get("edgeDestination")] = [msgRL.get(edge.get("edgeSource"))];
        }
    });

    return ans;
};

GroupInstanceWidget.prototype._onAddRowButtonClick = function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    var _this = this;

    if (!_this.isEditMode) {
        return false;
    }

    // Find the upperinstance object that connected to this Row. it could be a sectionInstance or a rowInstance
    var upperInstance = null;
    if ($(e.target).closest(".row-item").length) {
        // The upper Instance is the rowInstance
        var dom = $(e.target).closest(".row-item");
        var upperRowInstanceURI = dom.attr("row-instance-uri");
        upperInstance = _this.mappingGroupObjects[upperRowInstanceURI];
    } else {
        // the upperInstance is the sectionInstance
        var sectionDom = $(e.target).closest(".section-question");
        var sectionURI = sectionDom.attr("uri");
        upperInstance = _this.mappingSectionToSectionInstances[sectionURI];
    }

    var rowLevel = $(e.target).closest(".row-group").attr("row-level");

    var rowURI = $(e.target).closest(".row-group").attr("row-uri");
    var row = _this.mappingGroupObjects[rowURI];

    // Add all the objects created for the new row to the msgRL object maintain on this page.
    var rowInstance = _this._addRowInstance(row, upperInstance);

    var text = _this._rowInstanceToHtml(row, rowInstance, "", Number(rowLevel));

    var newRowDom = $(text);

    newRowDom.insertBefore($(e.target).prev("hr")).css("display", "none").show("slow");

    // update the counter of the Instance.
    _this._updateRowInstanceCounter(upperInstance.URI, row.URI);

    // get row selection options fill into the options:
    var selectDom = newRowDom.find(".row-instance-header select");

    _this._getSelectionOptionsForRow(row, selectDom);

    _this._initDomValueForQuestionDomObject(newRowDom);

    _this._enableInputs(newRowDom);

    // _this._initTaxonomyQuestionInputs(newRowDom);

    _this._enforceConfig(newRowDom);

    if (row.get('haleyRowTypeURI') === 'http://vital.ai/haley.ai/harbor-saas/HaleyRowType/InquiryUnderwrite') {
        const button = `<button id='updateUnderwriting' class='update-row btn btn-primary btn-sm pull-right initial-hide edit-show-inline' tabindex='-1' style='display: inline-block; margin-left: 5px;' disabled>Update Row</button>`;
        newRowDom.children('.row-instance-header').prepend(button);
    }
    
};

GroupInstanceWidget.prototype._onAddRowHorizontalButtonClick = function (e) {
    e.preventDefault();

    var _this = this;

    if (!_this.isEditMode) {
        return false;
    }

    // Find the upperinstance object that connected to this Row. it could be a sectionInstance or a rowInstance
    var upperInstance = null;
    if ($(e.target).closest(".row-item").length) {
        // The upper Instance is the rowInstance
        var dom = $(e.target).closest(".row-item");
        var upperRowInstanceURI = dom.attr("row-instance-uri");
        upperInstance = _this.mappingGroupObjects[upperRowInstanceURI];
    } else {
        // the upperInstance is the sectionInstance
        var sectionDom = $(e.target).closest(".section-question");
        var sectionURI = sectionDom.attr("uri");
        upperInstance = _this.mappingSectionToSectionInstances[sectionURI];
    }

    var rowLevel = $(e.target).closest(".row-group").attr("row-level");

    var rowURI = $(e.target).closest(".row-group").attr("row-uri");
    var row = _this.mappingGroupObjects[rowURI];

    // Add all the objects created for the new row to the msgRL object maintain on this page.
    _this._addRowInstance(row, upperInstance);

    var text = _this._renderHorizontalRow(row, Number(rowLevel), upperInstance);

    $(e.target).closest(".row-group").replaceWith(text);

    var newRowDom = _this.dom.find('.row-group[row-uri="' + row.URI + '"]');

    const rowTypeURI = _this.msgRL.get(rowURI).get('haleyRowTypeURI');

    _this._initDomValueForQuestionDomObject(newRowDom);

    _this._enforceConfig(newRowDom);

    _this._enableInputs(newRowDom);

    let button;
    if (rowTypeURI === "http://vital.ai/haley.ai/harbor-saas/HaleyRowType/FeeScheduleLineItem") {
        button = `<button id='updateFeeScheduleLineItem' class='update-row btn btn-primary btn-sm pull-right initial-hide edit-show-inline' tabindex='-1' style='display: inline-block; margin-left: 5px;'>Update Row</button>`;
        $('#bind-details-panel-send-to-carrier').attr('disabled', true);
        newRowDom.children('.box-header').prepend(button);
        newRowDom.stop().animate({ backgroundColor: '#FCE599' }, 400);
        _this.groupInstance.set('inconsistentGroupInstance', true);
    } 
    // else if (rowTypeURI === 'ttp://vital.ai/haley.ai/harbor-saas/HaleyRowType/ScheduleOfHazard') {
    //     button = `<button id='updateScheduleOfHazard' class='update-row btn btn-primary btn-sm pull-right initial-hide edit-show-inline' tabindex='-1' style='display: inline-block; margin-left: 5px;'>Update Row</button>`;
    // }

    
};

GroupInstanceWidget.prototype._onDeleteRowButtonClick = function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    var _this = this;

    if (!_this.isEditMode) {
        return false;
    }

    // get all the sibling Instance.
    // First, find the upper instance, could be a sectionInstance or a rowInstance.
    var upperInstanceURI = $(e.target).parents(".row-item").parents(".row-item").attr("row-instance-uri");
    var sectionInstance = _this.mappingSectionToSectionInstances[$(e.target).parents(".section-question").attr("uri")];
    upperInstanceURI = upperInstanceURI || sectionInstance.URI;
    var rowURI = $(e.target).closest(".row-group").attr("row-uri");
    // Get all the childrenInstance objects upder this upperInstance
    var rowInstancesUnderThisUpperInstance = _this.mappingUpperInstanceWithRowInstances[upperInstanceURI];
    // For a sectionInstance, rowInstance under the sectionInstance could be from different Row. So we have to filter that.
    var rowInstances = rowInstancesUnderThisUpperInstance.filter(function (instance) {
        return instance.get("haleyRow") === rowURI;
    });

    // if only one instance left, create new Instances objects and delete old ones.
    if (rowInstances && rowInstances.length <= 1) {
        $(e.target).closest(".row-group").find(".add-row").trigger("click");
    }

    // get all the object under linked to the rowInstance.
    var rowInstanceURI = $(e.target).closest(".row-item").attr("row-instance-uri");
    var rowInstance = _this.mappingGroupObjects[rowInstanceURI];
    var rowObjets = _this._getAllObjectsInThisRowInstanceAsList(rowInstance);

    var rowInstanceEdgeToThisRowInstance = _this._getEdgeObject(
        null,
        rowInstanceURI,
        "http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance"
    );
    if (rowInstanceEdgeToThisRowInstance) {
        rowObjets.push(rowInstanceEdgeToThisRowInstance);
        console.log("DELETED EDGE", rowInstanceEdgeToThisRowInstance);
    } else {
        console.error("No Edge Found To Remove");
    }

    // delete all the children object and the sectionhasrowedge object
    _this._deleteGroupObjects(rowObjets);

    _this._mapDataIntoThisObject();

    // set the rowInstanceCounter value to the rowInstance object remain.
    _this._updateRowInstanceCounter(upperInstanceURI, rowURI);

    // Remove dom from the page.
    $(e.target).closest(".row-item").fadeOut().remove();

    
};

GroupInstanceWidget.prototype._onDeleteRowHorizontalButtonClick = function (e) {
    e.preventDefault();

    var _this = this;

    if (!_this.isEditMode) {
        return false;
    }

    // get all the sibling Instance.
    // First, find the upper instance, could be a sectionInstance or a rowInstance.
    var upperInstanceURI = $(e.target).closest(".row-item").parents(".row-item").attr("row-instance-uri");
    var sectionInstance = _this.mappingSectionToSectionInstances[$(e.target).closest(".section-question").attr("uri")];
    upperInstanceURI = upperInstanceURI || sectionInstance.URI;
    var rowURI = $(e.target).closest(".row-group").attr("row-uri");
    var row = _this.mappingGroupObjects[rowURI];
    var upperInstance = _this.mappingGroupObjects[upperInstanceURI];
    // Get all the childrenInstance objects upder this upperInstance
    var rowInstancesUnderThisUpperInstance = _this.mappingUpperInstanceWithRowInstances[upperInstanceURI];
    // For a sectionInstance, rowInstance under the sectionInstance could from different Row. So we have to filter that.
    var rowInstances = rowInstancesUnderThisUpperInstance.filter(function (instance) {
        return instance.get("haleyRow") === rowURI;
    });

    // get all the object under linked to the rowInstance.
    var rowInstanceURI = $(e.target).closest("tr").attr("row-instance-uri");
    var rowInstance = _this.mappingGroupObjects[rowInstanceURI];
    var rowObjets = _this._getAllObjectsInThisRowInstanceAsList(rowInstance);

    var rowInstanceEdgeToThisRowInstance = _this._getEdgeObject(
        null,
        rowInstanceURI,
        "http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance"
    );
    if (rowInstanceEdgeToThisRowInstance) {
        rowObjets.push(rowInstanceEdgeToThisRowInstance);
        console.log("DELETED EDGE", rowInstanceEdgeToThisRowInstance);
    } else {
        console.error("No Edge Found To Remove");
    }

    // if only one instance left, create new Instances objects and delete old ones.
    if (rowInstances && rowInstances.length <= 1) {
        _this._addRowInstance(row, upperInstance);
    }

    // delete all the children object and the sectionhasrowedge object
    _this._deleteGroupObjects(rowObjets);

    _this._mapDataIntoThisObject();

    var rowLevel = $(e.target).closest(".row-group").attr("row-level");

    var text = _this._renderHorizontalRow(row, Number(rowLevel), upperInstance);

    $(e.target).closest(".row-group").replaceWith(text);

    var newRowDom = _this.dom.find('.row-group[row-uri="' + rowURI + '"]');

    const rowTypeURI = _this.msgRL.get(rowURI).get('haleyRowTypeURI');

    _this._initDomValueForQuestionDomObject(newRowDom);

    _this._enforceConfig(newRowDom);

    _this._enableInputs(newRowDom);

    let button;

    if (rowTypeURI === "http://vital.ai/haley.ai/harbor-saas/HaleyRowType/FeeScheduleLineItem") {
        button = `<button id='updateFeeScheduleLineItem' class='update-row btn btn-primary btn-sm pull-right initial-hide edit-show-inline' tabindex='-1' style='display: inline-block; margin-left: 5px;'>Update Row</button>`;
        $('#bind-details-panel-send-to-carrier').attr('disabled', true);
    } 
    // else if (rowTypeURI === 'ttp://vital.ai/haley.ai/harbor-saas/HaleyRowType/ScheduleOfHazard') {
    //     button = `<button id='updateScheduleOfHazard' class='update-row btn btn-primary btn-sm pull-right initial-hide edit-show-inline' tabindex='-1' style='display: inline-block; margin-left: 5px;'>Update Row</button>`;
    // }

    newRowDom.children('.box-header').prepend(button);
    newRowDom.css('backgroundColor', '#FCE599');
    _this.groupInstance.set('inconsistentGroupInstance', true);
};

GroupInstanceWidget.prototype._onDependencyButtonClick = function (e) {
    e.preventDefault();

    var _this = this;

    var dom = $(e.target).closest(".question-group");

    if ($(e.target).text().trim() === "Show Dependencies") {
        _this._showDependencyQuestions();
        dom.find(_this.selector.dependencyButton).text("Hide Dependencies");
    } else if ($(e.target).text().trim() === "Hide Dependencies") {
        _this._hideDependencyQuestions();
        dom.find(_this.selector.dependencyButton).text("Show Dependencies");
    }
};

GroupInstanceWidget.prototype._onEditButtonClick = function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    var _this = this;
    var dom = _this.dom;

    if (_this.isEditMode) {
        _this.isEditMode = false;

        $(e.target).closest(".panel-collapse").removeClass("in");
    } else {
        _this._enableInputs(dom);

        _this.isEditMode = true;

        dom.find(".edit-form").each(function () {
            $(this).removeClass("btn-primary").addClass("btn-danger").text("Cancel");
        });
        dom.find(".confirm-form").each(function () {
            $(this).html("Confirm");
        });

        dom.find(".edit-hide").css("display", "none");
        dom.find(".edit-show").css("display", "block");
        dom.find(".edit-show-inline").css("display", "inline-block");
        dom.find(".edit-hide-media").css("display", "inline-block");

        // $(e.target).after('<button class="generate-doc pull-right btn btn-primary edit-hide" tabindex="-1">Generate Binder</button>');

        $(e.target).closest('.question-group').find('.row-group').each(function() {
            const uris = [
                'http://vital.ai/haley.ai/harbor-saas/HaleyRowType/BindQuote',
                "http://vital.ai/haley.ai/harbor-saas/HaleyRowType/BrokerPolicyCoverage",
                "http://vital.ai/haley.ai/harbor-saas/HaleyRowType/InquiryScheduleOfHazard",
                "http://vital.ai/haley.ai/harbor-saas/HaleyRowType/InquiryUnderwrite",
                'http://vital.ai/haley.ai/harbor-saas/HaleyRowType/FeeScheduleLineItem'
            ];
            const rowURI = $(this).attr('row-uri');
            const rowTypeURI = _this.msgRL.get(rowURI).get('haleyRowTypeURI');


            if (rowTypeURI === uris[0]) {
                const button = `<button id='updateQuote' class='update-row btn btn-primary btn-sm pull-right initial-hide edit-show-inline' tabindex='-1' style='display: inline-block; margin-right: 5px;' disabled>Update Row</button>`;
                $(this).find('.row-item.row-level-0').children('.row-instance-header').prepend(button);
            } else if (rowTypeURI === uris[1]) {
                const resetButton = `<button id='resetPolicy' class='reset-row btn btn-primary btn-sm pull-right initial-hide edit-show-inline' tabindex='-1' style='display: inline-block; margin-left: 5px;' >Reset</button>`;
                const updateButton = `<button id='updateCoverageType' class='update-row btn btn-primary btn-sm pull-right initial-hide edit-show-inline' tabindex='-1' style='display: inline-block; margin-left: 5px;' >Update Row</button>`;
                $(this).find('.row-item.row-level-0').children('.row-instance-header').prepend(resetButton);
                $(this).find('.row-item.row-level-0').children('.row-instance-header').prepend(updateButton);
            } else if (rowTypeURI === uris[2]) {
                const button = `<button id='updateScheduleOfHazard' class='update-row btn btn-primary btn-sm pull-right initial-hide edit-show-inline' tabindex='-1' style='display: inline-block; margin-left: 5px;' disabled>Update Row</button>`;
                $(this).find('.box-header').prepend(button);
            } else if (rowTypeURI === uris[3]) {
                const button = `<button id='updateUnderwriting' class='update-row btn btn-primary btn-sm pull-right initial-hide edit-show-inline' tabindex='-1' style='display: inline-block; margin-left: 5px;' disabled>Update Row</button>`;
                $(this).find('.row-item.row-level-0').children('.row-instance-header').prepend(button);
            } else if (rowTypeURI === uris[4]) {
                const button = `<button id='updateFeeScheduleLineItem' class='update-row btn btn-primary btn-sm pull-right initial-hide edit-show-inline' tabindex='-1' style='display: inline-block; margin-left: 5px;' disabled>Update Row</button>`;
                $(this).find('.box-header').prepend(button);
            } else {
                // const button = `<button id='updateQuoteRow' class='update-row btn btn-primary btn-sm pull-right initial-hide edit-show-inline' tabindex='-1' style='display: inline-block; margin-left: 5px;' disabled>Update Row</button>`;
                // $(this).find('.row-instance-header').prepend(button);
            }

            // ** TEST: not displaying delete / add row button when maximum/minimum row count is 1 ** //

            // set max/min row count to 1
            _this.groupEdgeHasRow.forEach(edge => {
                if (edge.get('edgeDestination') === "http://vital.ai/haley.ai/harbor-saas/HaleyRow/BrokerQuoteOption-BindQuote-BindQuote") {
                    edge.set('maximumRowCount', 1);
                    edge.set('minimumRowCount', 1);
                }
            })

            // if max/min row count is 1, hide buttons
            _this.groupEdgeHasRow.forEach(edge => {
                if (rowURI === edge.get('edgeDestination')) {
                    if (edge.get('maximumRowCount') === 1) {
                        $(this).find('.delete-row').hide()
                    }
                    if (edge.get('minimumRowCount') === 1) {
                        $(this).find('.add-row').hide()
                    }
                }
            })
                // ** TEST ends ** //
         
        })

        
        
        dom.find(_this.selector.checkRow).prop("disabled", false);
    }
};

// handle when answer follow up symbol '+' click on horizontal row
GroupInstanceWidget.prototype._onAnswerFollowUpPlusSimbleClick = function (e) {
    e.preventDefault();

    if (!this.isEditMode) {
        return;
    }

    var answerInstanceURI = $(e.target).closest("td").find(".wrapped-question").data("answer-instance-uri");

    var questionDom = this.mappingAnswerInstanceToQuestionDom[answerInstanceURI];

    if (questionDom.isAnswerCalculatedOrReadOnly()) {
        return;
    }

    // get the state of the horizontal answer followup type
    if (questionDom.isHorizontalAnswerFollowUpTypeOpen) {
        // remove the model, put the symbol into '+';
        questionDom.dom.closest("td").find(".answer-follow-type-horizontal").remove();
        $(e.target).html("+");
        questionDom.isHorizontalAnswerFollowUpTypeOpen = false;
        return;
    }

    questionDom.isHorizontalAnswerFollowUpTypeOpen = true;
    $(e.target).html("-");

    var answerFollowupType = questionDom.getAnswerFollupType();
    var t = JST["templates/giw/answer-followup-type-horizontal.hbs"];
    var text = t({});
    var tdHight = $(e.target).closest("td").height();

    $(e.target)
        .closest("td")
        .append(
            $(text).css({
                position: "absolute",
                right: "0px",
                top: $(e.target).position().top + tdHight / 1.5,
            })
        );

    $(e.target)
        .closest("td")
        .find('option[value="' + answerFollowupType + '"]')
        .prop("selected", true);
};

// handle event when answer follow up type changed.
GroupInstanceWidget.prototype._onHorizontalAnswerFollowUpTypeChange = function (e) {
    if (!this.isEditMode) {
        return;
    }

    // clear answer if No_Answer selected
    var answerInstanceURI = $(e.target).closest("td").find(".wrapped-question").data("answer-instance-uri");
    var questionDom = this.mappingAnswerInstanceToQuestionDom[answerInstanceURI];
    var selectedAnswerFollowupType = $(e.target)
        .closest(".answer-follow-type-horizontal")
        .find("option:selected")
        .val();
    questionDom.answerInstanceObject.set("haleyAnswerFollowupType", selectedAnswerFollowupType);
    if (selectedAnswerFollowupType === "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER") {
        questionDom.clearInput();
    }
};

GroupInstanceWidget.prototype._onSelectButtonClick = function (e) {
    e.preventDefault();
    // e.stopImmediatePropagation();

    var _this = this;

    if (!_this.isEditMode) {
        return false;
    }

    var thisDom = $(e.target).closest(".row-item"); // find the rowInstance effected.

    // Find the row ojects and the object selected.
    var rowInstanceURI = $(e.target).attr("row-instance-uri");
    var selectDom = $('select[row-instance-uri="' + rowInstanceURI + '"] option:selected');
    var objectURI = selectDom.val();

    var rowURI = $(e.target).parents(".row-group").first().attr("row-uri");
    var row = _this.mappingGroupObjects[rowURI];

    var selectInstance = _this.mappingGroupObjects[rowInstanceURI];

    // Find the upperInstance connected to this instanceObject. Could be a sectionInstance or a rowInstance.
    var upperInstanceURI = $(e.target).parents(".row-item").parents(".row-item").attr("row-instance-uri");
    var sectionInstance = _this.mappingSectionToSectionInstances[$(this).parents(".section-question").attr("uri")];
    upperInstanceURI = upperInstanceURI || sectionInstance.URI;

    var edgeUpperInstanceToRowInstance = vitaljs.graphObject({
        type: "http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance",
    });
    edgeUpperInstanceToRowInstance.URI =
        "http://vital.ai/haley.ai/haley-saas/Edge_hasRowInstance/" +
        new Date().getTime() +
        "-" +
        Math.round(10000000000 * Math.random());
    edgeUpperInstanceToRowInstance.set("edgeSource", upperInstanceURI);

    var edgeToThisRowInstance = _this._getEdgeObject(
        null,
        selectInstance.URI,
        "http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance"
    );

    var objectsNeedToBeRemoved = _this._getAllObjectsInThisRowInstanceAsList(selectInstance);
    objectsNeedToBeRemoved.push(edgeToThisRowInstance);

    if (selectDom.text() && selectDom.text() !== "Select Row") {
        // get all the questionInstance and answerInstance objects
        var msg = vitaljs.graphObject({ type: "http://vital.ai/ontology/harbor-ai#GetRowSelectionInstancesRequest" });
        msg.URI =
            "http://vital.ai/haley.ai/haley-saas/GetRowSelectionInstancesRequest/" +
            new Date().getTime() +
            "-" +
            Math.round(100000000000 * Math.random());
        msg.set("channelURI", UI_CHANNEL.URI);

        HALEY_API.sendMessageWithRequestCallback(
            HALEY_SESSION,
            msg,
            [_this.submissionObject, row, _this.rowOptions[row.URI][objectURI]],
            function (error) {
                if (error) {
                    console.error("Error when sending GetRowSelectionInstancesRequest Request", error);
                } else {
                    console.log("GetRowSelectionInstancesRequest Request Message Sent");
                }
            },
            function (msgRL) {
                var msg = msgRL.first();
                if (msg.type != "http://vital.ai/ontology/vital-aimp#MetaQLResultsMessage") {
                    console.warn("Ignoring message of type: " + msg.type);
                    return true;
                }

                var status = msg.get("status");
                var statusMessage = msg.get("statusMessage");

                if (status != "ok") {
                    console.error("ERROR when getting logins table data", statusMessage);
                    return false;
                }

                var newRowInstances = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleyRowInstance");
                if (!newRowInstances || newRowInstances.length < 1) {
                    return false;
                }

                // Find the rowInstance that is going to replace the current RowInstance. There could be multiple of them as there might be children rowInstance.
                var newRowInstance = null;
                for (var i = 0; i < newRowInstances.length; i++) {
                    var ins = newRowInstances[i];
                    if (ins.get("haleyRow") === rowURI) {
                        newRowInstance = ins;
                        break;
                    }
                }

                if (!newRowInstance) {
                    console.error("No Relative RowInsance Found", newRowInstances);
                } else {
                    console.log("newRowInstance Return", newRowInstance);
                }

                // change the edge property.
                edgeUpperInstanceToRowInstance.set("edgeDestination", newRowInstance.URI);

                // fill in the answer value to the existing collumn; replace the existing questionistance object with new row instance objects;
                msgRL.addResult(edgeUpperInstanceToRowInstance);

                _this._deleteGroupObjects(objectsNeedToBeRemoved);

                _this._addNewInstanceObjectsToData(msgRL.iterator());

                _this._mapDataIntoThisObject();

                var rowLevel = thisDom.closest(".row-group").attr("row-level");

                var text = _this._rowInstanceToHtml(row, newRowInstance, "", rowLevel);

                var rowDom = thisDom.parents(".row-group");
                thisDom.replaceWith(text);

                _this._updateRowInstanceCounter(upperInstanceURI, row.URI);

                thisDom = rowDom.find('.row-item[row-instance-uri="' + newRowInstance.URI + '"]');

                _this._enableInputs(thisDom.parents(".question-group"));

                var selectDom1 = thisDom.find("select.select-input-for-row-selection");

                _this._getSelectionOptionsForRow(row, selectDom1);

                return false;
            }
        );
    }
};

// option: we can use trigger function to trigger the change event and pass the option parameter. see the function QuestionChoice.prototype.clearInput
GroupInstanceWidget.prototype._onWrappedQuestionInputChange = function (e, option = {}) {
    e.preventDefault();
    e.stopImmediatePropagation();

    if (option.stop) return;

    var _this = this;

    // if this an media row, then the change should limited inside the row.
    var rowInstanceDom = $(e.target).closest(GroupInstanceWidget.SELECTOR_ROW_INSTANCE);
    var isWithinMediaRow = rowInstanceDom.hasClass(GroupInstanceWidget.CLASS_MEDIA_ROW_INSTANCE);
    var dom = isWithinMediaRow ? rowInstanceDom : $(e.target).closest(".this-group-instance-widget");

    var uri = $(e.target).closest(".wrapped-question").data("answer-instance-uri");
    var questionDom = _this.mappingAnswerInstanceToQuestionDom[uri];
    questionDom.updateThisInputValue();
    questionDom.triggerValidation();

    const rowInstanceURI =  rowInstanceDom.attr('row-instance-uri');
    // const rowInstanceURI =  _this.msgRL.get(rowInstanceDom.attr('row-instance-uri')).URI;
    const rowURI = _this.mappingRowInstanceToRow[rowInstanceURI].URI;


    let answer = questionDom.answer;
    if (answer === undefined || answer === null) {
        answer = "";
    }

    let newAnswer = questionDom.getInputValue();
    if (newAnswer === undefined || newAnswer === null) {
        newAnswer = "";
    }

    
    const bindQuoteRow = $('.row-group[row-uri="http://vital.ai/haley.ai/harbor-saas/HaleyRow/BrokerQuoteOption-BindQuote-BindQuote"]');

    if (answer !== newAnswer) {
        this.groupInstance.set('inconsistentGroupInstance', true);
        bindQuoteRow.stop().animate({ backgroundColor: '#FCE599' }, 400);
        bindQuoteRow.find(_this.selector.updateRowButton).prop('disabled', false);
        $(`div[row-uri='${rowURI}']`).find(_this.selector.updateRowButton).prop('disabled', false);
        $('.bind-request').prop('disabled', true);
    } else {
        this.groupInstance.set('inconsistentGroupInstance', false);
        bindQuoteRow.stop().animate({ backgroundColor: 'white' }, 400);
        bindQuoteRow.find(_this.selector.updateRowButton).prop('disabled', true);
        $(`div[row-uri='${rowURI}']`).find(_this.selector.updateRowButton).prop('disabled', true);
        $('.bind-request').prop('disabled', false); 
    }

    

    // enable the dependency question.
    _this._enableInputs(dom, e);

    // This is not handling
    if (!$(e.target).hasClass("answer-follow-type")) {
        var uri = $(e.target).closest(".wrapped-question").data("answer-instance-uri");
        var answerInstance = _this.mappingGroupObjects[uri];
        if (answerInstance) {
            answerInstance.set(
                "haleyAnswerFollowupType",
                "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_FIRM_ANSWER"
            );
            $(e.target)
                .closest(".wrapped-question")
                .find(".answer-follow-type")
                .each(function () {
                    if ($(this).val() === "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_FIRM_ANSWER") {
                        $(this).prop("checked", true);
                    }
                });
        } else {
            console.error("This QuestionType is Not Handled or cannot find the relative AnswerInstance", uri);
        }
    } else {
        // if the change is happened on answer-follow-up-type and No Answer is selected. then clear the input.
        var selectedAnswerFollowupType = questionDom.getSelectedAnswerFollowupType();
        if (selectedAnswerFollowupType === "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER") {
            questionDom.clearInput();
        }
    }
};

GroupInstanceWidget.prototype._onGetCommentClick = function (e) {
    e.preventDefault();

    var _this = this;

    var rowURI = $(e.target).closest(".row-group").attr("row-uri");
    var row = _this.getObjectByURI(rowURI);

    if (!row) return;

    var groupInstance = _this.getGroupInstance();

    var commandType = GroupInstanceWidget.COMMAND_GET_GROUP_ROW_INSTANCE_REQUEST;

    var commandProperties = {};

    var message = {};

    var payload = [groupInstance, row];

    _this.objectsToSendWithGetComment.forEach(function (element) {
        payload.push(element);
    });

    var callback = function (msgRL) {
        var msg = msgRL.first();

        var objs = JSON.parse(msg.get("payload") || "[]");

        if (!objs.length) {
            _this.MNW.addErrorMessage("No Instance Message Received");
            return;
        }

        _this.commentRowGetFromServer = objs.map(function (obj) {
            return vitaljs.graphObject(obj);
        });

        _this._commentGroupOnEditMode();
    };

    HarborCommandRequest.requestWithMetaQLResultsMessageReturn.call(
        _this,
        commandType,
        commandProperties,
        payload,
        message,
        callback,
        { ignoreIsActive: true }
    );
};

GroupInstanceWidget.prototype._onSaveCommentClick = function (e) {
    e.preventDefault();

    var _this = this;

    var value = _this.dom.find(".comment-group-input-area").find("textarea").val();

    // check whether a group of row Instance, q-a instance have already been get from the server or not.
    if (Array.isArray(this.commentRowGetFromServer) && this.commentRowGetFromServer.length) {
        this.commentRowGetFromServer.forEach(function (instance) {
            if (instance.type === "http://vital.ai/ontology/haley-ai-question#HaleyLongTextAnswerInstance") {
                instance.set("longTextAnswerValue", value);
            }
        });
    } else {
        this.MNW.addErrorMessage("No Comment Row Instance Get From Server, Please get again");
        _this._commentGroupOnDisabledMode();
        return;
    }

    var rowURI = $(e.target).closest(".row-group").attr("row-uri");
    var row = _this.getObjectByURI(rowURI);

    if (!row) return;

    var groupInstance = _this.getGroupInstance();

    var commandType = "http://vital.ai/ontology/harbor-ai#SubmitGroupRowAnswersRequest";

    var commandProperties = {
        payload: JSON.stringify(this.commentRowGetFromServer),
    };

    var message = {};

    var payload = [groupInstance, row];

    _this.objectsToSendWithSaveComment.forEach(function (element) {
        payload.push(element);
    });

    var callback = function (msgRL) {
        _this.commentRowGetFromServer = [];
        _this._commentGroupOnDisabledMode();
    };

    HarborCommandRequest.requestWithHarborStatusMessageReturn.call(
        _this,
        commandType,
        commandProperties,
        payload,
        message,
        callback,
        { ignoreIsActive: true }
    );
};

GroupInstanceWidget.prototype._onCancelCommentClick = function (e) {
    e.preventDefault();
    _this.commentRowGetFromServer = [];
    this._commentGroupOnDisabledMode();
};

GroupInstanceWidget.prototype._commentGroupOnDisabledMode = function () {
    this.dom.find(".cancel-comment").hide("slow");
    this.dom.find(".comment-group-input-area").hide("slow");
    this.dom.find(".save-comment").hide("slow");
    this.dom.find(".get-comment").show("slow");
};

GroupInstanceWidget.prototype._commentGroupOnEditMode = function () {
    this.dom.find(".cancel-comment").show("slow");
    this.dom.find(".comment-group-input-area").show("slow");
    this.dom.find(".save-comment").show("slow");
    this.dom.find(".get-comment").hide("slow");
};


GroupInstanceWidget.prototype._onResetRowButtonClick = function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    var _this = this;

    if (!_this.isEditMode) {
      return false;
    }

    $(`[uri="${_this.groupInstance.URI}"]`).find('.section-question').each(function () {

        if ($(this).attr('uri') === 'http://vital.ai/haley.ai/harbor-saas/HaleySection/Inquiry-Quote-UnderwritingResult') {

            const upperRows = $(this).find('.row-group').eq(0).find('.row-item.row-level-0')

            upperRows.each(function(){
                $(this).find('.delete-row').eq(0).trigger("click")
            })

        } else if ($(this).attr('uri') === 'http://vital.ai/haley.ai/harbor-saas/HaleySection/Inquiry-Quote-ScheduleOfHazard') {

            $(this).find('.delete-row-horizontal').each(function(){
                $(this).trigger("click")
            })
        }
    });
}


GroupInstanceWidget.prototype._onUpdateRowButtonClick = function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    var _this = this;

    if (!_this.isEditMode) {
      return false;
    }
    
    $(_this.selector.updateRowButton).prop('disabled', true);
    _this._disableAllInput(this.dom);

    let dom;
    let rowURI;
    let rowInstance;
    let rowInstanceURI;
    let upperInstanceURI;
    let sectionInstance;

    if (e.target.id === 'updateScheduleOfHazard' || e.target.id === 'updateFeeScheduleLineItem') {
        rowURI = $(e.target).parent().parent().attr('row-uri');
        rowInstance = _this.mappingRowWithRowInstances[rowURI];
        rowInstanceURI = rowInstance.URI;

        dom = $('[row-uri="' + rowURI + '"]');

        // Find the upperInstance connected to this instanceObject. Could be a sectionInstance or a rowInstance.
        sectionInstance = _this.mappingSectionToSectionInstances[dom.closest(".section-question").attr("uri")];

        upperInstanceURI = sectionInstance.URI;

    } else {
        rowInstanceURI = $(e.target).closest('.row-item').attr('row-instance-uri');
        rowInstance = _this.mappingGroupObjects[rowInstanceURI];

        dom = $('[row-instance-uri="' + rowInstance.URI + '"]');

        // Find the upperInstance connected to this instanceObject. Could be a sectionInstance or a rowInstance.
        upperInstanceURI = dom.closest(".row-item").parents(".row-item").attr("row-instance-uri");
        sectionInstance = _this.mappingSectionToSectionInstances[dom.closest(".section-question").attr("uri")];

        upperInstanceURI = upperInstanceURI || sectionInstance.URI;
    }

    var allInstanceObjects = _this.getAllInstanceObjects();

    let timeOut = false;

    let commandType;

    if (e.target.id === 'updateQuote') {
        commandType = 'http://vital.ai/ontology/harbor-ai#ReviseBindQuoteRowAnswersRequest';
    } else if (e.target.id === 'updateCoverageType') {
        commandType = 'http://vital.ai/ontology/harbor-ai#ReviseCoverageRowAnswersRequest';
    } else if (e.target.id === 'updateScheduleOfHazard') {
        commandType = 'http://vital.ai/ontology/harbor-ai#ReviseHazardRowAnswersRequest';
    } else if (e.target.id === 'updateUnderwriting') {
        commandType = 'http://vital.ai/ontology/harbor-ai#ReviseUnderwritingRowAnswersRequest';
    } else if (e.target.id === 'updateFeeScheduleLineItem') {
      commandType = 'http://vital.ai/ontology/harbor-ai#ReviseFeeScheduleRowAnswersRequest';
    }

    var commandProperties = {
        reviseRowInstance: rowInstanceURI,
        payload: JSON.stringify(allInstanceObjects)
    }



    var message = {};

    var payload = [];

    var callback = function (msgRL) {
        console.log('msgRL:', msgRL);

        if (timeOut === false) {

            clearTimeout(timer);

            var msg = msgRL.first();

            var arrs = JSON.parse(msg.get('payload') || '[]');

            const answerInstances = [];

            arrs.forEach(function (element) {
                if (!element.type.includes('Edge') && element.type.includes('AnswerInstance')) {
                answerInstances.push(element);
                }
                msgRL.addResult(vitaljs.graphObject(element));
            });

            var edgeUpperInstanceToRowInstance = vitaljs.graphObject({
            type: 'http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance'
            });
            edgeUpperInstanceToRowInstance.URI =
            'http://vital.ai/haley.ai/haley-saas/Edge_hasRowInstance/' + new Date().getTime() + '-' + Math.round(10000000000 * Math.random());
            edgeUpperInstanceToRowInstance.set('edgeSource', upperInstanceURI);

            var edgeToThisRowInstance = _this._getEdgeObject(
            null,
            rowInstance.URI,
            'http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance'
            );
            var objectsNeedToBeRemoved = _this._getAllObjectsInThisRowInstanceAsList(rowInstance);
            objectsNeedToBeRemoved.push(edgeToThisRowInstance);

        
            
            // Get the new RowInstance from msgRL
            var newRowInstances = msgRL.iterator('http://vital.ai/ontology/haley-ai-question#HaleyRowInstance');
            if (!newRowInstances || newRowInstances.length < 1) {
                return false;
            }

            // Find the rowInstance that is going to replace the current RowInstance. There could be multiple of them as there might be children rowInstance.
            var newRowInstance = null;
            for (var i = 0; i < newRowInstances.length; i++) {
                var ins = newRowInstances[i];
                if (rowInstance.length > 1) rowInstance = rowInstance[0];
                if (ins.get('haleyRow') === rowInstance.get('haleyRow')) {
                newRowInstance = ins;
                break;
                }
            }

            if (!newRowInstance) {
                console.error('No Relative RowInsance Found', newRowInstances);
            } else {
                if (newRowInstance.get('haleyRow') === "http://vital.ai/haley.ai/harbor-saas/HaleyRowType/BindQuote") {
                    newRowInstance.set('readOnlyRowValue', true);
                }
                console.log('newRowInstance Return', newRowInstance);
            }

            // change the edge property.
            edgeUpperInstanceToRowInstance.set('edgeDestination', newRowInstance.URI);

            // fill in the answer value to the existing column; replace the existing questionistance object with new row instance objects;
            msgRL.addResult(edgeUpperInstanceToRowInstance);

            _this._deleteGroupObjects(objectsNeedToBeRemoved);

            _this._addNewInstanceObjectsToData(msgRL.iterator());

            _this._mapDataIntoThisObject();

            

            var rowLevel = dom.closest('.row-group').attr('row-level');

            var row = _this.mappingGroupObjects[rowInstance.get('haleyRow')];

            var text = _this._rowInstanceToHtml(row, newRowInstance, '', rowLevel);

            var rowDom = dom.closest('.row-group');

            dom.replaceWith(text);

            _this._updateRowInstanceCounter(upperInstanceURI, row.URI);

            dom = rowDom.find('.row-item[row-instance-uri="' + newRowInstance.URI + '"]');

            // Create A Jquery Object for every QuestionDomObject under dom;
            const parentDom = dom.parent().parent();
            _this._initDomValueForQuestionDomObject(parentDom);
            _this._hideDependencyQuestions(parentDom);

            // // Disable all inputs within the new row after all the questions are loaded
            // _this._disableAllInput(dom);

            // Enable all inputs after making the new row read-only
            const groupInstanceURI = _this.getGroupInstance().URI;
            const groupInstanceDom = $(`div[data-uri="${groupInstanceURI}"]`);
            // constgroupInstanceDom.find('.panel-collapse')
            _this._enableInputs(groupInstanceDom);

            const rowInstanceHeader = rowDom.children('.row-item').children('.row-instance-header');

            if (row.get('haleyRowTypeURI') === 'http://vital.ai/haley.ai/harbor-saas/HaleyRowType/BindQuote') {

                const bindRequestBtn = '<button class="bind-request pull-right btn btn-sm btn-primary" tabindex="-1" disabled>Bind Request</button>'

                const updateBtn = `<button id='updateQuote' class='update-row btn btn-primary btn-sm pull-right initial-hide edit-show-inline' tabindex='-1' style='display: inline-block; margin-left: 5px;' disabled>Update Quote</button>`;

                rowInstanceHeader.prepend(bindRequestBtn);
                rowInstanceHeader.prepend(updateBtn);
                rowDom.find('.delete-row').hide();
                

                // Disable all inputs within the new row after all the questions are loaded
                _this._disableAllInput(dom);
            
            } else {

                const updateBtn = `<button id='updateQuote' class='update-row btn btn-primary btn-sm pull-right initial-hide edit-show-inline' tabindex='-1' style='display: inline-block; margin-left: 5px;' disabled>Update Quote</button>`;

                rowInstanceHeader.prepend(updateBtn);

            }

            
            _this.groupGroupInstances[0].set('inconsistentGroupInstance', false)

            if (!_this.groupGroupInstances[0].get('inconsistentGroupInstance')) {
                $('.bind-request').prop('disabled', false);
                $('#bind-details-panel-send-to-carrier').prop('disabled', false);
            } else {
                $('.bind-request').prop('disabled', true);
                $('#bind-details-panel-send-to-carrier').prop('disabled', true);
            }

            $(`[row-uri='${row.URI}']`).eq(0).stop().animate({ backgroundColor: '#B6D7A9' }, 400);

            // ** TEST: not displaying delete / add row button when maximum/minimum row count is 1 ** //

            // set max/min row count to 1
            // let edgeHasRow = null;
            // _this.groupEdgeHasRow.forEach(edge => {
            //     if (edge.get('edgeDestination') === row.URI) {
            //         edge.set('maximumRowCount', 1)
            //         edge.set('minimumRowCount', 1)
            //         edgeHasRow = edge;
            //     }
            // })

            // if max/min row count is 1, hide buttons
            // groupInstanceDom.find('.row-group').each(function () {
            //     if ($(this).attr('row-uri') === edgeHasRow.get('edgeDestination')) {
            //         if (edgeHasRow.get('maximumRowCount') === 1) {
            //             $(this).find(_this.selector.addRowButton).hide();
            //         }

            //         if (edgeHasRow.get('minimumRowCount') === 1) {
            //             $(this).find(_this.selector.deleteRowButton).hide();
            //         }
            //     }
            // });
            // // ** TEST ends ** //
        }
    };

    HarborCommandRequest.requestWithMetaQLResultsMessageReturn.call(_this, commandType, commandProperties, payload, message, callback, { ignoreIsActive: true });

    const timer = setTimeout(() => {

        timeOut = true;

        console.error('Request Timed Out');

        if (!!_this.MNW) {
            _this.MNW.addErrorMessage('Request Timed Out');
        }

        _this._enableInputs(_this.getDom());

        $('.update-row').prop('disabled', false);
    }, 300000);
    
};

/**
 * from the rowInstance object, get the dom, remove all the instance object under the rowInstance, replace with the instance object with in msgRL.
 * @param  {[type]} rowInstance [description]
 * @param  {[type]} msgRL       QLResultList, new instance objects
 * @return {[type]}             [description]
 */
GroupInstanceWidget.prototype._replaceWithNewRowInstance = function (rowInstance, msgRL) {
    var _this = this;

    // rowInstance = _this.mappingGroupObjects['mock:rowInstance-3'];
debugger
    var dom = $('[row-instance-uri="' + rowInstance.URI + '"]');

    // Find the upperInstance connected to this instanceObject. Could be a sectionInstance or a rowInstance.
    var upperInstanceURI = dom.closest(".row-item").parents(".row-item").attr("row-instance-uri");
    var sectionInstance = _this.mappingSectionToSectionInstances[dom.closest(".section-question").attr("uri")];

    upperInstanceURI = upperInstanceURI || sectionInstance.URI;

    var edgeUpperInstanceToRowInstance = vitaljs.graphObject({
        type: "http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance",
    });
    edgeUpperInstanceToRowInstance.URI =
        "http://vital.ai/haley.ai/haley-saas/Edge_hasRowInstance/" +
        new Date().getTime() +
        "-" +
        Math.round(10000000000 * Math.random());
    edgeUpperInstanceToRowInstance.set("edgeSource", upperInstanceURI);

    var edgeToThisRowInstance = _this._getEdgeObject(
        null,
        rowInstance.URI,
        "http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance"
    );
    var objectsNeedToBeRemoved = _this._getAllObjectsInThisRowInstanceAsList(rowInstance);
    objectsNeedToBeRemoved.push(edgeToThisRowInstance);

    // Get the new RowInstance from msgRL
    var newRowInstances = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleyRowInstance");
    if (!newRowInstances || newRowInstances.length < 1) {
        return false;
    }

    // Find the rowInstance that is going to replace the current RowInstance. There could be multiple of them as there might be children rowInstance.
    var newRowInstance = null;
    for (var i = 0; i < newRowInstances.length; i++) {
        var ins = newRowInstances[i];
        if (ins.get("haleyRow") === rowInstance.get("haleyRow")) {
            newRowInstance = ins;
            break;
        }
    }

    if (!newRowInstance) {
        console.error("No Relative RowInsance Found", newRowInstances);
    } else {
        console.log("newRowInstance Return", newRowInstance);
    }

    // change the edge property.
    edgeUpperInstanceToRowInstance.set("edgeDestination", newRowInstance.URI);

    // fill in the answer value to the existing collumn; replace the existing questionistance object with new row instance objects;
    msgRL.addResult(edgeUpperInstanceToRowInstance);

    _this._deleteGroupObjects(objectsNeedToBeRemoved);

    _this._addNewInstanceObjectsToData(msgRL.iterator());

    _this._mapDataIntoThisObject();

    var rowLevel = dom.closest(".row-group").attr("row-level");

    var row = _this.mappingGroupObjects[rowInstance.get("haleyRow")];

    var text = _this._rowInstanceToHtml(row, newRowInstance, "", rowLevel);

    var rowDom = dom.closest(".row-group");
    dom.replaceWith(text);

    _this._updateRowInstanceCounter(upperInstanceURI, row.URI);

    dom = rowDom.find('.row-item[row-instance-uri="' + newRowInstance.URI + '"]');

    // Create A Jquery Object for every QuestionDomObject under dom;
    _this._initDomValueForQuestionDomObject(dom);

    _this._hideDependencyQuestions(dom);

    // Disable all inputs after all the questions are loaded
    // _this._disableAllInput(dom);
};

/**
 * from the rowInstance object, get the dom, remove all the instance object under the rowInstance, replace with the instance object with in msgRL.
 * @param  {[type]} sectionInstance [description]
 * @param  {[type]} msgRL       QLResultList, new instance objects
 * @return {[type]}                 [description]
 */
GroupInstanceWidget.prototype._replaceWithNewSectionInstance = function (sectionInstance, msgRL) {
    var _this = this;

    // sectionInstance = _this.mappingGroupObjects['mock:SectionInstance-2'];

    var dom = $('.section-question[section-instance-uri="' + sectionInstance.URI + '"]');

    var edgeUpperInstanceToRowInstance = vitaljs.graphObject({
        type: "http://vital.ai/ontology/haley-ai-question#Edge_hasSectionInstance",
    });
    edgeUpperInstanceToRowInstance.URI =
        "http://vital.ai/haley.ai/haley-saas/Edge_hasRowInstance/" +
        new Date().getTime() +
        "-" +
        Math.round(10000000000 * Math.random());
    edgeUpperInstanceToRowInstance.set("edgeSource", _this.groupInstanceURI);

    var edgeToThisSectionInstance = _this._getEdgeObject(
        null,
        sectionInstance.URI,
        "http://vital.ai/ontology/haley-ai-question#Edge_hasSectionInstance"
    );
    var objectsNeedToBeRemoved = _this._getAllObjectsInThisSectionInstanceAsList(sectionInstance);
    objectsNeedToBeRemoved.push(edgeToThisSectionInstance);

    // Get the new RowInstance from msgRL
    var newSectionInstances = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleySectionInstance");
    if (!newSectionInstances || newSectionInstances.length < 1) {
        return false;
    }

    // Find the rowInstance that is going to replace the current RowInstance. There could be multiple of them as there might be children rowInstance.
    var newSectionInstance = null;
    for (var i = 0; i < newSectionInstances.length; i++) {
        var ins = newSectionInstances[i];
        if (ins.get("haleySection") === sectionInstance.get("haleySection")) {
            newSectionInstance = ins;
            break;
        }
    }

    if (!newSectionInstance) {
        console.error("No Relative SectionInsance Found", newSectionInstances);
    } else {
        console.log("newSectionInstance Return", newSectionInstance);
    }

    // change the edge property.
    edgeUpperInstanceToRowInstance.set("edgeDestination", newSectionInstance.URI);

    // fill in the answer value to the existing collumn; replace the existing questionistance object with new row instance objects;
    msgRL.addResult(edgeUpperInstanceToRowInstance);

    _this._deleteGroupObjects(objectsNeedToBeRemoved);

    _this._addNewInstanceObjectsToData(msgRL.iterator());

    _this._mapDataIntoThisObject();

    var text = _this._sectionInstanceToHTML(newSectionInstance);

    dom.replaceWith(text);

    dom = _this.dom.find('.section-question[section-instance-uri="' + newSectionInstance.URI + '"]');

    // Create A Jquery Object for every QuestionDomObject under dom;
    _this._initDomValueForQuestionDomObject(dom);

    _this._hideDependencyQuestions(dom);

    // Disable all inputs after all the questions are loaded
    _this._disableAllInput(dom);
};

// Set the answerInstance to default value
GroupInstanceWidget.prototype._setAnswerValueToDefault = function (answerInstance) {
    var _this = this;

    var mappingGroupObjects = _this.mappingGroupObjects;
    var mappingAnswerToDefaultAnswer = _this.mappingAnswerToDefaultAnswer;

    var answerFollowupType = answerInstance.get("haleyAnswerFollowupType");

    if (answerFollowupType === "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER") {
        var answeruri = answerInstance.get("haleyAnswer");
        var answer = mappingGroupObjects[answeruri];
        var type = answer.type;
        var defaultAnswer = mappingAnswerToDefaultAnswer[answeruri];

        // Return if no default answer object provided.
        if (!defaultAnswer) {
            return;
        }

        switch (type) {
            case "http://vital.ai/ontology/haley-ai-question#HaleyBooleanAnswer":
                answerInstance.set("booleanAnswerValue", defaultAnswer.get("booleanAnswerValue"));
                break;

            case "http://vital.ai/ontology/haley-ai-question#HaleyChoiceAnswer":
                answerInstance.set("choiceAnswerValue", defaultAnswer.get("choiceAnswerValue"));
                break;

            case "http://vital.ai/ontology/haley-ai-question#HaleyDateTimeAnswer":
                answerInstance.set("dateTimeAnswerValue", defaultAnswer.get("dateTimeAnswerValue"));
                break;

            case "http://vital.ai/ontology/haley-ai-question#HaleyLongTextAnswer":
                answerInstance.set("longTextAnswerValue", defaultAnswer.get("longTextAnswerValue"));
                break;

            case "http://vital.ai/ontology/haley-ai-question#HaleyMultiChoiceAnswer":
                answerInstance.set("multiChoiceAnswerValue", defaultAnswer.get("multiChoiceAnswerValue"));
                break;

            case "http://vital.ai/ontology/haley-ai-question#HaleyNumberAnswer":
                var answer = this.mappingAnswerInstanceToAnswer[answerInstance.URI];
                var answerDataType = answer.get("haleyAnswerDataType");
                if (answerDataType === "http://vital.ai/ontology/haley-ai-question#HaleyIntegerDataType") {
                    answerInstance.set("integerAnswerValue", defaultAnswer.get("integerAnswerValue"));
                } else {
                    answerInstance.set("doubleAnswerValue", defaultAnswer.get("doubleAnswerValue"));
                }
                break;

            case "http://vital.ai/ontology/haley-ai-question#HaleySignatureAnswer":
                answerInstance.set("signatureAnswerValue", defaultAnswer.get("signatureAnswerValue"));
                break;

            case "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer":
                var value = defaultAnswer.get("textAnswerValue");
                answerInstance.set("textAnswerValue", value);
                break;

            case "http://vital.ai/ontology/haley-ai-question#HaleyTaxonomyAnswer":
                var fancyTreeWidget = _this.mappingTaxonomyAnswerInstanceToFancyTree[answerInstance.URI];
                answerInstance.set("taxonomyAnswerValue", defaultAnswer.get("taxonomyAnswerValue"));
                break;

            case "http://vital.ai/ontology/haley-ai-question#HaleyMultiTaxonomyAnswer":
                var fancyTreeWidget = _this.mappingTaxonomyAnswerInstanceToFancyTree[answerInstance.URI];
                answerInstance.set("multiTaxonomyAnswerValue", defaultAnswer.get("multiTaxonomyAnswerValue"));
                break;

            default:
                console.error("No Such Question Type Found", type);
        }

        var dom = $('[instanceuri="' + answerInstance.URI + '"]');

        _this._updateDomValueAccordingToAnswerInstance(answerInstance, dom);
    }
};

GroupInstanceWidget.prototype._sectionInstanceToHTML = function (sectionInstance) {
    var _this = this;

    var section = _this.msgRL.get(sectionInstance.get("haleySection"));
    var questionEdges = _this.groupEdgeHasQuestion;
    var additionalStyleClasses = [];
    var questions = [];

    var isHiddenInGroupDisplay = section.get("hiddenInGroupDisplay") || sectionInstance.get("hiddenInGroupDisplay");

    if (isHiddenInGroupDisplay) additionalStyleClasses.push("hidden-in-group-display");

    // Get Questions directely belong to this section
    var questionsBelongToThisSection = [];

    for (var e = 0; e < questionEdges.length; e++) {
        var edge = questionEdges[e];
        if (section.URI === edge.get("edgeSource")) {
            questionsBelongToThisSection.push(_this.msgRL.get(edge.get("edgeDestination")));
        }
    }

    for (var q = 0; q < questionsBelongToThisSection.length; q++) {
        var question = questionsBelongToThisSection[q];
        var questionInstance = _this._getQuestionInstanceOfThisSectionInstance(question, sectionInstance);
        var edgeHasQuestionTemp = _this._getEdgeObject(
            section.URI,
            question.URI,
            "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
        );

        if (!questionInstance || !edgeHasQuestionTemp) {
            console.error("No questionInstance or EdgeHasQuestionTemp detected to this question: ", question);
            console.warn("questionInstance", questionInstance);
            if (!questionInstance)
                console.error(
                    "is QuestionInstance exist in msgRL: ",
                    _this._checkQuestionInstanceExist(_this.msgRL, question)
                );
            console.warn("edgeHasQuestionTemp", edgeHasQuestionTemp);
            continue;
        }

        var questionDomObject = _this._createQuestionDomObject(question, questionInstance, edgeHasQuestionTemp, {
            section: section,
            sectionInstance: sectionInstance,
        });
        questions.push({
            question: questionDomObject ? questionDomObject.toHTML() : "",
        });
    }

    var data = {
        sectionInstanceURI: sectionInstance.URI,
        sectionURI: section.URI,
        name: section.get("name"),
        questions: questions,
        rows: _this._rowsUnderThisObjectToHtml(section, sectionInstance),
        additionalStyleClasses: additionalStyleClasses.join(" "),
    };

    var t = JST["templates/giw/section-instance.hbs"];

    return t(data);
};

/**
 * Get Enhancement, if reuqirement met, replaceed the rowInstance or sectionIntance with the new one returned.
 * @param  string type : "Row" || "Section"
 * @param  {[type]} enhancementRule [description]
 * @param  {[type]} groupInstance         [description]
 * @param  {[type]} sectionOrRowInstance  [description]
 * @return {[type]}
 */
GroupInstanceWidget.prototype._submitEnhancementRequest = function (
    type,
    enhancementRule,
    groupInstance,
    sectionOrRowInstance
) {
    var _this = this;

    var MNW = _this.MNW;
    var msgIdentifier = null;
    if (MNW) {
        msgIdentifier = MNW.addInfoMessage("Getting Enhancement...");
    }

    var msg = vitaljs.graphObject({ type: "http://vital.ai/ontology/harbor-ai#SubmitEnhancementRequest" });
    msg.URI =
        "http://vital.ai/haley.ai/haley-saas/SubmitEnhancementRequest/" +
        new Date().getTime() +
        "-" +
        Math.round(100000000000 * Math.random());
    msg.set("channelURI", UI_CHANNEL.URI);

    var payload = [];

    if (type === "Row") {
        payload = _this._getAllObjectsInThisRowInstanceAsList(sectionOrRowInstance);
    } else {
        payload = _this._getAllObjectsInThisSectionInstanceAsList(sectionOrRowInstance);
    }

    msg.set("payload", JSON.stringify(payload));

    HALEY_API.sendMessageWithRequestCallback(
        HALEY_SESSION,
        msg,
        [enhancementRule, groupInstance, sectionOrRowInstance],
        function (error) {
            if (error) {
                if (MNW) {
                    MNW.addErrorMessage("Error When Getting Enhancement: " + error, msgIdentifier);
                }
                console.error("Error when sending SubmitEnhancementRequest request", error);
            } else {
                console.log("Get Group Question request message sent");
            }
        },
        function (msgRL) {
            var msg = msgRL.first();
            if (msg.type != "http://vital.ai/ontology/vital-aimp#MetaQLResultsMessage") {
                console.warn("Ignoring message of type: " + msg.type);
                return true;
            }

            var status = msg.get("status");
            var statusMessage = msg.get("statusMessage");

            if (status != "ok") {
                if (MNW) {
                    MNW.addErrorMessage("Error When Sending SubmitEnhancementRequest: " + statusMessage, msgIdentifier);
                }
                console.error("ERROR when sending SubmitEnhancementRequest", statusMessage);
                return false;
            }

            if (MNW) {
                MNW.addSuccessMessage("Questions Received", msgIdentifier);
            }

            var arrs = JSON.parse(msg.get("payload")) || [];

            arrs.forEach(function (element) {
                msgRL.addResult(vitaljs.graphObject(element));
            });

            if (type === "Row") {
                _this._replaceWithNewRowInstance(sectionOrRowInstance, msgRL);
            } else {
                _this._replaceWithNewSectionInstance(sectionOrRowInstance, msgRL);
            }

            return false;
        }
    );
};

// base on the given HaleyQuestionObj and haleyAnswerObj, haleyAnswerInstanceObj, compose a questionObj
GroupInstanceWidget.prototype._toQuestionModuleObject = function (
    msgRL,
    edgeHasQuestionTemp,
    haleyQuestionObj,
    haleyAnswerObj,
    haleyAnswerInstanceObj,
    answerOptionEdges,
    option = { row: null, rowInstance: null, section: null, sectionInstance: null }
) {
    // msgRL: vitaljs object
    // answerOptioinEdges: edges to get options for choice question.
    // console.log('_toQuestionModuleObject');
    var _this = this;

    var row = option.row;
    var questionInstance = this.mappingAnswerInstanceToQuestionInstance[haleyAnswerInstanceObj.URI];
    var questionDependencyPairs = this.mappingAnswerURIToItsDependencyAndQuestionPairs[haleyAnswerObj.URI];

    var groupQuestionContextURI = edgeHasQuestionTemp.get(
        GroupInstanceWidget.PROPERTY_HAS_HARBOR_REQUIRED_QUESTION_CONTEXT_URI
    );
    var groupQuestionContextValue = groupQuestionContextURI
        ? GroupInstanceWidget.GROUP_QUESTION_CONTEXT_VALUE_MAPPING[groupQuestionContextURI]
        : 10 || 0;
    var isQuestionRequired =
        edgeHasQuestionTemp.get("requiredQuestion") || groupQuestionContextValue <= this.GROUP_QUESTION_CONTEXT_VALUE;

    var isSuppressEmptyAnswerValues = this._getIsSuppressEmptyAnswerValues({
        rowInstance: option.rowInstance,
        haleyAnswerInstanceObj: haleyAnswerInstanceObj,
    })

    var questionObj = {
        questionURI: haleyQuestionObj.URI,
        answerType: haleyAnswerObj.type.split("#")[1],
        questionCode: haleyAnswerObj.URI,
        question: haleyQuestionObj.get("questionText"),
        description: haleyQuestionObj.get("longDescription"),
        answerInstanceURI: haleyAnswerInstanceObj.URI,
        answer: _this._getAnswerValue(haleyAnswerInstanceObj, haleyAnswerObj),
        followupType: haleyAnswerInstanceObj.get("haleyAnswerFollowupType"),
        isQuestionRequired: isQuestionRequired,
        questionObject: haleyQuestionObj,
        answerObject: haleyAnswerObj,
        answerInstanceObject: haleyAnswerInstanceObj,
        questionInstanceObject: questionInstance,
        questionDependencyPairs: questionDependencyPairs,
        groupInstanceWidget: this,
        isSuppressEmptyAnswerValues: isSuppressEmptyAnswerValues,
    };

    if (
        haleyAnswerObj.type === "http://vital.ai/ontology/haley-ai-question#HaleyChoiceAnswer" ||
        haleyAnswerObj.type === "http://vital.ai/ontology/haley-ai-question#HaleyMultiChoiceAnswer"
    ) {
        var options = [];
        var optionsName = [];
        var optionsValue = [];
        var optionsURI = [];
        var preferredSelectorType = haleyAnswerObj.get("preferredSelectorType");

        answerOptionEdges.forEach(function (answerOptionEdge) {
            if (haleyAnswerObj.URI === answerOptionEdge.get("edgeSource")) {
                var option = msgRL.get(answerOptionEdge.get("edgeDestination"));
                options.push(option);
            }
        });

        options.sort(function (a, b) {
            return a.get("optionOrder") - b.get("optionOrder");
        });
        options.forEach(function (option) {
            optionsName.push(option.get("optionName"));
            optionsValue.push(option.get("optionValue"));
            optionsURI.push(option.URI);
        });

        if (
            preferredSelectorType &&
            preferredSelectorType === "http://vital.ai/ontology/haley-ai-question#HaleyDropdownSelector"
        ) {
            preferredSelectorType = "DROPDOWN_SELECTOR";
        }
        if (
            preferredSelectorType &&
            preferredSelectorType === "http://vital.ai/ontology/haley-ai-question#HaleyMultiDropdownSelector"
        ) {
            preferredSelectorType = "MULTI_DROPDOWN_SELECTOR";
        }
        preferredSelectorType = preferredSelectorType || "";

        questionObj.optionsName = optionsName;
        questionObj.optionsValue = optionsValue;
        questionObj.optionsURI = optionsURI;
        questionObj.preferredSelectorType = preferredSelectorType;
    }

    if (
        haleyAnswerObj.type === "http://vital.ai/ontology/haley-ai-question#HaleyTaxonomyAnswer" ||
        haleyAnswerObj.type === "http://vital.ai/ontology/haley-ai-question#HaleyMultiTaxonomyAnswer"
    ) {
        questionObj.taxonomyRoot = _this.mappingTaxonomyAnswerToTaxonomy[haleyAnswerObj.URI];
        if (!questionObj.taxonomyRoot) {
            console.error("A Taxonomy Object should be connected to the Taxonomy Answer Object");
            console.error("Could not find the Taxonomy Question connected to answer: ", haleyAnswerObj);
        }
    }

    if (haleyAnswerObj.type === QuestionAbstract.TYPE_FILE_UPLOAD_ANSWER && haleyAnswerInstanceObj) {
        var fileNodeURI = haleyAnswerInstanceObj.get(QuestionFileUpload.PROPERTY_FILE_ANSWER_VALUE_URI);
        questionObj.fileNode = fileNodeURI ? msgRL.get(fileNodeURI) : null;
        questionObj.breadCrumbs = _this.config.breadCrumbs;
        questionObj.answerInstanceDetailsURLPrefix = _this.config.fileAnswerInstanceDetailsURLPrefix;
    }

    if (haleyQuestionObj.get("hiddenQuestion")) {
        questionObj.answerType = "Hidden";
    }

    // checking whether there is any
    var registeredValidators = (this.config.panel && this.config.panel.registeredGroupValidators) || [];
    var dataType = haleyAnswerObj.get("haleyAnswerDataType");
    var answerClass = haleyAnswerObj.type;
    var answerType = haleyAnswerObj.get("haleyAnswerType");
    var rowTypeURI = row ? row.get("haleyRowTypeURI") : null;
    var validator = null;
    var priority = 10;

    for (var i = 0; i < registeredValidators.length; i++) {
        var registeredValidator = registeredValidators[i];
        if (priority === 1) break;

        switch (registeredValidator.type) {
            case GroupInstanceWidget.VALIDATOR_TYPE.RowTypeAndAnswerType:
                if (
                    rowTypeURI &&
                    answerType &&
                    registeredValidator.rowType === rowTypeURI &&
                    registeredValidator.answerType === answerType
                ) {
                    validator = registeredValidator;
                    priority = 1;
                }
                break;
            case GroupInstanceWidget.VALIDATOR_TYPE.AnswerType:
                if (answerType && registeredValidator.answerType === answerType && priority > 2) {
                    validator = registeredValidator;
                    priority = 2;
                }
                break;
            case GroupInstanceWidget.VALIDATOR_TYPE.AnswerClassAndDataType:
                if (
                    answerClass &&
                    dataType &&
                    registeredValidator.answerClass === answerClass &&
                    registeredValidator.dataType === dataType &&
                    priority > 3
                ) {
                    validator = registeredValidator;
                    priority = 3;
                }
                break;
            case GroupInstanceWidget.VALIDATOR_TYPE.AnswerClass:
                if (registeredValidator.answerClass === answerClass && priority > 4) {
                    validator = registeredValidator;
                    priority = 4;
                }
                break;
            default:
                console.error("No such register validator type handled: ", registeredValidator.type);
                break;
        }
    }

    questionObj.registeredValidator = validator;

    return questionObj;
};

GroupInstanceWidget.prototype._getIsSuppressEmptyAnswerValues = function(option={}) {
    var rowInstance = option.rowInstance;
    var haleyAnswerInstanceObj = option.haleyAnswerInstanceObj;
    var parentOfRowInstance = rowInstance ? this.mappingRowInstanceToParent[rowInstance.URI] : null;
    var rowInstanceSRowInstanceParent = parentOfRowInstance && parentOfRowInstance.type === GroupInstanceWidget.TYPE_ROW_INSTANCE ? parentOfRowInstance : null;
    var isSuppressEmptyAnswerValues = false;
    if (this.getGroupInstance()) {
        isSuppressEmptyAnswerValues = this.getGroupInstance().get('suppressEmptyAnswerValues');
    }
    if (!isSuppressEmptyAnswerValues && rowInstanceSRowInstanceParent) {
        isSuppressEmptyAnswerValues = rowInstanceSRowInstanceParent.get('suppressEmptyAnswerValues');
    }
    if (!isSuppressEmptyAnswerValues && rowInstance) {
        isSuppressEmptyAnswerValues = rowInstance.get('suppressEmptyAnswerValues');
    }
    if (!isSuppressEmptyAnswerValues) {
        isSuppressEmptyAnswerValues = haleyAnswerInstanceObj.get('suppressEmptyAnswerValues');
    }

    return isSuppressEmptyAnswerValues || false;
}

/**
 * Show Dipendency Questions If On the Dependency Show Mode.
 * @param  JquoryDom Scope of the funciton should be effected.
 * @return {[type]}           [description]
 */
GroupInstanceWidget.prototype._showDependencyQuestions = function (domObject) {
    var mappingAnswerToItsDependencies = this.mappingObjectToItsDependencies;
    var mappingAnswerInstanceToAnswer = this.mappingAnswerInstanceToAnswer;
    var mappingIsQuestionEnable = this.mappingIsQuestionEnable;

    // if domOjbect is not passed, use the dom object on the widget.
    dom = domObject || this.dom;

    dom.find(".wrapped-question").each(function () {
        var answerInstanceURI = $(this).attr("data-answer-instance-uri");
        var answer = mappingAnswerInstanceToAnswer[answerInstanceURI];
        var questionDom = _this.mappingAnswerInstanceToQuestionDom[answerInstanceURI];

        // Only Checking Dependency Quesiotns.
        if (mappingAnswerToItsDependencies[answer.URI]) {
            questionDom.showQuestion();
            if (!mappingIsQuestionEnable[answerInstanceURI]) {
                // Mark the border to identified the dependency questions If the question is currently disabled.
                $(this).css("border", "solid 2px orange");
            }
        }
    });
};

GroupInstanceWidget.prototype._updateInputValue = function (group) {
    var _this = this;

    group.find(".wrapped-question").each(function () {
        var answerInstanceURI = $(this).data("answer-instance-uri");
        var questionDom = _this.mappingAnswerInstanceToQuestionDom[answerInstanceURI];
        questionDom.updateThisInputValue();
    });
};

GroupInstanceWidget.prototype._updateDomValueAccordingToAnswerInstance = function (answerInstance, dom) {
    var _this = this;

    var answerType = dom.attr("answer-type");

    switch (answerType) {
        case "HaleyTextAnswer":
            dom.val(answerInstance.get("textAnswerValue"));
            break;

        case "HaleyBooleanAnswer":
            var value = answerInstance.get("booleanAnswerValue");
            if (value === null) dom.prop("checked", false);
            if (value && dom.val() === "Yes") dom.prop("checked", true);
            if (value === false && dom.val() === "No") dom.prop("checked", true);
            break;

        case "HaleyChoiceAnswer":
            var selectDom = dom.find("select");
            if (selectDom.length) {
                selectDom.val(answerInstance.get("choiceAnswerValue")).trigger("change");
            } else {
                dom.find("input").each(function () {
                    if ($(this).val() === answerInstance.get("choiceAnswerValue")) {
                        $(this).prop("checked", true);
                    }
                });
            }
            break;

        case "HaleyDateTimeAnswer":
            dom.val(CommonHelperFunction.timeToStandardDate(answerInstance.get("dateTimeAnswerValue")));
            break;

        case "HaleyLongTextAnswer":
            dom.val(answerInstance.get("longTextAnswerValue"));
            break;

        case "HaleyNumberAnswer":
            var answer = this.mappingAnswerInstanceToAnswer[answerInstance.URI];
            var answerDataType = answer.get("haleyAnswerDataType");
            if (answerDataType === "http://vital.ai/ontology/haley-ai-question#HaleyIntegerDataType") {
                dom.val(answerInstance.get("integerAnswerValue"));
            } else {
                dom.val(answerInstance.get("doubleAnswerValue"));
            }
            break;

        case "HaleyMultiChoiceAnswer":
            var ansval = answerInstance.get("multiChoiceAnswerValue");
            var selectDom = dom.find("select");
            if (selectDom.length) {
                selectDom.val(ansval).trigger("change");
            } else {
                dom.find("input").each(function () {
                    if (ansval.includes($(this).val())) {
                        $(this).prop("checked", true);
                    } else {
                        $(this).prop("checked", false);
                    }
                });
            }
            break;

        case "HaleySignatureAnswer":
            dom.val(answerInstance.get("signatureAnswerValue"));
            break;

        case "HaleyTaxonomyAnswer":
            var fancyTreeWidget = _this.mappingTaxonomyAnswerInstanceToFancyTree[answerInstance.URI];

            fancyTreeWidget.selectNode(answerInstance);

            break;

        case "HaleyMultiTaxonomyAnswer":
            var fancyTreeWidget = _this.mappingTaxonomyAnswerInstanceToFancyTree[answerInstance.URI];

            fancyTreeWidget.selectNodes(answerInstance);

            break;

        default:
            console.error("No Such Question Type Has Been Handle", answerType);
    }
};

/** update the counter of the rowInstance.  upperInstanceURI and rowURI together identified a set of rowInstance Siblings.
 * @param upperInstanceURI {[URI]} UpperInstance URI could be the uri of a rowInstance or a sectionInstance
 * @param rowURI {[URI]} rowURI is the uri of the row which this rowInstance relate to.
 * @return {[type]} null
 */
GroupInstanceWidget.prototype._updateRowInstanceCounter = function (upperInstanceURI, rowURI) {
    // console.log('_updateRowInstanceCounter');

    var rowInstancesUnderThisUpperInstance = this.mappingUpperInstanceWithRowInstances[upperInstanceURI];
    rowInstances = rowInstancesUnderThisUpperInstance.filter(function (instance) {
        return instance.get("haleyRow") === rowURI;
    });

    // rowInstances.sort(function (a, b) {
    //     var x = a.get("rowInstanceCounter"),
    //         y = b.get("rowInstanceCounter");
    //     if (x === undefined || x === null) return 1;
    //     if (y === undefined || y === null) return -1;
    //     if (x > y) return 1;
    //     else if (x < y) return -1;
    //     else return 0;
    // });

    var cmp = function(a, b) {
        if (a > b) return +1;
        if (a < b) return -1;
        return 0;
    }
    
    rowInstances.sort((a, b) => {
        return cmp(a.get('rowInstanceCounter').length, b.get('rowInstanceCounter').length) || cmp(a.get('rowInstanceCounter'), b.get('rowInstanceCounter'));
    });

    var indexToCapitalCharactor = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    rowInstances.forEach(function (element, index) {
        if (!element.get('rowInstanceCounter')) {

            const char = [];
            const div = index / 26;
            const mod = index % 26;

            if (div >= 1) {
                var idx = Math.floor(div) - 1;
                char.push(indexToCapitalCharactor[idx]);
            } 
            if (index >= 26) {
                if (mod >= 1) {
                    var idx = Math.floor(mod);
                    char.push(indexToCapitalCharactor[idx]);
                } else {
                    var idx = 0;
                    char.push(indexToCapitalCharactor[idx]);
                }
            } else {
                var idx = index;
                char.push(indexToCapitalCharactor[idx]);
            }

            element.set("rowInstanceCounter", char.join(""));
        }

        $('.row-item[row-instance-uri="' + element.URI + '"] >.row-instance-header')
            .find(".row-instance-counter")
            .html(index + 1);
    });
};

GroupInstanceWidget.prototype._showEventMessage = function (dom, message) {
    var _this = this;

    clearTimeout(_this.eventMessageHandler);

    dom.html(message);
    dom.css("display", "block");

    _this.eventMessageHandler = setTimeout(function () {
        dom.css("display", "none");
    }, 5000);
};

GroupInstanceWidget.prototype._onEditMediaRowClick = function (e) {
    e.preventDefault();

    var rowInstanceDom = $(e.target).closest(GroupInstanceWidget.SELECTOR_ROW_INSTANCE);

    rowInstanceDom.find(".edit-hide-media").hide("slow");
    rowInstanceDom.find(".edit-show-media").show("slow");

    this._enableInputs(rowInstanceDom);
};

GroupInstanceWidget.prototype._onCancelMediaRowClick = function (e) {
    e.preventDefault();

    var rowInstanceDom = $(e.target).closest(GroupInstanceWidget.SELECTOR_ROW_INSTANCE);

    rowInstanceDom.find(".edit-hide-media").show("slow");
    rowInstanceDom.find(".edit-show-media").hide("slow");

    this._disableAllInput(rowInstanceDom);
    this._resetToInitialState(rowInstanceDom);
};

GroupInstanceWidget.prototype._onSaveMediaRowClick = function (e) {
    e.preventDefault();

    var _this = this;

    var rowInstanceDom = $(e.target).closest(".row-item");

    var rowInstanceURI = rowInstanceDom.attr("row-instance-uri");
    var rowInstance = this.msgRL.get(rowInstanceURI);

    if (!rowInstance) return;

    var commandType = GroupInstanceWidget.COMMAND_SUBMIT_GROUP_ROW_ANSWERS_REQUEST;

    var message = {};

    var payload = [rowInstance];

    this._updateInputValue(rowInstanceDom);

    var allMediaRowInstanceObjects = this.getAllInstanceUnderRowInstance(rowInstance);

    var commandProperties = {
        payload: JSON.stringify(allMediaRowInstanceObjects),
    };

    var callback = function (msgRL) {
        // update dom
        // var row = _this.mappingRowInstanceToRow[rowInstance.URI];
        // var count = rowInstanceDom.find('h4 .row-instance-counter').text();
        // var classes = rowInstanceDom.attr('class').split(/\s+/);
        // var levelClass = classes.find(function(cls) { return cls.includes('row-level-')});
        // var level = levelClass ? levelClass.split('row-level-')[1]: '0';
        // var html = _this._rowInstanceToHtml(row, rowInstance, count, level)
        // rowInstanceDom.replaceWith(html);

        _this._disableAllInput(rowInstanceDom);

        rowInstanceDom.find(".edit-hide-media").show("slow");
        rowInstanceDom.find(".edit-show-media").hide("slow");

        // update the default answer to the current value, so when we cancel editing, we will be able to set the input to the current value;
        var questionModules = _this.getAllQuestionModule(rowInstanceDom);
        questionModules.forEach(function (module) {
            module.updateDefaultAnswerToCurentInput();
        });
    };

    HarborCommandRequest.requestWithHarborStatusMessageReturn.call(
        _this,
        commandType,
        commandProperties,
        payload,
        message,
        callback,
        { ignoreIsActive: true }
    );
};

GroupInstanceWidget.prototype.getAllQuestionModule = function (dom) {
    var results = [];
    dom.find(".wrapped-question").each(function () {
        var instanceURI = $(this).data("answer-instance-uri");
        var questionDom = _this.mappingAnswerInstanceToQuestionDom[instanceURI];
        results.push(questionDom);
    });

    return results;
};

GroupInstanceWidget.prototype._onAddMediaRowClick = function (e) {
    e.preventDefault();

    var _this = this;

    if (!_this.isEditMode) {
        return false;
    }

    // Find the upperinstance object that connected to this Row. it could be a sectionInstance or a rowInstance
    var upperInstance = null;
    if ($(e.target).closest(".row-item").length) {
        // The upper Instance is the rowInstance
        var dom = $(e.target).closest(".row-item");
        var upperRowInstanceURI = dom.attr("row-instance-uri");
        upperInstance = _this.mappingGroupObjects[upperRowInstanceURI];
    } else {
        // the upperInstance is the sectionInstance
        var sectionDom = $(e.target).closest(".section-question");
        var sectionURI = sectionDom.attr("uri");
        upperInstance = _this.mappingSectionToSectionInstances[sectionURI];
    }

    var rowLevel = $(e.target).closest(".row-group").attr("row-level");

    var rowURI = $(e.target).closest(".row-group").attr("row-uri");
    var row = _this.mappingGroupObjects[rowURI];
    var groupInstance = _this.getGroupInstance();

    var commandType = GroupInstanceWidget.COMMAND_GET_GROUP_ROW_INSTANCE_REQUEST;

    var message = {
        sendingMessage: "Getting new media row...",
        successMessage: "New media row received",
    };

    var payload = [groupInstance, row];

    var commandProperties = {};

    var callback = function (msgRL) {
        var msg = msgRL.first();
        var payload = JSON.parse(msg.get("payload") || "[]");

        var rowInstance = null;
        payload.forEach(function (obj) {
            var graphObject = vitaljs.graphObject(obj);
            if (graphObject.type === QuestionAbstract.TYPE_ROW_INSTANCE) rowInstance = graphObject;
            _this.msgRL.addResult(graphObject);
        });

        if (!rowInstance) {
            console.error("No rowInstance object return", msgRL);
            return;
        }

        _this._mapDataIntoThisObject();

        var text = _this._rowInstanceToHtml(row, rowInstance, "", Number(rowLevel));

        var newRowDom = $(text);

        newRowDom.insertBefore($(e.target).prev("hr")).css("display", "none").show("slow");

        // update the counter of the Instance.
        _this._updateRowInstanceCounter(upperInstance.URI, row.URI);

        // get row selection options fill into the options:
        var selectDom = newRowDom.find(".row-instance-header select");

        _this._getSelectionOptionsForRow(row, selectDom);

        _this._initDomValueForQuestionDomObject(newRowDom);

        _this._disableAllInput(newRowDom);
        newRowDom.find(".edit-hide-media").show("slow");
        newRowDom.find(".edit-show-media").hide("slow");

        _this._enforceConfig(newRowDom);
    };

    HarborCommandRequest.requestWithMetaQLResultsMessageReturn.call(
        _this,
        commandType,
        commandProperties,
        payload,
        message,
        callback,
        { ignoreIsActive: true }
    );
};

GroupInstanceWidget.prototype._renderMediaRowInstance = function (dom, rowInstance) {
    e.preventDefault();

    var _this = this;

    if (!rowInstance) return;

    var commandType = GroupInstanceWidget.COMMAND_GET_GROUP_ROW_INSTANCE_REQUEST;

    var message = {};

    var payload = [rowInstance];

    var commandProperties = {};

    var callback = function (msgRL) {
        var msg = msgRL.first();
        var objs = JSON.parse(msg.get("payload") || "[]");

        this._renderMediaRowInstance(rowInstance);
    };

    HarborCommandRequest.requestWithMetaQLResultsMessageReturn.call(
        _this,
        commandType,
        commandProperties,
        payload,
        message,
        callback,
        { ignoreIsActive: true }
    );
};

GroupInstanceWidget.prototype._onDeleteMediaRowClick = function (e) {
    e.preventDefault();
    var _this = this;

    var rowInstanceURI = $(e.target).closest(".row-item").attr("row-instance-uri");
    var rowInstance = this.msgRL.get(rowInstanceURI);

    if (!rowInstance) return;

    var commandType = GroupInstanceWidget.COMMAND_DELETE_GROUP_ROW_ANSWERS_REQUEST;

    var message = {
        sendingMessage: "Deleting media row...",
        successMessage: "Media row deleted",
    };

    var payload = [rowInstance];

    var commandProperties = {};

    var callback = function (msgRL) {
        _this._deleteMediaRow($(e.target).closest(".row-item"), rowInstance);
    };

    HarborCommandRequest.requestWithHarborStatusMessageReturn.call(
        _this,
        commandType,
        commandProperties,
        payload,
        message,
        callback,
        { ignoreIsActive: true }
    );
};

GroupInstanceWidget.prototype._deleteMediaRow = function (dom, rowInstance) {
    var _this = this;

    if (!_this.isEditMode) {
        return false;
    }

    // First, find the upper instance, could be a sectionInstance or a rowInstance.
    var upperInstanceURI = dom.parents(".row-item").attr("row-instance-uri");
    var sectionInstance = _this.mappingSectionToSectionInstances[dom.closest(".section-question").attr("uri")];
    upperInstanceURI = upperInstanceURI || sectionInstance.URI;
    var rowURI = dom.closest(".row-group").attr("row-uri");

    var rowObjets = _this._getAllObjectsInThisRowInstanceAsList(rowInstance);

    var rowInstanceEdgeToThisRowInstance = _this._getEdgeObject(
        null,
        rowInstance.URI,
        "http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance"
    );
    if (rowInstanceEdgeToThisRowInstance) {
        rowObjets.push(rowInstanceEdgeToThisRowInstance);
        console.log("DELETED EDGE", rowInstanceEdgeToThisRowInstance);
    } else {
        console.error("No Edge Found To Remove");
    }

    // delete all the children object and the sectionhasrowedge object
    _this._deleteGroupObjects(rowObjets);

    _this._mapDataIntoThisObject();

    // set the rowInstanceCounter value to the rowInstance object remain.
    _this._updateRowInstanceCounter(upperInstanceURI, rowURI);

    // Remove dom from the page.
    dom.fadeOut().remove();
};

GroupInstanceWidget.prototype._keyupHandler = function (e) {
    e.preventDefault();
    var uri = $(e.target).closest(".wrapped-question").data("answer-instance-uri");
    if (!uri) return;
    var questionDom = _this.mappingAnswerInstanceToQuestionDom[uri];
    if (!questionDom) return;
    questionDom.triggerValidation();
};

GroupInstanceWidget.prototype.isAllAnswerInstanceValid = function (e) {
    var _this = this;
    var areAllValid = true;
    Object.keys(_this.mappingAnswerInstanceToQuestionDom).forEach(function (uri) {
        var questionDom = _this.mappingAnswerInstanceToQuestionDom[uri];
        if (!questionDom) return true;
        if (!questionDom.isEditMode) return true;
        var isValid = questionDom.isValid();
        if (!isValid) {
            questionDom.triggerValidation();
            areAllValid = false;
        }
    });
    return areAllValid;
};

GroupInstanceWidget.prototype._onSaveButtonClick = function (e) {
    e.preventDefault();

    var _this = this;

    if (_this.isEditMode) {
        if (!_this.isAllAnswerInstanceValid()) {
            this.MNW.addErrorMessage("Please make sure all inputs are valid before save.");
            _this._showEventMessage($(".group-instance-banner-message"), "Incorrect Input Type or Format");
            return;
        }

        _this._updateInputValue(dom);
        _this.config.onSaveButtonClick(dom, _this.getGroupInstance());
    } else {
        dom.closest(".question-group").find(".panel-collapse").removeClass("in");
    }
};

/*
 ********************************************************************************************************************
 * Data Preparation
 ********************************************************************************************************************
 */
GroupInstanceWidget.prototype._prepareDataForEnhancementAnswerDependency = function () {
    var _this = this;
    var msgRL = _this.msgRL;

    var answerDependencies = msgRL.iterator(
        "http://vital.ai/ontology/haley-ai-question#HaleyEnhancementRuleDependency"
    );
    var edgeHasEnhancementRuleAnswerDependencies = msgRL.iterator(
        "http://vital.ai/ontology/haley-ai-question#Edge_hasEnhancementRuleAnswerDependency"
    );
    var edgeHasEnhancementRuleDependencies = msgRL.iterator(
        "http://vital.ai/ontology/haley-ai-question#Edge_hasEnhancementRuleDependency"
    );
    var allRowInstances = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleyRowInstance");
    // var sectionInstances =  msgRL.iterator('http://vital.ai/ontology/haley-ai-question#HaleySectionInstance');

    // var mappingSectionToSectionInstances = {};
    var groupInstance = _this.groupInstance;

    var mappingDependencyToRowOrSection = {};
    var mappingDependencyToanswers = {};
    var mappingDependencyObjects = {};
    var mappingAnswerInstanceURIToEnhancementDependencyWrapper = {};
    var mappingEnhancementDependencyURIToWraper = {};
    var mappingAnswerToAnswerInstance = _this.mappingAnswerToAnswerInstance;
    var mappingRowToRowInstances = {};

    edgeHasEnhancementRuleDependencies.forEach(function (edge) {
        var rowOrSectionURI = edge.get("edgeSource");
        var dependencyURI = edge.get("edgeDestination");
        var rowOrSection = msgRL.get(rowOrSectionURI);
        var dependency = msgRL.get(dependencyURI);

        mappingDependencyToRowOrSection[dependencyURI] = rowOrSection;
        mappingDependencyObjects[dependencyURI] = dependency;
    });

    edgeHasEnhancementRuleAnswerDependencies.forEach(function (edge) {
        var answerURI = edge.get("edgeSource");
        var dependencyURI = edge.get("edgeDestination");

        var haleyAnswer = msgRL.get(answerURI);
        var answerDependency = msgRL.get(dependencyURI);

        if (mappingDependencyToanswers[dependencyURI]) {
            mappingDependencyToanswers[dependencyURI].push(haleyAnswer);
        } else {
            mappingDependencyToanswers[dependencyURI] = [haleyAnswer];
        }

        mappingDependencyObjects[dependencyURI] = answerDependency;
    });

    // creating and mapping the
    Object.keys(mappingDependencyObjects).forEach(function (dependencyURI) {
        var dependency = mappingDependencyObjects[dependencyURI];
        var rowOrSection = mappingDependencyToRowOrSection[dependency.URI];
        var answers = mappingDependencyToanswers[dependency.URI];
        var answerURISet = {};
        var row = null;
        var section = null;

        answers.forEach(function (answer) {
            answerURISet[answer.URI] = true;
        });

        if (rowOrSection.type === "http://vital.ai/ontology/haley-ai-question#HaleyRow") {
            row = rowOrSection;
        } else {
            section = rowOrSection;
        }

        if (row) {
            var rowInstances = allRowInstances.filter(function (rowInstance, index) {
                return rowInstance.get("haleyRow") === row.URI;
            });

            rowInstances.forEach(function (rowInstance) {
                var objs = _this._getAllObjectsInThisRowInstanceAsList(rowInstance);
                var answerInstances = [];

                objs.forEach(function (obj) {
                    if (
                        vitaljs.isSubclassOf(
                            obj.type,
                            "http://vital.ai/ontology/haley-ai-question#HaleyAnswerInstance"
                        ) &&
                        obj.get("haleyAnswer") in answerURISet
                    ) {
                        answerInstances.push(obj);
                    }
                });

                var enhancementDependencyWrapper = EnhancementDependencyWrapperFactory.createWrapper(
                    "Row",
                    dependency,
                    answerInstances,
                    rowInstance,
                    groupInstance
                );
                answerInstances.forEach(function (answerInstance) {
                    mappingAnswerInstanceURIToEnhancementDependencyWrapper[
                        answerInstance.URI
                    ] = enhancementDependencyWrapper;
                });
            });
        }

        if (section) {
            var sectionInstance = _this.mappingSectionToSectionInstances[section.URI];
            // console.warn('bbbb', section.URI, _this.mappingSectionToSectionInstances)
            var objs = _this._getAllObjectsInThisSectionInstanceAsList(sectionInstance);
            var answerInstances = [];

            objs.forEach(function (obj) {
                if (
                    vitaljs.isSubclassOf(obj.type, "http://vital.ai/ontology/haley-ai-question#HaleyAnswerInstance") &&
                    obj.get("haleyAnswer") in answerURISet
                ) {
                    answerInstances.push(obj);
                }
            });

            var enhancementDependencyWrapper = EnhancementDependencyWrapperFactory.createWrapper(
                "Section",
                dependency,
                answerInstances,
                sectionInstance,
                groupInstance
            );
            answerInstances.forEach(function (answerInstance) {
                mappingAnswerInstanceURIToEnhancementDependencyWrapper[
                    answerInstance.URI
                ] = enhancementDependencyWrapper;
            });
        }
    });

    return mappingAnswerInstanceURIToEnhancementDependencyWrapper;
};

/*
 ********************************************************************************************************************
 * Function below are for debugging
 ********************************************************************************************************************
 */

// check whether the dataset is one to one connected with each other.
GroupInstanceWidget.prototype._isOneToOneRelated = function (sourceObject, edges, destinationObject) {
    if (sourceObject.length !== edges.length && edges.length !== destinationObject.length) {
        return false;
    }

    var pairs = {};

    for (edge of edges) {
        var sourceURI = edge.get("edgeSource");
        var destinationURI = edge.get("edgeDestination");

        var source = null;
        var destination = null;

        for (s of sourceObject) {
            if (s.URI === sourceURI) source = s;
        }

        for (d of destinationObject) {
            if (d.URI === destinationURI) destination = d;
        }

        pairs[sourceURI] = destination;
        pairs[destinationURI] = source;

        if ((!destination, source)) {
            console.error("Edge is not connected with object");
        }
    }

    if (Object.keys(pairs).length !== 2 * edges.length) {
        console.error("Error", pairs, edges, sourceObject, destinationObject);
    }
};

GroupInstanceWidget.prototype._printTree = function () {
    var _this = this;

    return;

    var msgRL = _this.msgRL;
    var groupSections = _this.groupSections;
    var groupGroupInstances = _this.groupGroupInstances;

    var mappingGroupInstanceToGroup = _this.mappingGroupInstanceToGroup;
    var mappingSectionInstanceToSection = _this.mappingSectionInstanceToSection;
    var mappingQuestionInstanceToQuestion = _this.mappingQuestionInstanceToQuestion;
    var mappingRowInstanceToRow = _this.mappingRowInstanceToRow;
    var mappingQuestionInstanceToAnswerInstance = _this.mappingQuestionInstanceToAnswerInstance;
    var mappingQuestionToAnswer = _this.mappingQuestionToAnswer;

    var print = console.warn;

    groupGroupInstances.forEach(function (groupInstance, i) {
        var group = mappingGroupInstanceToGroup[groupInstance.URI];
        print("Group", group.get("name"), { group: group, groupInstance: groupInstance });

        var sectionInstances = _this._getNextLevelObjects(
            msgRL,
            groupInstance,
            "http://vital.ai/ontology/haley-ai-question#Edge_hasSectionInstance"
        );

        sectionInstances.forEach(function (sectionInstance, j) {
            var section = mappingSectionInstanceToSection[sectionInstance.URI];
            if (!section) {
                console.error("There Is No Section That Match SectionInstance: ", sectionInstance, groupSections);
            }
            print("--Section", section.get("name"), { section: section, sectionInstance: sectionInstance });

            var questionInstances = _this._getNextLevelObjects(
                msgRL,
                sectionInstance,
                "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
            );

            questionInstances.forEach(function (questionInstance, k) {
                var question = mappingQuestionInstanceToQuestion[questionInstance.URI];
                var answerInstance = mappingQuestionInstanceToAnswerInstance[questionInstance.URI].answerInstance;
                var answer = question
                    ? mappingQuestionToAnswer[question.URI]
                        ? mappingQuestionToAnswer[question.URI].answer
                        : null
                    : null;
                if (!question || !questionInstance || !answer || !answerInstance) {
                    console.error("Data Missing");
                    console.warn("question", question);
                    console.warn("answer", answer);
                    console.warn("questionInstance", questionInstance);
                    console.warn("answerInstance", answerInstance);
                    if (answer && !answerInstance && _this._checkAnswerInstanceExist(this.msgRL, answer))
                        console.error("Do not detect the answerInstance connected to Answer: ", answer);
                    return;
                }
                var questionAndAnswerToString =
                    (question.get("questionText") || "").slice(0, 50) + " : " + _this._getAnswerValue(answerInstance);
                print("-----Question", questionAndAnswerToString, {
                    question: question,
                    questionInstance: questionInstance,
                });
            });

            var rowInstances = _this._getNextLevelObjects(
                msgRL,
                sectionInstance,
                "http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance"
            );

            rowInstances.forEach(function (rowInstance, k) {
                var row = mappingRowInstanceToRow[rowInstance.URI];
                print("-----Row", row.get("name"), { row: row, rowInstance: rowInstance });

                var questionInstances = _this._getNextLevelObjects(
                    msgRL,
                    rowInstance,
                    "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
                );
                questionInstances.forEach(function (questionInstance, l) {
                    var question = mappingQuestionInstanceToQuestion[questionInstance.URI];
                    var answerInstance = mappingQuestionInstanceToAnswerInstance[questionInstance.URI].answerInstance;
                    var questionAndAnswerToString =
                        (question.get("questionText") || "").slice(0, 50) +
                        " : " +
                        (_this._getAnswerValue(answerInstance) || "");
                    print("-------Question", questionAndAnswerToString, {
                        question: question,
                        questionInstance: questionInstance,
                    });
                });
            });
        });
    });
};

GroupInstanceWidget.prototype._checkAnswerInstanceExist = function (msgRL, answer) {
    var answerInstances = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleyAnswerInstance");
    var isAnswerInstanceExist = false;

    for (ins of answerInstances) {
        if (ins.get("haleyAnswer") === answer.URI) {
            isAnswerInstanceExist = true;
            break;
        }
    }

    return isAnswerInstanceExist;
};

GroupInstanceWidget.prototype._checkQuestionInstanceExist = function (msgRL, question) {
    var questionInstances = msgRL.iterator("http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance");
    var isQuestionInstanceExist = false;

    for (ins of questionInstances) {
        if (ins.get("haleyQuestion") === question.URI) {
            isQuestionInstanceExist = true;
            break;
        }
    }

    return isQuestionInstanceExist;
};

GroupInstanceWidget.prototype._onTestButtonClick = function (e) {
    e.preventDefault();

    var _this = this;

    _this._submitEnhancementRequest();
};

module.exports = GroupInstanceWidget;

/***/ }),
/* 3 */
/***/ ((module) => {

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



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});