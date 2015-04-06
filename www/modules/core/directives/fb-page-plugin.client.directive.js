'use strict';

angular.module('core').directive('fbPagePlugin', [
	function() {
		return {
			templateUrl: '/modules/core/views/partials/fb-page-plugin.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Fb page plugin directive logic
				// ...
			}
		};
	}
]);
