'use strict';

//Setting up route
angular.module('notifications').config(['$stateProvider',
	function($stateProvider) {
		// Notifications state routing
		$stateProvider.
		state('app.listNotifications', {
			url: '/notifications',
			templateUrl: 'modules/notifications/views/list-notifications.client.view.html'
		}).
		state('app.createNotification', {
			url: '/notifications/create',
			templateUrl: 'modules/notifications/views/create-notification.client.view.html'
		}).
		state('app.viewNotification', {
			url: '/notifications/:notificationId',
			templateUrl: 'modules/notifications/views/view-notification.client.view.html'
		}).
		state('app.editNotification', {
			url: '/notifications/:notificationId/edit',
			templateUrl: 'modules/notifications/views/edit-notification.client.view.html'
		});
	}
]);
