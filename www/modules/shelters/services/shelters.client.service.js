'use strict';

//Shelters service used to communicate Shelters REST endpoints
angular.module('shelters').factory('Shelters', ['$resource',
	function($resource) {
		return $resource('shelters/:shelterId', { shelterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);