'use strict';

// Vets controller
angular.module('vets').controller('VetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Vets',
	function($scope, $stateParams, $location, Authentication, Vets) {
		$scope.authentication = Authentication;

		// Create new Vet
		$scope.create = function() {
			// Create new Vet object
			var vet = new Vets ({
				name: this.name
			});

			// Redirect after save
			vet.$save(function(response) {
				$location.path('vets/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Vet
		$scope.remove = function(vet) {
			if ( vet ) { 
				vet.$remove();

				for (var i in $scope.vets) {
					if ($scope.vets [i] === vet) {
						$scope.vets.splice(i, 1);
					}
				}
			} else {
				$scope.vet.$remove(function() {
					$location.path('vets');
				});
			}
		};

		// Update existing Vet
		$scope.update = function() {
			var vet = $scope.vet;

			vet.$update(function() {
				$location.path('vets/' + vet._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Vets
		$scope.find = function() {
			$scope.vets = Vets.query();
		};

		// Find existing Vet
		$scope.findOne = function() {
			$scope.vet = Vets.get({ 
				vetId: $stateParams.vetId
			});
		};
	}
]);