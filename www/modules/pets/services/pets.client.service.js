'use strict';

//Pets service used to communicate Pets REST endpoints
angular.module('pets').factory('Pets', ['$resource',
	function($resource) {
		return $resource('pets/:petId', { petId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);