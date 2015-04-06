'use strict';

//Setting up route
angular.module('trainers').config(['$stateProvider',
	function($stateProvider) {
		// Trainers state routing
		$stateProvider.
		state('app.listTrainers', {
			url: '/trainers',
			templateUrl: 'modules/trainers/views/list-trainers.client.view.html'
		}).
		state('app.createTrainer', {
			url: '/trainers/create',
			templateUrl: 'modules/trainers/views/create-trainer.client.view.html'
		}).
		state('app.viewTrainer', {
			url: '/trainers/:trainerId',
			templateUrl: 'modules/trainers/views/view-trainer.client.view.html'
		}).
		state('app.editTrainer', {
			url: '/trainers/:trainerId/edit',
			templateUrl: 'modules/trainers/views/edit-trainer.client.view.html'
		});
	}
]);
