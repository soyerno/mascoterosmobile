'use strict';

angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication',
	function($scope, $location, Authentication) {
		// Home controller logic
		// ...

		$scope.authentication = Authentication;

		$scope.checkAuthentication = function(){
			if($scope.authentication && $scope.authentication.user._id){
				console.log($location);
				var currentLocation = $location.path();
				if(currentLocation != '/pets'){
					$location.path('/pets');
				}
			}
		};
	}
]);
