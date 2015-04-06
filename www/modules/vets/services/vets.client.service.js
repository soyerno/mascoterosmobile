'use strict';

//Vets service used to communicate Vets REST endpoints
angular.module('vets').factory('Vets', ['$resource',
	function($resource) {
		return $resource('vets/:vetId', { vetId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);