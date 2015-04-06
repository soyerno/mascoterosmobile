'use strict';

// Shelters controller
angular.module('shelters').controller('SheltersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Shelters',
	function($scope, $stateParams, $location, Authentication, Shelters) {
		$scope.authentication = Authentication;

		// Create new Shelter
		$scope.create = function() {
			// Create new Shelter object
			var shelter = new Shelters ({
				name: this.name
			});

			// Redirect after save
			shelter.$save(function(response) {
				$location.path('shelters/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Shelter
		$scope.remove = function(shelter) {
			if ( shelter ) { 
				shelter.$remove();

				for (var i in $scope.shelters) {
					if ($scope.shelters [i] === shelter) {
						$scope.shelters.splice(i, 1);
					}
				}
			} else {
				$scope.shelter.$remove(function() {
					$location.path('shelters');
				});
			}
		};

		// Update existing Shelter
		$scope.update = function() {
			var shelter = $scope.shelter;

			shelter.$update(function() {
				$location.path('shelters/' + shelter._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Shelters
		$scope.find = function() {
			$scope.shelters = Shelters.query();
		};

		// Find existing Shelter
		$scope.findOne = function() {
			$scope.shelter = Shelters.get({ 
				shelterId: $stateParams.shelterId
			});
		};
	}
]);