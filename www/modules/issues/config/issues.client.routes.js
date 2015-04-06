'use strict';

//Setting up route
angular.module('issues').config(['$stateProvider',
	function($stateProvider) {
		// Issues state routing
		$stateProvider.
		state('app.listIssues', {
			url: '/issues',
			templateUrl: 'modules/issues/views/list-issues.client.view.html'
		}).
		state('app.createIssue', {
			url: '/issues/create',
			templateUrl: 'modules/issues/views/create-issue.client.view.html'
		}).
		state('app.viewIssue', {
			url: '/issues/:issueId',
			templateUrl: 'modules/issues/views/view-issue.client.view.html'
		}).
		state('app.editIssue', {
			url: '/issues/:issueId/edit',
			templateUrl: 'modules/issues/views/edit-issue.client.view.html'
		});
	}
]);
