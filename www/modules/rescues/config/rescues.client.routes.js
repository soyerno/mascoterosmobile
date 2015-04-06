'use strict';

//Setting up route
angular.module('rescues').config(['$stateProvider',
	function($stateProvider) {
		// Rescues state routing
		$stateProvider.
		state('app.listRescues', {
			url: '/rescues',
			templateUrl: 'modules/rescues/views/list-rescues.client.view.html'
		}).
		state('app.createRescue', {
			url: '/rescues/create',
			templateUrl: 'modules/rescues/views/create-rescue.client.view.html'
		}).
		state('app.viewRescue', {
			url: '/rescues/:rescueId',
			templateUrl: 'modules/rescues/views/view-rescue.client.view.html'
		}).
		state('app.editRescue', {
			url: '/rescues/:rescueId/edit',
			templateUrl: 'modules/rescues/views/edit-rescue.client.view.html'
		});
	}
]);
