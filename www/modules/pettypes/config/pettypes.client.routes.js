'use strict';

//Setting up route
angular.module('pettypes').config(['$stateProvider',
	function($stateProvider) {
		// Pettypes state routing
		$stateProvider.
		state('listPettypes', {
			url: '/pettypes',
			templateUrl: 'modules/pettypes/views/list-pettypes.client.view.html'
		}).
		state('createPettype', {
			url: '/pettypes/create',
			templateUrl: 'modules/pettypes/views/create-pettype.client.view.html'
		}).
		state('viewPettype', {
			url: '/pettypes/:pettypeId',
			templateUrl: 'modules/pettypes/views/view-pettype.client.view.html'
		}).
		state('editPettype', {
			url: '/pettypes/:pettypeId/edit',
			templateUrl: 'modules/pettypes/views/edit-pettype.client.view.html'
		});
	}
]);