import GroupInstanceWidget from '../group-instance/group-instance-widget';

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
GroupListWidget = function(dom, giw, config) {
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


export default GroupListWidget;

