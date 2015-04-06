'use strict';

//Setting up route
angular.module('imageuploaders').config(['$stateProvider',
	function($stateProvider) {
		// Imageuploaders state routing
		$stateProvider.
		state('listImageuploaders', {
			url: '/imageuploaders',
			templateUrl: 'modules/imageuploaders/views/list-imageuploaders.client.view.html'
		}).
		state('createImageuploader', {
			url: '/imageuploaders/create',
			templateUrl: 'modules/imageuploaders/views/create-imageuploader.client.view.html'
		}).
		state('viewImageuploader', {
			url: '/imageuploaders/:imageuploaderId',
			templateUrl: 'modules/imageuploaders/views/view-imageuploader.client.view.html'
		}).
		state('editImageuploader', {
			url: '/imageuploaders/:imageuploaderId/edit',
			templateUrl: 'modules/imageuploaders/views/edit-imageuploader.client.view.html'
		});
	}
]);
