'use strict';

// Rescues controller
angular.module('rescues').controller('RescuesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Rescues',
	function($scope, $stateParams, $location, Authentication, Rescues) {
		$scope.authentication = Authentication;

		// Create new Rescue
		$scope.create = function() {
			// Create new Rescue object
			var rescue = new Rescues ({
				name: this.name
			});

			// Redirect after save
			rescue.$save(function(response) {
				$location.path('rescues/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Rescue
		$scope.remove = function(rescue) {
			if ( rescue ) { 
				rescue.$remove();

				for (var i in $scope.rescues) {
					if ($scope.rescues [i] === rescue) {
						$scope.rescues.splice(i, 1);
					}
				}
			} else {
				$scope.rescue.$remove(function() {
					$location.path('rescues');
				});
			}
		};

		// Update existing Rescue
		$scope.update = function() {
			var rescue = $scope.rescue;

			rescue.$update(function() {
				$location.path('rescues/' + rescue._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Rescues
		$scope.find = function() {
			$scope.rescues = Rescues.query();
		};

		// Find existing Rescue
		$scope.findOne = function() {
			$scope.rescue = Rescues.get({ 
				rescueId: $stateParams.rescueId
			});
		};
	}
]);