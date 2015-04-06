'use strict';

//Notifications service used to communicate Notifications REST endpoints
angular.module('notifications').factory('Notifications', ['$resource',
	function($resource) {
		return $resource('notifications/:notificationId', { notificationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);